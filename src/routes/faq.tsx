import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "./weddings";
import { url, SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Handpan Weddings" },
      {
        name: "description",
        content:
          "Frequently asked questions about booking live handpan music for weddings, ceremonies, and outdoor celebrations.",
      },
      { property: "og:title", content: "FAQ | Handpan Weddings" },
      { property: "og:description", content: "Common questions about booking live handpan wedding music." },
      { property: "og:url", content: url("/faq") },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url("/faq") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "What parts of the wedding can you play for?",
    a: "Ceremony, guest arrival, aisle walk, signing, exit, drinks reception, wedding breakfast, elopements, and outdoor celebrations.",
  },
  {
    q: "Can you play specific songs?",
    a: "Some melodies can be adapted, but the handpan works best as atmospheric, melodic live music rather than exact covers. If you have a specific song in mind, I can advise whether it will translate well.",
  },
  {
    q: "Do you need power?",
    a: "Usually yes, however the handpan is fully acoustic. Smaller, intimate settings may not require power while larger spaces benefit from amplification.",
  },
  {
    q: "Can you play outdoors?",
    a: "Yes, weather permitting. A covered or shaded area is needed in rain, strong sun, or difficult weather. The handpans are particularly sensitive to prolonged sunlight exposure.",
  },
  {
    q: "How much space do you need?",
    a: "Very little. A chair or stool and a small performance area are usually enough.",
  },
  {
    q: "Are you insured?",
    a: "Yes — public liability insurance is held, and documentation can be shared with your venue or planner on request.",
  },
  {
    q: "How far do you travel?",
    a: "London, Surrey, Sussex, Kent, Essex, and surrounding areas. Further travel may be available by arrangement, including destination weddings.",
  },
  {
    q: "How do bookings work?",
    a: "Enquiry, availability check, a short call to talk through your day, deposit, confirmation, and a final details exchange in the weeks before the wedding.",
  },
];

function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions couples usually ask."
        intro="If anything isn't covered here, get in touch — most answers take a sentence or two."
      />

      <section className="container-prose pb-28 max-w-3xl">
        <div className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <details key={f.q} className="group py-7" open={i === 0}>
              <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
                <h2 className="font-serif text-xl md:text-2xl text-foreground">{f.q}</h2>
                <span className="mt-1 h-7 w-7 flex-none rounded-full border border-border grid place-items-center text-foreground/70 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-foreground/75 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-muted/60 p-10 text-center">
          <h2 className="font-serif text-2xl">Still have a question?</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Drop a note via the enquiry form — replies are usually within a day or two.
          </p>
          <Link to="/contact" className="btn-primary mt-6">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
