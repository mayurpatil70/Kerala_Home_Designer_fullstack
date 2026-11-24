/**
 * Enquiry endpoint used by the contact form and the "Discuss Your Project" popup.
 *
 * It validates the submission and logs it on the server. To receive leads, forward
 * `lead` to the agreed recipient(s) where marked below (e.g. thdmkm@yahoo.com via an
 * email service such as Resend or SendGrid, or a CRM). Keep API keys in environment
 * variables, never in this file.
 */

const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots don't retry.
  if (clean(body.company)) return Response.json({ ok: true });

  const lead = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 20),
    email: clean(body.email, 160),
    location: clean(body.location, 120),
    service: clean(body.service, 80),
    message: clean(body.message, 2000),
    interest: clean(body.interest, 120),
    source: clean(body.source, 40),
    consent: body.consent === "yes",
    receivedAt: new Date().toISOString(),
  };

  if (lead.name.length < 2) return Response.json({ ok: false, error: "Please enter your name" }, { status: 422 });
  if (!PHONE_RE.test(lead.phone)) return Response.json({ ok: false, error: "Enter a valid phone number" }, { status: 422 });
  if (lead.email && !EMAIL_RE.test(lead.email)) return Response.json({ ok: false, error: "Enter a valid email" }, { status: 422 });
  if (!lead.consent) return Response.json({ ok: false, error: "Consent is required" }, { status: 422 });

  // TODO: deliver `lead` to the agreed recipients (email / CRM).
  console.info("[enquiry]", lead);

  return Response.json({ ok: true });
}
