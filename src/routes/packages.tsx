import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "./weddings";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Wedding Handpan Packages & Pricing | From £350" },
      {
        name: "description",
        content:
          "Wedding handpan packages and pricing. Ceremony from £350, Ceremony + Drinks Reception from £500, Half-Day Atmosphere from £750, and bespoke quotes.",
      },
      { property: "og:title", content: "Wedding Handpan Packages & Pricing | From £350" },
      { property: "og:description", content: "Clear, calm pricing for live handpan wedding music." },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

const packages = [
  {
    name: "Ceremony",
    price: "From £350",
    body: "Includes guest arrival, aisle walk, signing of the register, and exit music.",
    bullets: [
      "Up to ~45 minutes of live music",
      "Indoor or outdoor performance",
      "Professional setup and arrival",
    ],
    featured: false,
  },
  {
    name: "Ceremony + Drinks Reception",
    price: "From £500",
    body: "Includes ceremony music plus 60–90 minutes of relaxed reception music.",
    bullets: [
      "Full ceremony coverage",
      "60–90 minutes of reception music",
      "Acoustic — no power needed in most spaces",
      "Most chosen by couples",
    ],
    featured: true,
  },
  {
    name: "Half-Day Atmosphere",
    price: "From £750",
    body: "Includes ceremony, drinks reception, and gentle wedding breakfast ambience.",
    bullets: [
      "Ceremony + reception + dining",
      "Up to ~3 hours of music across the day",
      "Coordinated with planners and photographers",
    ],
    featured: false,
  },
  {
    name: "Bespoke / Destination",
    price: "Price on enquiry",
    body: "For elopements, private estates, retreats, unusual venues, and longer travel.",
    bullets: [
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
        title="Live handpan packages for weddings."
        intro="Most couples book the Ceremony + Drinks Reception package, starting from £500. Every package can be tailored — share your day and I'll send a clear quote."
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
          Prices are starting points and may vary with travel, timings, and venue
          requirements. A bespoke quote is provided after a short enquiry.
        </p>
      </section>
    </>
  );
}
