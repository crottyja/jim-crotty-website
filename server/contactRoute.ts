import { Router } from "express";
import { notifyOwner } from "./_core/notification";

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

  const title = `New Contact Form Submission — ${inquiryType}`;
  const content = [
    `**Name:** ${name.trim()}`,
    organization?.trim() ? `**Organization:** ${organization.trim()}` : null,
    `**Inquiry Type:** ${inquiryType.trim()}`,
    `**Message:**\n${message.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    await notifyOwner({ title, content });
    res.json({ success: true });
  } catch (err) {
    console.error("[Contact] Failed to send notification:", err);
    // Still return success to the user — don't expose internal errors
    res.json({ success: true });
  }
});

export default contactRouter;
