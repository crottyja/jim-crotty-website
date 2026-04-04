import { Router } from "express";
import { Resend } from "resend";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

const contactRouter = Router();

contactRouter.post("/api/contact", async (req, res) => {
  const { name, organization, inquiryType, message } = req.body as {
    name?: string;
    organization?: string;
    inquiryType?: string;
    message?: string;
  };

  if (!name?.trim() || !inquiryType?.trim() || !message?.trim()) {
    res.status(400).json({ error: "Name, inquiry type, and message are required." });
    return;
  }

  const cleanName = name.trim();
  const cleanOrg = organization?.trim() || "";
  const cleanType = inquiryType.trim();
  const cleanMessage = message.trim();

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
            <td style="padding: 6px 0; color: #0D2240;">${cleanName}</td>
          </tr>
          ${cleanOrg ? `<tr>
            <td style="padding: 6px 0; color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Organization</td>
            <td style="padding: 6px 0; color: #0D2240;">${cleanOrg}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 6px 0; color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em;">Inquiry Type</td>
            <td style="padding: 6px 0; color: #0D2240;">${cleanType}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <div style="color: #4A7FA5; font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; margin-bottom: 10px; font-family: 'Arial', sans-serif;">Message</div>
          <p style="color: #374151; line-height: 1.7; margin: 0; white-space: pre-wrap; font-family: 'Arial', sans-serif; font-size: 0.95rem;">${cleanMessage}</p>
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
        subject: emailSubject,
        html: emailHtml,
        // replyTo not set — replies go to the sender's email if they include it in the message
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
    cleanOrg ? `**Organization:** ${cleanOrg}` : null,
    `**Inquiry Type:** ${cleanType}`,
    `**Message:**\n${cleanMessage}`,
    emailSent ? `\n✅ Email delivered to jcrotty@american.edu` : `\n⚠️ Email delivery not configured`,
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
