# Wedding enquiry form: email notification + HubSpot

Right now the form only shows a thank-you message — nothing is sent or saved. This plan makes each enquiry do two things: email you straight away, and create a contact plus a deal in your HubSpot pipeline.

It will be built so the whole site stays portable: if you export to GitHub and host on Cloudflare, it keeps working, because it only uses your own Resend and HubSpot keys — nothing tied to Lovable.

## What happens when someone clicks "Check my wedding date"

1. The form sends the details to a small endpoint that runs on the server (works the same on Lovable hosting and on Cloudflare).
2. You get an email with every field: names, email, phone, wedding date, venue, part of the day, guest count, indoor/outdoor, package interest, special requests, how they found you.
3. HubSpot gets a new contact (or updates an existing one matched by email) and a new deal in your pipeline, named after the couple, with the wedding details attached as a note and the package value where one is chosen.
4. The couple sees the thank-you message; if anything fails behind the scenes, they see a friendly error with your email address so nothing is lost.

The email is sent first, so even if HubSpot ever rejects something, the enquiry still reaches your inbox.

## What you need to provide

- **Resend account + API key** (free tier is plenty). Resend is the email service; it's a plain API key, so it moves with the site anywhere.
- **HubSpot private app token** with contact and deal write permissions — you create this in HubSpot as an admin.
- **The email address** enquiry notifications should go to (e.g. your personal/Gmail address).

Both keys get stored securely, never in the code.

## About the sender domain

You've bought **handpanweddings.com**. We'll verify it in Resend (a few DNS records — Resend shows you exactly what to add), then send all email from `notifications@handpanweddings.com` (or whatever prefix you prefer). Until verification completes, Resend can only send from its test address to your own account email — fine for testing, but real sends need the verified domain. No code changes when verification goes live; it just starts working.

## Confirmation email to the couple

As well as notifying you, the form sends the couple a short, warm confirmation email from your domain — "Thanks, I've got your enquiry and I'll come back to you within a day or two." This needs the verified domain, so it goes live once Resend verification completes.

## Technical notes

- New server route `src/routes/api/enquiry.ts` (POST). Input validated with Zod; simple honeypot field plus basic per-IP throttling to blunt spam bots.
- `src/lib/enquiry.server.ts` holds two helpers: `sendEnquiryEmail()` (POST to `https://api.resend.com/emails`) and `createHubspotRecords()` (POST `/crm/v3/objects/contacts` with an idempotent upsert by email, `/crm/v3/objects/deals`, then the association and a note). Direct provider calls with `fetch` — no Lovable connector gateway, so nothing breaks off-platform.
- Secrets read inside the handler via `process.env`: `RESEND_API_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN`, `ENQUIRY_NOTIFY_EMAIL`. On Cloudflare these are set as Worker environment variables.
- `src/routes/contact.tsx` form becomes controlled/`FormData`-driven with pending and error states; keeps the existing styling and success panel.
- Deal properties: `dealname`, `amount` (from the selected package), `pipeline`/`dealstage` default, `closedate` from the wedding date. Wedding-specific fields go into a note rather than custom properties, so no HubSpot schema changes are needed.
