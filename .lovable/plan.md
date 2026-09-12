# Fix the custom-domain enquiry configuration

## Confirmed findings

- `handpanweddings.com` now serves the recent version containing “Watch & Listen”, so GitHub-to-Cloudflare deployment is working.
- The displayed error can only be returned when the enquiry handler cannot read `ENQUIRY_NOTIFY_EMAIL`.
- The current code reads all three enquiry settings only through `process.env`, although Cloudflare also passes its environment bindings directly into the Worker request handler.
- The Lovable-hosted version works, so the email and HubSpot integration itself does not need redesigning.

## Changes

1. Add a small server-only environment bridge that safely exposes the Cloudflare request bindings to the enquiry code.
2. Update the server entry point to initialise that bridge from Cloudflare’s `env` argument before processing each request.
3. Update the enquiry email and HubSpot helpers to read settings through the bridge, retaining `process.env` as the fallback for Lovable and local development.
4. Keep secret values server-only and never include them in errors or responses.
5. Improve the deployment guide so the three values are explicitly documented as Cloudflare runtime bindings for Production:
   - `ENQUIRY_NOTIFY_EMAIL`
   - `RESEND_API_KEY`
   - `HUBSPOT_PRIVATE_APP_TOKEN`

## Verification

- Confirm the site still renders and the enquiry endpoint accepts validated requests.
- Confirm missing settings produce the existing safe customer-facing error without exposing details.
- After GitHub sync and Cloudflare’s redeploy, submit one clearly labelled live test enquiry and verify:
  - the form shows success;
  - Craig receives the notification;
  - the couple receives confirmation;
  - HubSpot creates or updates the contact and creates the deal.

## Technical details

The fix will use the `env` object already received by `src/server.ts` rather than depending exclusively on Cloudflare’s optional `process.env` population behavior. This keeps the same code portable across Cloudflare, Lovable hosting, and local development.
