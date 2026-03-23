import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(12),
  propertySlug: z.string().optional(),
  agentEmail: z.string().email().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const { name, email, phone, message, propertySlug, agentEmail } = parsed.data;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("Missing RESEND_API_KEY for /api/contact");
    return Response.json({ error: "Email service is not configured" }, { status: 503 });
  }

  const resend = new Resend(resendApiKey);
  const toEmail = agentEmail ?? process.env.RESEND_FROM_EMAIL ?? "hello@k2estate.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@k2estate.com";

  try {
    await resend.emails.send({
      from: `K2 Estate <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: propertySlug
        ? `New enquiry for ${propertySlug} from ${name}`
        : `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New enquiry from K2 Estate</h2>
          ${propertySlug ? `<p><strong>Property:</strong> ${propertySlug}</p>` : ""}
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Email delivery failed" }, { status: 500 });
  }

  return Response.json({ success: true });
}
