import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./weddings";
import detailImg from "@/assets/handpan-detail.jpg";
import ceremonyImg from "@/assets/ceremony.jpg";
import receptionImg from "@/assets/reception.jpg";
import elopementImg from "@/assets/elopement.jpg";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: "Listen & Watch | Handpan Wedding Music" },
      {
        name: "description",
        content:
          "Listen to live handpan music for weddings — video performances and audio clips from ceremonies, drinks receptions, and intimate celebrations.",
      },
      { property: "og:title", content: "Listen & Watch | Handpan Wedding Music" },
      { property: "og:description", content: "Hear the handpan before you book." },
      { property: "og:url", content: "/listen" },
    ],
    links: [{ rel: "canonical", href: "/listen" }],
  }),
  component: ListenPage,
});

function ListenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Listen & Watch"
        title="Hear the handpan."
        intro="Most couples decide the moment they hear it. A few short pieces from real weddings and recording sessions."
      />

      {/* Featured video */}
      <section className="container-prose pb-20">
        <div className="rounded-3xl overflow-hidden border border-border bg-muted aspect-video grid place-items-center relative">
          <img
            src={detailImg}
            alt="Featured handpan performance"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-earth/30" />
          <button
            type="button"
            className="relative z-10 inline-flex items-center gap-3 rounded-full bg-cream/95 text-earth px-6 py-3 font-medium hover:bg-cream"
            aria-label="Play featured video"
          >
            <PlayIcon />
            Featured performance
          </button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Featured video placeholder — replace with a hosted YouTube or Vimeo embed.
        </p>
      </section>

      {/* Short clips */}
      <section className="container-prose pb-24">
        <h2 className="font-serif text-3xl">Short clips</h2>
        <div className="mt-8 grid sm:grid-cols-3 gap-5">
          {[
            { title: "Aisle walk", image: ceremonyImg },
            { title: "Drinks reception", image: receptionImg },
            { title: "Sunset elopement", image: elopementImg },
          ].map((c) => (
            <button
              key={c.title}
              type="button"
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] text-left"
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-5 text-cream">
                <PlayIcon />
                <span className="font-serif text-xl">{c.title}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Audio */}
      <section className="bg-muted/50 py-24">
        <div className="container-prose">
          <h2 className="font-serif text-3xl">Audio recordings</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            {[
              { title: "Ceremony — slow & melodic", length: "3:42" },
              { title: "Drinks reception — light & flowing", length: "4:15" },
            ].map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-border/70 bg-card p-6 flex items-center gap-5"
              >
                <button
                  type="button"
                  aria-label={`Play ${a.title}`}
                  className="h-14 w-14 rounded-full bg-sage-deep text-cream grid place-items-center hover:bg-earth transition-colors"
                >
                  <PlayIcon />
                </button>
                <div className="flex-1">
                  <div className="font-serif text-lg">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{a.length}</div>
                  <div className="mt-3 h-1 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-1/4 bg-sage-deep/60 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram */}
          <div className="mt-14 rounded-2xl border border-dashed border-border p-10 text-center bg-card/60">
            <p className="eyebrow">Instagram</p>
            <h3 className="mt-3 font-serif text-2xl">More moments on Instagram</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
              An Instagram feed embed can be added here once a handle is connected.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
