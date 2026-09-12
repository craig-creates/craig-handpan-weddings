# Wedding enquiry form — email + HubSpot with full field mapping

## Goal

When someone submits the "Check My Wedding Date" form:
1. Craig gets an email with every detail (sent first, so nothing is ever lost)
2. The couple gets a warm confirmation from `craig@handpanweddings.com` (reply-to works, lands in the Zoho inbox)
3. HubSpot gets a contact AND a deal, with every relevant detail in its own proper field — contact fields, deal fields, and custom deal properties for the wedding specifics (not buried in a note)

## HubSpot field mapping

**Contact** (upsert by email — new enquiry updates, never duplicates):
- `email`, `firstname`, `lastname`, `phone` — split from the form
- `hs_lead_status: NEW`

**Deal** (one per enquiry, associated to the contact):
- `dealname`: "Wedding — {names} — {date or 'date TBC'}"
- `amount`: 600 / 1050 / 1450 from the package choice (blank if "not sure")
- `pipeline: default`, `dealstage: appointmentscheduled`
- `closedate`: the wedding date

**Custom deal properties** (created once, automatically, on first use):
- `wedding_date` (date)
- `wedding_venue` (text)
- `part_of_day` (text — e.g. drinks reception)
- `package_interest` (text)
- `guest_count` (number)
- `wedding_setting` (text — indoor/outdoor/mixed)
- `special_requests` (multi-line text)
- `referral_source` (text)

If the private app token lacks permission to create properties, the setup step reports this clearly and Craig creates them in HubSpot Settings → Properties (takes two minutes); the form then fills them. The note on the deal stays as a human-readable summary either way.

## What changes from the current build

- `src/lib/enquiry.server.ts` — add an idempotent `ensureDealProperties` step (checks which custom properties exist, creates any missing) that runs before deal creation, plus the custom property values on the deal payload
- No changes to the form, endpoint, validation, or emails

## Status of the rest (already built, pending a valid Resend key)

- Form, endpoint `/api/enquiry`, validation, honeypot, rate limiting — done and tested
- Notification email from `enquiries@handpanweddings.com` to Craig; confirmation from `craig@handpanweddings.com` — built; Resend rejects the saved API key (401), so emails wait on a valid key, and branded senders wait on `handpanweddings.com` verification in Resend (temporary fallback sender until then)
- Secrets stored: `RESEND_API_KEY` (invalid — needs updating), `HUBSPOT_PRIVATE_APP_TOKEN`, `ENQUIRY_NOTIFY_EMAIL`

## Technical details

- Portable by design: direct HTTPS calls to Resend and HubSpot from the server route — works identically on Lovable, Cloudflare Pages/Workers, or Vercel; only env vars need copying
- Property creation is checked-and-created per send (idempotent), so nothing breaks if properties already exist or are created manually in HubSpot
- HubSpot failures never block the emails — Craig always gets the enquiry by email even if the CRM step fails
