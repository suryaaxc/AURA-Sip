import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/reserve
 * Body: { email: string; flavor?: string }
 *
 * This stub validates the payload and returns success so the front end
 * (ReserveModal / ReserveSection) works end-to-end out of the box on
 * Vercel with zero configuration.
 *
 * To send real confirmation emails / store leads, wire in an email
 * service here, e.g. Resend:
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "AURA-SIP <hello@aurasip.com>",
 *     to: email,
 *     subject: "You're on the list",
 *     html: "<p>Thank you for reserving your bottle.</p>",
 *   });
 *
 * Add RESEND_API_KEY (or your provider's key) as an environment
 * variable in the Vercel project settings.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const flavor = typeof body?.flavor === "string" ? body.flavor : "unspecified";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-console
    console.log(`[reserve] ${email} reserved flavor: ${flavor}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 }
    );
  }
}
