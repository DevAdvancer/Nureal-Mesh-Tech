import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "theabhirupkumar@gmail.com";

    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing API key." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>New Inquiry from ${name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #FAF9F6; margin: 0; padding: 0; }
            .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border: 1px solid #E5E5E0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
            .header { background: #0F0D1A; padding: 32px 24px; text-align: center; }
            .header h1 { color: #EEE9FF; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: -0.02em; }
            .header p { color: #FFB830; font-size: 11px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 0.1em; font-family: monospace; }
            .body { padding: 32px 24px; }
            .badge { display: inline-block; background: #7B2FFF; color: #fff; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; }
            .field { margin-bottom: 24px; }
            .field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #FF4D6D; margin-bottom: 8px; }
            .field-value { font-size: 14px; color: #1C1A26; background: #F5F1EA; border-radius: 8px; padding: 12px 14px; border: 1px solid rgba(28,26,38,0.08); }
            .message-value { font-size: 14px; color: #1C1A26; background: #F5F1EA; border-radius: 8px; padding: 16px; line-height: 1.6; white-space: pre-wrap; border: 1px solid rgba(28,26,38,0.08); }
            .footer { border-top: 1px solid #E5E5E0; padding: 20px 24px; text-align: center; }
            .footer p { font-size: 10px; color: rgba(28,26,38,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin: 0; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>Neural Mesh Tech</h1>
              <p>Secure Contact Request</p>
            </div>
            <div class="body">
              <div class="badge">Inquiry Dispatch</div>
              <div class="field">
                <div class="field-label">Sender Name</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Sender Email</div>
                <div class="field-value">${email}</div>
              </div>
              <div class="field">
                <div class="field-label">Message Details</div>
                <div class="message-value">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>Neural Mesh Tech &copy; ${new Date().getFullYear()} &mdash; Routed via Resend</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: resendFrom,
      to: [contactEmail],
      replyTo: email,
      subject: `New Inquiry from ${name} (via neuralmeshs.com)`,
      html: htmlContent,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
