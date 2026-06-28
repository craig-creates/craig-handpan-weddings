import { createFileRoute, Link } from "@tanstack/react-router";
import ceremonyImg from "@/assets/ceremony.jpg";

export const Route = createFileRoute("/weddings")({
  head: () => ({
    meta: [
      { title: "Wedding Handpan Music | Ceremony, Reception & Outdoor Weddings" },
      {
        name: "description",
        content:
          "Live handpan music for wedding ceremonies, drinks receptions, outdoor weddings, and elopements across Kent, London, Sussex, and Surrey.",
      },
      { property: "og:title", content: "Wedding Handpan Music | Ceremony, Reception & Outdoor Weddings" },
      { property: "og:description", content: "Live handpan music tailored to each part of your wedding day." },
      { property: "og:url", content: "/weddings" },
    ],
    links: [{ rel: "canonical", href: "/weddings" }],
  }),
  component: WeddingsPage,
});

function WeddingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Weddings"
        title="Live handpan, woven through your wedding day."
        intro="A wedding has a natural shape — arrival, ceremony, the first drink together, the quiet moments between. The handpan moves softly through all of it."
      />

      <section className="container-prose pb-24">
        <div className="rounded-3xl overflow-hidden aspect-[16/8]">
          <img
            src={ceremonyImg}
            alt="Outdoor wedding ceremony"
            width={1280}
            height={960}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="container-prose pb-28 grid lg:grid-cols-3 gap-10">
        {sections.map((s) => (
          <article key={s.title} className="rounded-2xl border border-border/70 p-8 bg-card">
            <p className="eyebrow">{s.kicker}</p>
            <h2 className="mt-3 font-serif text-2xl">{s.title}</h2>
            <p className="mt-4 text-foreground/75 leading-relaxed text-sm">{s.body}</p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/75">
              {s.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 rounded-full bg-sage-deep flex-none" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="bg-muted/50 py-24">
        <div className="container-prose text-center max-w-2xl mx-auto">
          <h2 className="heading-display text-3xl md:text-4xl">
            Tell me about your day.
          </h2>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            Share your date, venue, and the parts of the day you'd like music for —
            I'll come back with availability and a clear quote.
          </p>
          <Link to="/contact" className="btn-primary mt-8">Check My Wedding Date</Link>
        </div>
      </section>
    </>
  );
}

const sections = [
  {
    kicker: "01 · Ceremony",
    title: "The aisle, the vows, the exit.",
    body: "Carefully chosen, gentle music for the most emotional minutes of your day.",
    bullets: [
      "Guest arrival music",
      "Processional / aisle walk",
      "Signing of the register",
      "Recessional / exit music",
    ],
  },
  {
    kicker: "02 · Drinks Reception",
    title: "Relaxed, live, present.",
    body: "Soft melodic music as guests gather, talk, and find their footing in the celebration.",
    bullets: [
      "60–90 minutes of live music",
      "Indoor or outdoor performance",
      "Acoustic — usually no power needed",
      "Works alongside canapés and photos",
    ],
  },
  {
    kicker: "03 · Outdoor & Elopement",
    title: "For gardens, fields, and just the two of you.",
    body: "Natural, weatherproof sound that suits the open air and small, considered gatherings.",
    bullets: [
      "Countryside and barn weddings",
      "Private estates and gardens",
      "Elopements and vow renewals",
      "Retreats and intimate ceremonies",
    ],
  },
];

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="container-prose pt-20 pb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 heading-display text-4xl md:text-6xl max-w-4xl">{title}</h1>
      {intro && (
        <p className="mt-6 max-w-2xl text-lg text-foreground/75 leading-relaxed">{intro}</p>
      )}
    </section>
  );
}
