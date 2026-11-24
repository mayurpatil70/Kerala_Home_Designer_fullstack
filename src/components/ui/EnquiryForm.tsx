"use client";

import { useId, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import Button from "./Button";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "phone" | "email" | "consent", string>>;

const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Enquiry form (PRD §4.12): name, phone, email, location, service category and message.
 * Posts to /api/enquiry. Includes a honeypot field for basic spam protection.
 */
export default function EnquiryForm({
  source = "contact",
  interest = "",
  compact = false,
  onDone,
}: {
  source?: string;
  interest?: string;
  compact?: boolean;
  onDone?: () => void;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [serverMsg, setServerMsg] = useState("");
  const preselect = services.find((s) => s.title === interest)?.title ?? "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const next: Errors = {};
    if (!data.name || data.name.trim().length < 2) next.name = "Please enter your name";
    if (!PHONE_RE.test((data.phone || "").trim())) next.phone = "Enter a valid phone number";
    if (data.email && !EMAIL_RE.test(data.email.trim())) next.email = "Enter a valid email";
    if (!data.consent) next.consent = "Please accept to continue";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, interest }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <svg viewBox="0 0 52 52" className="form-success__icon" aria-hidden="true">
          <circle cx="26" cy="26" r="24" />
          <path d="M15 27l7 7 15-16" />
        </svg>
        <h3>Thank you. We have received your enquiry.</h3>
        <p>Our team will contact you soon. For anything urgent, call {site.contact.phones[0].label}.</p>
        <Button variant="ghost" arrow={false} onClick={() => { setStatus("idle"); onDone?.(); }}>
          {onDone ? "Close" : "Send another enquiry"}
        </Button>
      </div>
    );
  }

  const f = (name: string) => `${uid}-${name}`;

  return (
    <form className={`enquiry-form${compact ? " enquiry-form--compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label htmlFor={f("company")}>Company</label>
        <input id={f("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="enquiry-form__grid">
        <div className={`field${errors.name ? " field--error" : ""}`}>
          <input id={f("name")} name="name" placeholder=" " autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? f("name-err") : undefined} />
          <label htmlFor={f("name")}>Full name *</label>
          {errors.name && <span className="field__error" id={f("name-err")}>{errors.name}</span>}
        </div>

        <div className={`field${errors.phone ? " field--error" : ""}`}>
          <input id={f("phone")} name="phone" type="tel" inputMode="tel" placeholder=" " autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? f("phone-err") : undefined} />
          <label htmlFor={f("phone")}>Phone *</label>
          {errors.phone && <span className="field__error" id={f("phone-err")}>{errors.phone}</span>}
        </div>

        <div className={`field${errors.email ? " field--error" : ""}`}>
          <input id={f("email")} name="email" type="email" placeholder=" " autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? f("email-err") : undefined} />
          <label htmlFor={f("email")}>Email</label>
          {errors.email && <span className="field__error" id={f("email-err")}>{errors.email}</span>}
        </div>

        <div className="field">
          <input id={f("location")} name="location" placeholder=" " autoComplete="address-level2" />
          <label htmlFor={f("location")}>Project location (town / district)</label>
        </div>

        <div className="field field--select field--full">
          <select id={f("service")} name="service" defaultValue={preselect}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
          <label htmlFor={f("service")}>Service</label>
        </div>

        {!compact && (
          <div className="field field--full">
            <textarea id={f("message")} name="message" placeholder=" " rows={3} />
            <label htmlFor={f("message")}>Tell us about your project</label>
          </div>
        )}
      </div>

      <label className={`consent${errors.consent ? " consent--error" : ""}`}>
        <input type="checkbox" name="consent" value="yes" />
        <span className="consent__box" aria-hidden="true" />
        <span>
          I agree to be contacted by The Home Designers about my enquiry. See our <a href="/privacy-policy">Privacy Policy</a>.
          {errors.consent && <em className="field__error"> {errors.consent}</em>}
        </span>
      </label>

      {status === "error" && (
        <p className="form-error" role="alert">
          {serverMsg}. You can also call <a href={site.contact.phones[0].href}>{site.contact.phones[0].label}</a>.
        </p>
      )}

      <Button type="submit" variant="sky" className="btn--block" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
