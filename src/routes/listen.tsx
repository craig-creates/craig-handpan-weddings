import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { PageHeader } from "./weddings";
import detailImg from "@/assets/handpan-detail.jpg";
import receptionImg from "@/assets/reception.jpg";
import { url, SITE_URL, INSTAGRAM_URL } from "@/lib/site";
import { INSTAGRAM_POSTS } from "@/lib/instagram-posts";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: "Listen & Watch | Handpan Weddings" },
      {
        name: "description",
        content:
          "Hear the handpan — a soft, floating sound ideal for wedding drinks receptions. See performances on Instagram.",
      },
      { property: "og:title", content: "Listen & Watch | Handpan Weddings" },
      { property: "og:description", content: "Hear the handpan before you book." },
      { property: "og:url", content: url("/listen") },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url("/listen") }],
  }),
  component: ListenPage,
});

function InstagramFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram embed script once.
    const existing = document.querySelector(
      'script[src*="instagram.com/embed.js"]',
    );
    if (!existing) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      script.onload = () => {
        window.instgrm?.Embeds?.process();
      };
      document.body.appendChild(script);
    } else {
      // Script already loaded — reprocess embeds.
      window.instgrm?.Embeds?.process();
    }
  }, []);

  if (INSTAGRAM_POSTS.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12"
    >
      {INSTAGRAM_POSTS.map((postUrl) => (
        <blockquote
          key={postUrl}
          className="instagram-media rounded-2xl overflow-hidden"
          data-instgrm-permalink={postUrl}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            margin: 0,
            padding: 0,
          }}
        >
          <div style={{ padding: "16px" }}>
            <a
              href={postUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#c9c8c8",
                fontFamily: "Arial,sans-serif",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              View on Instagram
            </a>
          </div>
        </blockquote>
      ))}
    </div>
  );
}

function ListenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Listen & Watch"
        title="Hear the handpan."
        intro="Most couples decide the moment they hear it. A few short recordings are on the way — in the meantime, here's what to expect."
      />

      {/* Instagram feed / coming soon */}
      <section className="container-prose pb-20">
        {INSTAGRAM_POSTS.length > 0 ? (
          <div className="text-center">
            <p className="eyebrow">Instagram</p>
            <h2 className="mt-4 heading-display text-3xl md:text-4xl">
              Latest from Instagram
            </h2>
            <p className="mt-5 text-foreground/75 leading-relaxed">
              Performances, behind-the-scenes moments, and real wedding clips
              from{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                @kohpancraig
              </a>
              .
            </p>
            <InstagramFeed />
          </div>
        ) : (
          <div className="rounded-3xl overflow-hidden border border-border bg-muted aspect-video relative grid place-items-center">
            <img
              src={detailImg}
              alt="Handpan performance at a wedding"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-earth/30" />
            <div className="relative z-10 text-center px-6">
              <p className="text-[0.7rem] tracking-[0.3em] uppercase text-cream/85">
                Coming soon
              </p>
              <h2 className="mt-3 heading-display text-3xl md:text-4xl text-cream">
                Recordings are on the way
              </h2>
              <p className="mt-4 text-cream/80 leading-relaxed max-w-md mx-auto">
                Short clips from real weddings and recording sessions will
                appear here. In the meantime, follow along on Instagram or
                send an enquiry to hear more.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Instagram + CTA */}
      <section className="bg-muted/50 py-24">
        <div className="container-prose max-w-2xl text-center">
          <p className="eyebrow">Instagram</p>
          <h2 className="mt-4 heading-display text-3xl md:text-4xl">
            Follow the journey on Instagram
          </h2>
          <p className="mt-5 text-foreground/75 leading-relaxed">
            New performances, behind-the-scenes moments, and real wedding
            clips are shared regularly.
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            Follow @kohpancraig
          </a>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="container-prose py-24">
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
            <p className="text-[0.7rem] tracking-[0.3em] uppercase text-cream/85">
              Enquire
            </p>
            <h2 className="mt-4 heading-display text-4xl md:text-5xl text-cream">
              Hear it in person.
            </h2>
            <p className="mt-5 text-cream/85 leading-relaxed">
              The best way to know if handpan is right for your day is to talk
              it through. Share your date and I'll come back with ideas.
            </p>
            <Link
              to="/contact"
              className="btn-outline mt-8 border-cream/40 text-cream hover:bg-cream/10 hover:border-cream/60"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
