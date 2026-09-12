import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "./weddings";
import { BRAND_NAME, CONTACT_EMAIL, SITE_URL, url } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Handpan Weddings" },
      {
        name: "description",
        content:
          "Privacy policy for Handpan Weddings — what data is collected, how cookies and analytics work, and your rights.",
      },
      { property: "og:title", content: "Privacy Policy | Handpan Weddings" },
      { property: "og:description", content: "How Handpan Weddings handles your data and privacy." },
      { property: "og:url", content: url("/privacy") },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url("/privacy") }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy Policy" />

      <section className="container-prose pb-28 max-w-3xl space-y-6 text-foreground/80 leading-relaxed">
        <p className="text-sm text-muted-foreground">
          Last updated: September 2026
        </p>

        <div>
          <h2 className="font-serif text-2xl text-foreground">Overview</h2>
          <p className="mt-3">
            {BRAND_NAME} is a small business operated by Craig Coppack,
            providing live handpan music for weddings. This page explains what
            information is collected, why, and your choices.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-foreground">Enquiry data</h2>
          <p className="mt-3">
            When you submit the enquiry form, the details you provide — your
            name, email, phone number, wedding date, venue, and any notes —
            are sent to {BRAND_NAME} by email and stored in a customer
            relationship management system (HubSpot). This is used solely to
            respond to your enquiry, check availability, and arrange your
            booking. Your data is not sold or shared with third parties for
            marketing.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-foreground">Cookies & analytics</h2>
          <p className="mt-3">
            This site uses cookies for analytics and advertising measurement
            (Meta Pixel and Cloudflare Web Analytics). These only run if you
            accept cookies via the consent banner. If you decline, no
            tracking cookies are set. You can change your choice at any time
            by clearing your browser storage for this site.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-foreground">Your rights</h2>
          <p className="mt-3">
            Under UK GDPR you have the right to access, correct, or request
            deletion of your personal data. To exercise any of these rights,
            email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sage-deep underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-foreground">Contact</h2>
          <p className="mt-3">
            Questions about privacy? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-sage-deep underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or use the{" "}
            <Link to="/contact" className="text-sage-deep underline">
              enquiry form
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
