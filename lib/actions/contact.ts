"use server";

import * as Brevo from "@getbrevo/brevo";

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<ContactResult> {
  const { name, email, message } = data;

  // Validate required fields
  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_EMAIL_SENDER;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !senderEmail || !contactEmail) {
    console.error("Missing Brevo configuration");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const apiInstance = new Brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Portfolio Contact Form",
      email: senderEmail,
    };

    sendSmtpEmail.to = [
      {
        email: contactEmail,
        name: "Portfolio Owner",
      },
    ];

    sendSmtpEmail.replyTo = {
      email: email,
      name: name,
    };

    sendSmtpEmail.subject = `New contact from ${escapeHtml(name)}`;

    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        </body>
      </html>
    `;

    sendSmtpEmail.textContent = `
      New Contact Form Submission

      Name: ${name}
      Email: ${email}

      Message:
      ${message}
    `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return { success: true };
  } catch (error: unknown) {
    console.error("Brevo API error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
