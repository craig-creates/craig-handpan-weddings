import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./weddings";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Check My Wedding Date | Handpan Musician Enquiry" },
      {
        name: "description",
        content:
          "Check availability for your wedding date. Live handpan music for weddings, ceremonies, and elopements across London, Surrey, Sussex, Kent & Essex.",
      },
      { property: "og:title", content: "Check My Wedding Date | Handpan Musician Enquiry" },
      { property: "og:description", content: "Send a wedding enquiry and check availability for your date." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    setError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const str = (key: string) => {
      const v = fd.get(key);
      return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
    };
    const guestsRaw = str("guests");

    const payload = {
      names: str("names") ?? "",
      email: str("email") ?? "",
      phone: str("phone"),
      date: str("date"),
      venue: str("venue"),
      part: str("part"),
      guests: guestsRaw ? Number(guestsRaw) : undefined,
      setting: str("setting"),
      packageInterest: str("package"),
      requests: str("requests"),
      referral: str("referral"),
      company: str("company"), // honeypot
    };

    setPending(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: boolean; error?: string }
        | null;
      if (!res.ok || !body?.ok) {
        setError(
          body?.error ??
            "Something went wrong sending your enquiry. Please email craig@handpanweddings.com directly.",
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your enquiry. Please email craig@handpanweddings.com directly.",
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Check Availability"
        title="Tell me about your wedding."
        intro="Share a few details and I'll come back with availability for your date, ideas for the day, and a clear quote."
      />

      <section className="container-prose pb-28 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-8">
          <Info title="Areas covered">
            London · Surrey · Sussex · Kent & Essex. Further travel by arrangement.
          </Info>
          <Info title="Response time">
            Most enquiries are answered within one to two days.
          </Info>
          <Info title="What happens next">
            <ol className="space-y-2 mt-1 list-decimal list-inside marker:text-sage-deep">
              <li>Enquiry &amp; availability check</li>
              <li>Short call to talk through your day</li>
              <li>Deposit &amp; confirmation</li>
              <li>Final details before the wedding</li>
            </ol>
          </Info>
        </aside>

        <div className="lg:col-span-8">
          {submitted ? (
            <div className="rounded-3xl border border-sage-deep/40 bg-card p-10 text-center">
              <p className="eyebrow">Thank you</p>
              <h2 className="mt-3 heading-display text-3xl">Your enquiry has been sent.</h2>
              <p className="mt-4 text-foreground/75 max-w-md mx-auto">
                I'll come back to you within a day or two with availability for
                your date and the next steps.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-border bg-card p-8 md:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Names" name="names" required placeholder="e.g. Hannah & Tom" />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Wedding date" name="date" type="date" />
                <Field label="Venue / location" name="venue" placeholder="Venue name and town" className="sm:col-span-2" />

                <SelectField
                  label="Which part of the day?"
                  name="part"
                  options={[
                    "Drinks reception",
                    "Drinks reception + ceremony",
                    "Wedding breakfast / dining",
                    "Elopement / intimate",
                    "Not sure yet",
                  ]}
                />
                <Field label="Estimated guest count" name="guests" type="number" min={1} />

                <SelectField
                  label="Indoor or outdoor?"
                  name="setting"
                  options={["Indoor", "Outdoor", "Both", "Not sure yet"]}
                />
                <SelectField
                  label="Package interested in"
                  name="package"
                  options={[
                    "Solo Handpan — £600",
                    "Handpan Duo (with double bass) — £1,050",
                    "Handpan Trio (with clarinet) — £1,450",
                    "Ceremony add-on",
                    "Bespoke / Destination",
                    "Not sure yet",
                  ]}
                />


                <TextAreaField
                  label="Any special requests"
                  name="requests"
                  placeholder="The setting, the light, the moments that matter, the feeling you'd like guests to carry home…"
                  className="sm:col-span-2"
                />
                <Field label="How did you find me?" name="referral" className="sm:col-span-2" />
              </div>

              <button type="submit" className="btn-primary w-full md:w-auto">
                Check My Wedding Date
              </button>
              <p className="text-xs text-muted-foreground">
                By sending this enquiry you agree to be contacted about your wedding date.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Info({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-3 text-foreground/80 leading-relaxed text-sm">{children}</div>
    </div>
  );
}

const fieldBase =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-sage-deep transition";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  className = "",
  min,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  min?: number;
}) {
  return (
    <label className={"flex flex-col gap-2 " + className}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}{required && <span className="text-sage-deep"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        min={min}
        className={fieldBase}
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={"flex flex-col gap-2 " + className}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <textarea name={name} placeholder={placeholder} rows={5} className={fieldBase + " resize-y"} />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  className = "",
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  return (
    <label className={"flex flex-col gap-2 " + className}>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <select name={name} className={fieldBase} defaultValue="">
        <option value="" disabled>Choose one…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
