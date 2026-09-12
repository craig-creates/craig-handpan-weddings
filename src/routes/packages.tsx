import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "./weddings";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Wedding Drinks Reception Music | Solo, Duo & Trio from £600" },
      {
        name: "description",
        content:
          "Live handpan music for wedding drinks receptions. Solo from £600, Handpan Duo with double bass from £1,050, and Handpan Trio with clarinet from £1,450.",
      },
      { property: "og:title", content: "Wedding Drinks Reception Music | Solo, Duo & Trio from £600" },
      {
        property: "og:description",
        content:
          "Solo, duo, and trio handpan music for wedding drinks receptions across the UK.",
      },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

const packages = [
  {
    name: "Solo Handpan",
    price: "£600",
    body: "Two hours of live handpan music through your drinks reception — gentle, melodic, and completely acoustic.",
    bullets: [
      "2 hours of live music",
      "Indoor or outdoor performance",
      "Acoustic — no power needed in most spaces",
      "Professional setup and arrival",
    ],
    featured: false,
  },
  {
    name: "Handpan Duo",
    price: "£1,050",
    body: "Handpan and double bass together — a warmer, fuller sound that still holds the calm, unobtrusive feel of the solo.",
    bullets: [
      "Handpan + upright double bass",
      "2 hours of live music",
      "Ideal for larger receptions and grand spaces",
      "Most chosen by couples",
    ],
    featured: true,
  },
  {
    name: "Handpan Trio",
    price: "£1,450",
    body: "Handpan, double bass, and your choice of flute or violin — the most cinematic option, arranged like a bespoke ensemble.",
    bullets: [
      "Handpan + double bass + flute or violin",
      "2 hours of live music",
      "A standout musical moment for guests",
      "Coordinated arrangements across the set",
    ],
    featured: false,
  },
  {
    name: "Ceremony, Elopements & Bespoke",
    price: "Price on enquiry",
    body: "Add ceremony music to any package, or ask about elopements, retreats, private estates, and destination weddings.",
    bullets: [
      "Ceremony music as an add-on",
      "Elopements & vow renewals",
      "Multi-day events and retreats",
      "Destination and overseas weddings",
    ],
    featured: false,
  },
];

function PackagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Packages"
        title="Live music for your drinks reception."
        intro="Every package is built around the drinks reception — two hours of live music as your guests gather after the ceremony. Start with solo handpan, or add double bass and flute or violin for a fuller sound."
      />

      <section className="container-prose pb-28">
        <div className="grid md:grid-cols-2 gap-6">
          {packages.map((p) => (
            <article
              key={p.name}
              className={
                "relative rounded-3xl bg-card p-9 border transition-colors " +
                (p.featured
                  ? "border-sage-deep/50 ring-1 ring-sage-deep/20"
                  : "border-border/70")
              }
            >
              {p.featured && (
                <span className="absolute -top-3 left-9 text-[0.62rem] tracking-[0.22em] uppercase bg-sage-deep text-cream px-3 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}
              <h2 className="font-serif text-3xl">{p.name}</h2>
              <p className="mt-2 text-sage-deep font-medium">{p.price}</p>
              <p className="mt-5 text-foreground/75 leading-relaxed">{p.body}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-foreground/80">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage-deep flex-none" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/contact" className={p.featured ? "btn-primary" : "btn-outline"}>
                  Enquire about this package
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground max-w-xl mx-auto">
          Additional playing time, ceremony music, and further travel are all available on request — quoted individually so the day fits together properly.
        </p>
      </section>
    </>
  );
}
