import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { sendEnquiryEmails, createHubspotRecords } from "@/lib/enquiry.server";

const enquirySchema = z.object({
  names: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .or(z.literal("")),
  venue: z.string().trim().max(300).optional().or(z.literal("")),
  part: z.string().trim().max(100).optional().or(z.literal("")),
  guests: z.number().int().min(1).max(100000).optional(),
  setting: z.string().trim().max(100).optional().or(z.literal("")),
  packageInterest: z.string().trim().max(150).optional().or(z.literal("")),
  requests: z.string().trim().max(5000).optional().or(z.literal("")),
  referral: z.string().trim().max(300).optional().or(z.literal("")),
  // Honeypot — invisible to humans, filled by bots.
  company: z.string().max(200).optional().or(z.literal("")),
});

// Basic per-instance throttle: blunts spam bursts. Per-isolate on Workers, so
// it is a deterrent, not a guarantee — the honeypot does the heavier lifting.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function isThrottled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export const Route = createFileRoute("/api/enquiry")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          "unknown";
        if (isThrottled(ip)) {
          return Response.json(
            { ok: false, error: "Too many attempts — please try again in a few minutes." },
            { status: 429 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
        }

        const parsed = enquirySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Please check the form — a required field is missing or invalid." },
            { status: 400 },
          );
        }
        const data = parsed.data;

        // Honeypot tripped: pretend success, do nothing.
        if (data.company) {
          return Response.json({ ok: true });
        }

        const notifyEmail = process.env["ENQUIRY_NOTIFY_EMAIL"];
        if (!notifyEmail) {
          console.error("ENQUIRY_NOTIFY_EMAIL is not configured");
          return Response.json(
            { ok: false, error: "The enquiry service isn't configured yet." },
            { status: 500 },
          );
        }

        // Email first: the enquiry must reach the inbox even if HubSpot fails.
        try {
          await sendEnquiryEmails(data, notifyEmail);
        } catch (err) {
          console.error("Enquiry email failed:", err);
          return Response.json(
            {
              ok: false,
              error:
                "Something went wrong sending your enquiry. Please email craig@handpanweddings.com directly — your date matters.",
            },
            { status: 502 },
          );
        }

        try {
          await createHubspotRecords(data);
        } catch (err) {
          // Already safely in the inbox — log and carry on.
          console.error("HubSpot record creation failed (email already sent):", err);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
