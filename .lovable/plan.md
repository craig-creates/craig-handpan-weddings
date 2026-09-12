# Fix "enquiry service isn't configured" on handpanweddings.com

## Diagnosis

- The enquiry form works on the Lovable-hosted version but fails on handpanweddings.com (your own Cloudflare deployment from the GitHub export).
- The error is raised only when the `ENQUIRY_NOTIFY_EMAIL` environment variable is missing at runtime.
- All three secrets exist in Lovable, but secrets do not travel with the GitHub export — the Cloudflare Worker has none of them, so the enquiry endpoint reports "not configured".
- No code change is needed; this is a Cloudflare configuration step.

## Steps (done in your Cloudflare dashboard — takes ~5 minutes)

1. In Cloudflare, open the Worker/Pages project serving handpanweddings.com.
2. Go to **Settings → Variables and Secrets** (Workers) or **Settings → Environment variables** (Pages).
3. Add these three variables to the **Production** environment:
   - `RESEND_API_KEY` — your Resend key (starts `re_`), mark as secret
   - `HUBSPOT_PRIVATE_APP_TOKEN` — your HubSpot token (starts `pat-eu1-`), mark as secret
   - `ENQUIRY_NOTIFY_EMAIL` — `craig@handpanweddings.com`
4. Redeploy (Cloudflare: trigger a new deployment, or push any commit to GitHub) so the variables take effect.
5. Submit a labelled test enquiry on handpanweddings.com (e.g. names "Test Couple — please ignore") and confirm the success screen appears.
6. Confirm the notification email arrives at craig@handpanweddings.com, the confirmation email reaches the test sender, and a contact + deal appear in HubSpot. Delete the test records afterwards.

## Optional hardening (code, only if wanted)

- Make the not-configured error message friendlier and point visitors to email you directly, in case env vars are ever missing again.
- Add a comment block at the top of `src/routes/api/enquiry.ts` listing the required env vars so future-you sees it in the repo.

## Technical details

- Error source: `src/routes/api/enquiry.ts` returns "The enquiry service isn't configured yet." (HTTP 500) when `process.env.ENQUIRY_NOTIFY_EMAIL` is unset.
- DEPLOY.md already documents these three variables for Cloudflare; this plan is the hands-on application of that step.
