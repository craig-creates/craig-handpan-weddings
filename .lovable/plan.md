# Wedding enquiry form: email notification + HubSpot

Right now the form only shows a thank-you message — nothing is sent or saved. This plan makes each enquiry do two things: email you straight away, and create a contact plus a deal in your HubSpot pipeline.

It will be built so the whole site stays portable: if you export to GitHub and host on Cloudflare, it keeps working, because it only uses your own API keys — nothing tied to Lovable.

## What happens when someone clicks "Check my wedding date"

1. The form sends the details to a small endpoint that runs on the server (works the same on Lovable hosting and on Cloudflare).
2. You get an email with every field: names, email, phone, wedding date, venue, part of the day, guest count, indoor/outdoor, package interest, special requests, how they found you.
3. HubSpot gets a new contact (or updates an existing one matched by email) and a new deal in your pipeline, named after the couple, with the wedding details attached as a note and the package value where one is chosen.
4. The couple sees the thank-you message; if anything fails behind the scenes, they see a friendly error with your email address so nothing is lost.

The email is sent first, so even if HubSpot ever rejects something, the enquiry still reaches your inbox.

## Your email setup (Zoho Mail + handpanweddings.com)

You've bought **handpanweddings.com** and are connecting Zoho Mail for your inbox. Enquiry notifications will arrive at your Zoho address (e.g. craig@handpanweddings.com) — that's where you'll read them.

**Important — why we still need a sending service (Resend):** Cloudflare Workers can't open raw SMTP connections, so the app can't send email via Zoho's SMTP directly. It needs an HTTP-based email API. **Resend** is the simplest: you paste an API key, verify the domain with a few DNS records (DKIM/SPF — separate from Zoho's MX records, so they coexist with no conflict), and the app sends from `notifications@handpanweddings.com`. The email lands in your Zoho inbox like any other message.

## What you need to provide

- **Resend API key** ✅ — already saved securely.
- **Your Zoho Mail inbox address** ✅ — craig@handpanweddings.com. (I'll store this as a config value when we build.)
- **HubSpot private app token** with contact and deal write permissions — you create this in HubSpot as an admin. Hand it over whenever it's ready.

One thing left on Resend's side: verify **handpanweddings.com** by adding the DKIM/SPF records Resend shows you (they sit alongside your Zoho MX records with no conflict). Until that's done, sending works but from a test address.

## Confirmation email to the couple

As well as notifying you, the form sends the couple a short, warm confirmation email from notifications@handpanweddings.com — "Thanks, I've got your enquiry and I'll come back to you within a day or two." This goes live once Resend verification completes.

## Technical notes

- New server route `src/routes/api/enquiry.ts` (POST). Input validated with Zod; simple honeypot field plus basic per-IP throttling to blunt spam bots.
- `src/lib/enquiry.server.ts` holds two helpers: `sendEnquiryEmail()` (POST to `https://api.resend.com/emails`) and `createHubspotRecords()` (POST `/crm/v3/objects/contacts` with an idempotent upsert by email, `/crm/v3/objects/deals`, then the association and a note). Direct provider calls with `fetch` — no Lovable connector gateway, so nothing breaks off-platform.
- Secrets read inside the handler via `process.env`: `RESEND_API_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN`, `ENQUIRY_NOTIFY_EMAIL`. On Cloudflare these are set as Worker environment variables.
- `src/routes/contact.tsx` form becomes controlled/`FormData`-driven with pending and error states; keeps the existing styling and success panel.
- Deal properties: `dealname`, `amount` (from the selected package), `pipeline`/`dealstage` default, `closedate` from the wedding date. Wedding-specific fields go into a note rather than custom properties, so no HubSpot schema changes are needed.
