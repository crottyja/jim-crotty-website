import { Router } from "express";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

const contactRouter = Router();

// ─── Rate limiter: max 5 submissions per 15 minutes per IP ───────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Please wait a few minutes and try again." },
});

// ─── HTML escape helper to prevent XSS in email template ─────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── Input length limits ──────────────────────────────────────────────────────
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_ORG = 200;
const MAX_TYPE = 100;
const MAX_MESSAGE = 5000;

contactRouter.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, organization, inquiryType, message } = req.body as {
    name?: string;
    email?: string;
    organization?: string;
    inquiryType?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !inquiryType?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Name, email, inquiry type, and message are required." });
    return;
  }

  const cleanName = name.trim().slice(0, MAX_NAME);
  const cleanEmail = email.trim().slice(0, MAX_EMAIL);
  const cleanOrg = (organization?.trim() || "").slice(0, MAX_ORG);
  const cleanType = inquiryType.trim().slice(0, MAX_TYPE);
  const cleanMessage = message.trim().slice(0, MAX_MESSAGE);

  // Escaped versions for HTML email template
  const safeN = escapeHtml(cleanName);
  const safeE = escapeHtml(cleanEmail);
  const safeO = escapeHtml(cleanOrg);
  const safeT = escapeHtml(cleanType);
  const safeM = escapeHtml(cleanMessage);

  const emailSubject = `[jcrotty.com] ${cleanType} — ${cleanName}`;
  const emailHtml = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; color: #0D2240;">
      <div style="background: #0D2240; padding: 24px 32px; margin-bottom: 0;">
        <h1 style="color: #ffffff; font-size: 1.1rem; font-weight: 400; margin: 0; letter-spacing: 0.05em; text-transform: uppercase; font-family: 'Arial', sans-serif;">
          New Contact Form Submission
        </h1>
      </div>
      <div style="background: #f8f9fa; border-left: 3px solid #C9A84C; padding: 24px 32px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Arial', sans-serif; font-size: 0.9rem;">
          <tr>
            <td style="padding: 6px 0; color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; width: 130px;">Name</td>
            <td style="padding: 6px 0; color: #0D2240;">${safeN}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Email</td>
            <td style="padding: 6px 0; color: #0D2240;"><a href="mailto:${safeE}" style="color: #4A7FA5;">${safeE}</a></td>
          </tr>
          ${cleanOrg ? `<tr>
            <td style="padding: 6px 0; color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Organization</td>
            <td style="padding: 6px 0; color: #0D2240;">${safeO}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 6px 0; color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Inquiry Type</td>
            <td style="padding: 6px 0; color: #0D2240;">${safeT}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <div style="color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; margin-bottom: 10px; font-family: 'Arial', sans-serif;">Message</div>
          <p style="color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: 'Arial', sans-serif; font-size: 0.95rem;">${safeM}</p>
        </div>
      </div>
      <div style="padding: 16px 32px; background: #0D2240;">
        <p style="color: rgba(255,255,255,0.4); font-size: 0.75rem; margin: 0; font-family: 'Arial', sans-serif;">
          Submitted via jcrotty.com contact form
        </p>
      </div>
    </div>
  `;

  // Send email via Resend
  let emailSent = false;
  if (ENV.resendApiKey) {
    try {
      const resend = new Resend(ENV.resendApiKey);
      const { error } = await resend.emails.send({
        from: "jcrotty.com Contact Form <onboarding@resend.dev>",
        to: ["jamesmcrotty@hotmail.com"],
        replyTo: cleanEmail,
        subject: emailSubject,
        html: emailHtml,
      });
      if (error) {
        console.error("[Contact] Resend error:", error);
      } else {
        emailSent = true;
        console.log("[Contact] Email sent successfully via Resend");
      }
    } catch (err) {
      console.error("[Contact] Failed to send email via Resend:", err);
    }
  } else {
    console.warn("[Contact] RESEND_API_KEY not set — email delivery skipped");
  }

  // Also notify via Manus owner notification as a backup
  const notifContent = [
    `**Name:** ${cleanName}`,
    `**Email:** ${cleanEmail}`,
    cleanOrg ? `**Organization:** ${cleanOrg}` : null,
    `**Inquiry Type:** ${cleanType}`,
    `**Message:**\n${cleanMessage}`,
    emailSent
      ? `\n✅ Email delivered to jamesmcrotty@hotmail.com`
      : `\n⚠️ Email delivery not configured`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    await notifyOwner({
      title: `New Contact Form Submission — ${cleanType}`,
      content: notifContent,
    });
  } catch (err) {
    console.error("[Contact] Failed to send owner notification:", err);
  }

  res.json({ success: true });
});

export default contactRouter;
