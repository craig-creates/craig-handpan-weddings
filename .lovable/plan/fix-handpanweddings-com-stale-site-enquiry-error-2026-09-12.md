# Fix handpanweddings.com: stale site + enquiry error

## Diagnosis

Two linked issues, both on the Cloudflare side — the Lovable version works correctly:

1. **Stale content** (old "Watch & Listen" state): handpanweddings.com is built by Cloudflare from your GitHub repository. My recent edits exist only in Lovable — they reach your live site only after the code is synced to GitHub and Cloudflare rebuilds. Nothing is broken; the GitHub copy is simply behind.
2. **"Enquiry service isn't configured"**: raised only when `ENQUIRY_NOTIFY_EMAIL` is missing at runtime. You've now added the three variables in Cloudflare — but they only take effect on the **next deployment**, which the stale build hasn't had.

So one action fixes both: get the latest code into GitHub so Cloudflare redeploys with the new variables in place.

## Steps

1. Sync this project to GitHub:
   - If the GitHub sync is already connected: push the latest changes (Lovable syncs on each commit; if the repo looks stale, use the GitHub sync button in project settings to force a sync).
   - If not yet connected: connect GitHub in Lovable (Project Settings → GitHub) and let it push the full current codebase.
2. Confirm the Cloudflare deployment triggers automatically from the push (Cloudflare dashboard → your project → Deployments). If it doesn't, trigger "Retry deployment" manually.
3. Once the deploy is live, verify on handpanweddings.com:
   - The homepage shows the new "Watch & Listen" button (proves content is current).
   - Submit a labelled test enquiry (e.g. names "Test Couple — please ignore") and confirm the success screen appears.
4. Confirm the notification email arrives at craig@handpanweddings.com, the confirmation email reaches the test sender, and a contact + deal appear in HubSpot. Delete the test records afterwards.

## Fallbacks if the sync or redeploy doesn't happen

- Re-check that the three Cloudflare variables are set on the **Production** environment (not just Preview).
- Confirm Cloudflare is watching the correct GitHub branch (usually `main`).

## Technical details

- Error source: `src/routes/api/enquiry.ts` returns "The enquiry service isn't configured yet." (HTTP 500) when `process.env.ENQUIRY_NOTIFY_EMAIL` is unset.
- Required Cloudflare variables: `RESEND_API_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN`, `ENQUIRY_NOTIFY_EMAIL` (also documented in DEPLOY.md).
- No code changes are required for this fix — it's a sync + redeploy.
