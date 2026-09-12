# Fix "enquiry service isn't configured" on the live site

## Diagnosis

- The live-site error is raised only when the `ENQUIRY_NOTIFY_EMAIL` secret is missing at runtime.
- All three required secrets exist on the project: `ENQUIRY_NOTIFY_EMAIL`, `RESEND_API_KEY`, `HUBSPOT_PRIVATE_APP_TOKEN`.
- The same enquiry flow already returned `{"ok": true}` in an end-to-end test against the current build, so the code path works.
- Conclusion: the published (live) deployment is an older snapshot from before the secrets were added. It needs to be republished so the live server picks them up. No code change is required.

## Steps

1. Republish the site (Publish → Update) so the live deployment includes the current secrets.
2. Submit a labelled test enquiry on the live site (e.g. names "Test Couple — please ignore") and confirm the success screen appears.
3. Confirm the notification email lands in craig@handpanweddings.com, the confirmation email reaches the test sender address, and a contact + deal appear in HubSpot.
4. Delete the test contact/deal from HubSpot afterwards.

## Technical details

- Error source: `src/routes/api/enquiry.ts` returns "The enquiry service isn't configured yet." (HTTP 500) when `process.env.ENQUIRY_NOTIFY_EMAIL` is unset.
- Secrets are injected into the server runtime per deployment; the published deployment predates the secrets.
- If republishing does not fix it, fallback step: re-save `ENQUIRY_NOTIFY_EMAIL` as `craig@handpanweddings.com` and republish again.
