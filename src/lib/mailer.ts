import "server-only";

/**
 * Transactional email via the Resend HTTP API. Zero dependencies — a single
 * fetch call, so the Docker image needs no extra packages.
 *
 * Required env in production:  RESEND_API_KEY  (from resend.com)
 * Optional:                    RESEND_FROM     ("CSCA Master <noreply@cscamaster.com>")
 *
 * Until the sending domain is verified inside Resend, use the default sandbox
 * sender — Resend will then only deliver to the account owner's address, so
 * verify cscamaster.com (SPF/DKIM DNS records) and switch RESEND_FROM.
 */

export type MailResult =
  | { ok: true; devCode?: string }
  | { ok: false; error: string };

const FROM = process.env.RESEND_FROM || "CSCA Master <onboarding@resend.dev>";

function otpEmailHtml(code: string, heading: string) {
  const digits = code
    .split("")
    .map(
      (d) =>
        `<span style="display:inline-block;min-width:44px;margin:0 3px;padding:10px 0;border-radius:10px;background:#f5f2ec;font-size:24px;font-weight:700;color:#1c1a17;text-align:center;font-family:ui-monospace,monospace">${d}</span>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;background:#faf7f2;font-family:Segoe UI,Helvetica,Arial,sans-serif">
  <div style="max-width:480px;margin:0 auto;padding:32px 20px">
    <p style="letter-spacing:.2em;font-size:11px;font-weight:600;color:#9b4a25;text-transform:uppercase">CSCA Master</p>
    <h1 style="font-size:22px;color:#1c1a17;margin:14px 0 8px">${heading}</h1>
    <p style="font-size:14px;color:#565248;line-height:1.6;margin:0 0 20px">
      Enter this code to continue. It expires in 10 minutes.
    </p>
    <div style="text-align:center;margin:0 0 18px">${digits}</div>
    <p style="font-size:12px;color:#8a857b;line-height:1.6">
      If you didn't request this, you can ignore this email — your account is untouched.
    </p>
  </div>
</body></html>`;
}

/**
 * In local development without RESEND_API_KEY the code is echoed back to the
 * caller (only when NODE_ENV !== "production") so the flow stays testable.
 */
export async function sendOtpEmail(to: string, code: string, heading: string): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      return { ok: true, devCode: code };
    }
    return { ok: false, error: "Signup verification isn't configured yet — try again shortly." };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        subject: `${code} is your CSCA Master verification code`,
        html: otpEmailHtml(code, heading),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[mailer] resend rejected", response.status, detail.slice(0, 300));
      return { ok: false, error: "Couldn't send the verification email — try again shortly." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[mailer] send failed", error);
    return { ok: false, error: "Couldn't send the verification email — try again shortly." };
  }
}
