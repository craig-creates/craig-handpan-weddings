import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-handpan.jpg";
import ceremonyImg from "@/assets/ceremony.jpg";
import receptionImg from "@/assets/reception.jpg";
import elopementImg from "@/assets/elopement.jpg";
import detailImg from "@/assets/handpan-detail.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Handpan Wedding Musician in Kent | Live Ceremony & Reception Music" },
      {
        name: "description",
        content:
          "Live handpan music for weddings, ceremonies, drinks receptions, elopements, and intimate celebrations across Kent, London, Sussex, Surrey, and beyond.",
      },
      { property: "og:title", content: "Handpan Wedding Musician in Kent | Live Ceremony & Reception Music" },
      {
        property: "og:description",
        content:
          "Live handpan music for weddings, ceremonies, drinks receptions, elopements, and intimate celebrations across Kent, London, Sussex, Surrey, and beyond.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "Craig — Handpan Wedding Musician",
          genre: ["Handpan", "Acoustic", "Wedding"],
          areaServed: ["Kent", "Canterbury", "London", "Sussex", "Surrey"],
          description:
            "Live handpan music for weddings, ceremonies, drinks receptions and intimate celebrations across the UK.",
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Handpan musician playing at an outdoor wedding"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-earth/30 via-earth/40 to-earth/70" />
        </div>

        <div className="container-prose min-h-[88vh] flex flex-col justify-end pb-20 pt-32 text-cream">
          <p className="text-[0.7rem] tracking-[0.3em] uppercase text-cream/85">
            Live Handpan · UK Weddings
          </p>
          <h1 className="mt-5 heading-display text-5xl sm:text-6xl md:text-7xl max-w-4xl text-cream">
            Live handpan music for soulful weddings.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-cream/90 leading-relaxed">
            Live handpan ambience for drinks receptions — solo or with double
            bass and clarinet. Also available for ceremonies,
            elopements, and intimate celebrations across Kent, London, Sussex,
            Surrey, and beyond.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">Check Availability</Link>
            <Link
              to="/listen"
              className="btn-outline border-cream/40 text-cream hover:bg-cream/10 hover:border-cream/60"
            >
              Listen to the Handpan
            </Link>
          </div>
        </div>
      </section>

      {/* WHY HANDPAN */}
      <section className="container-prose py-28 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-4 md:order-2">
          <img
            src={detailImg}
            alt="Close-up of hands playing a handpan"
            width={1280}
            height={1600}
            loading="lazy"
            className="rounded-2xl w-full object-cover aspect-[4/5]"
          />
        </div>
        <div className="md:col-span-8 md:order-1 md:pr-8">
          <p className="eyebrow">Why Handpan</p>
          <h2 className="mt-4 heading-display text-4xl md:text-5xl">
            An intimate, peaceful and truly unforgettable sound.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            The handpan has a soft, melodic, almost floating sound. It creates
            atmosphere without overpowering conversation — making it ideal for
            emotional ceremonies, relaxed drinks receptions, outdoor celebrations,
            and the quiet, important moments of the day.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <Stat label="LIVE PERFORMANCES SINCE" value="2021" />
            <Stat label="Areas covered" value="Kent · London · Sussex · Surrey" />
          </div>
        </div>
      </section>

      {/* WHERE IT FITS */}
      <section className="bg-muted/50 py-28">
        <div className="container-prose">
          <div className="max-w-2xl">
            <p className="eyebrow">Where it fits</p>
            <h2 className="mt-4 heading-display text-4xl md:text-5xl">
              Built for the drinks reception.
            </h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              Two hours of live music as your guests gather — with the option to
              add ceremony music, or scale up to a duo or trio for a fuller sound.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Drinks Reception",
                body: "The core offering. Two hours of live handpan as guests arrive from the ceremony — calm, melodic, unobtrusive.",
              },
              {
                title: "Duo — with Double Bass",
                body: "A warmer, fuller sound for larger receptions and grand spaces, while staying acoustic-forward.",
              },
              {
                title: "Trio — with Clarinet",
                body: "The most cinematic option — handpan, double bass, and clarinet.",
              },
              {
                title: "Ceremony (add-on)",
                body: "Guest arrival, aisle walk, signing of the register, and exit music — added to any package.",
              },
              {
                title: "Outdoor Weddings",
                body: "A natural acoustic sound that suits gardens, barns, and countryside venues.",
              },
              {
                title: "Elopements & Intimate",
                body: "Minimal, emotional, personal — for elopements, vow renewals, and small private gatherings.",
              },
            ].map((c) => (
              <article
                key={c.title}
                className="rounded-2xl bg-card border border-border/70 p-7 hover:border-sage-deep/40 transition-colors"
              >
                <h3 className="font-serif text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LISTEN PROMPT */}
      <section className="container-prose py-28">
        <div className="rounded-3xl overflow-hidden relative isolate">
          <img
            src={receptionImg}
            alt="Wedding drinks reception"
            width={1280}
            height={960}
            loading="lazy"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-earth/55" />
          <div className="px-8 py-24 md:px-16 md:py-32 text-cream max-w-2xl">
            <p className="text-[0.7rem] tracking-[0.3em] uppercase text-cream/85">Listen</p>
            <h2 className="mt-4 heading-display text-4xl md:text-5xl text-cream">
              Hear it before you imagine it.
            </h2>
            <p className="mt-5 text-cream/85 leading-relaxed">
              The handpan is unfamiliar to many. Spend a few minutes with the
              music — most people decide the moment they hear it.
            </p>
            <Link
              to="/listen"
              className="btn-outline mt-8 border-cream/40 text-cream hover:bg-cream/10 hover:border-cream/60"
            >
              Listen &amp; Watch
            </Link>
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="container-prose py-28">
        <div className="max-w-2xl">
          <p className="eyebrow">Wedding Packages</p>
          <h2 className="mt-4 heading-display text-4xl md:text-5xl">
            Built around your drinks reception.
          </h2>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            Two hours of live music as your guests gather after the ceremony —
            start with solo handpan, or add double bass and flute or violin for
            a fuller, more cinematic sound.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          <PackageCard
            image={ceremonyImg}
            title="Solo Handpan — £600"
            body="Two hours of live handpan through the drinks reception. Calm, melodic, completely acoustic."
          />
          <PackageCard
            image={receptionImg}
            title="Handpan Duo — £1,050"
            body="Handpan and double bass together — a warmer, fuller sound for larger receptions and grand spaces."
            featured
          />
          <PackageCard
            image={elopementImg}
            title="Handpan Trio — £1,450"
            body="Handpan, double bass, and your choice of flute or violin — a bespoke ensemble feel for the reception."
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/packages" className="btn-primary">View Packages</Link>
        </div>
      </section>


      {/* TRUST */}
      <section className="bg-muted/50 py-28">
        <div className="container-prose grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Reliable, refined</p>
            <h2 className="mt-4 heading-display text-4xl md:text-5xl">
              A musician your venue will be happy to work with.
            </h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              The day matters. Every detail — from the first email to setting up
              quietly in the corner — is handled with the same care as the music
              itself.
            </p>
            <Link to="/contact" className="btn-primary mt-8">Check Availability</Link>
          </div>

          <ul className="md:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {[
              "Calm, unobtrusive live music",
              "Suitable for indoor and outdoor ceremonies",
              "Professional communication before the day",
              "Arrival and setup handled smoothly",
              "Works with wedding planners, celebrants, and venues",
              "Public liability insurance held (PLI)",
              "Travel across Kent, London, Sussex, Surrey & beyond",
              "Acoustic — no power required for most ceremonies",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-foreground/85">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage-deep flex-none" />
                <span className="leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-serif text-2xl text-sage-deep">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

function PackageCard({
  title,
  body,
  image,
  featured = false,
}: {
  title: string;
  body: string;
  image: string;
  featured?: boolean;
}) {
  return (
    <article
      className={
        "group rounded-2xl overflow-hidden border bg-card transition-all " +
        (featured ? "border-sage-deep/50 shadow-sm" : "border-border/70")
      }
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt=""
          width={1280}
          height={960}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {featured && (
          <span className="absolute top-4 left-4 text-[0.62rem] tracking-[0.22em] uppercase bg-cream/95 text-earth px-3 py-1.5 rounded-full">
            Most Popular
          </span>
        )}
      </div>
      <div className="p-7">
        <h3 className="font-serif text-2xl">{title}</h3>
        <p className="mt-3 text-sm text-foreground/75 leading-relaxed">{body}</p>
      </div>
    </article>
  );
}
