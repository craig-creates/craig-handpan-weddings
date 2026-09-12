import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "./weddings";
import heroImg from "@/assets/hero-handpan.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Craig | UK Handpan Wedding Musician" },
      {
        name: "description",
        content:
          "Craig is a UK handpan musician creating calm, atmospheric live music for weddings, ceremonies, and intimate celebrations.",
      },
      { property: "og:title", content: "About Craig | UK Handpan Wedding Musician" },
      { property: "og:description", content: "Calm, atmospheric live handpan music for weddings across the UK." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="A calm presence on your day." />

      <section className="container-prose pb-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="rounded-3xl overflow-hidden aspect-[4/5]">
            <img
              src={heroImg}
              alt="Craig playing handpan"
              width={1920}
              height={1280}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:pl-6 space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            I'm Craig, a handpan musician creating calm, atmospheric live music
            for weddings and intimate events. My background spans music,
            teaching, retreats, and live performance, which has shaped the way I
            approach wedding music: emotionally present, unobtrusive, and
            carefully held.
          </p>
          <p>
            The handpan works beautifully when a couple wants something more
            personal than a playlist, softer than a band, and more unusual than
            traditional ceremony music.
          </p>
          <p>
            Most of my work is in London, Surrey, Sussex, Kent, and Essex,
            with further travel by arrangement. Whatever the venue — a barn, a
            country garden, a small registry office, or a wide-open field — the
            aim is the same: music that quietly belongs to the moment.
          </p>

          <div className="pt-4">
            <Link to="/contact" className="btn-primary">Check Availability</Link>
          </div>
        </div>
      </section>
    </>
  );
}
