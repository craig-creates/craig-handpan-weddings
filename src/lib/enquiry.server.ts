// Server-only helpers for the wedding enquiry pipeline: Resend email + HubSpot CRM.
// Direct provider API calls (no Lovable connector gateway) so the site stays
// portable when exported to GitHub and hosted on Cloudflare or anywhere else.

export interface EnquiryData {
  names: string;
  email: string;
  phone?: string;
  date?: string; // YYYY-MM-DD
  venue?: string;
  part?: string;
  guests?: number;
  setting?: string;
  packageInterest?: string;
  requests?: string;
  referral?: string;
}

const NOTIFY_FROM = "Handpan Weddings <enquiries@handpanweddings.com>";
const COUPLE_FROM = "Craig Coppack <craig@handpanweddings.com>";
// Used automatically until handpanweddings.com is verified in Resend.
const RESEND_FALLBACK_FROM = "Handpan Weddings <onboarding@resend.dev>";

const HUBSPOT_BASE = "https://api.hubapi.com";

// ---------------------------------------------------------------------------
// Resend
// ---------------------------------------------------------------------------

async function resendSend(
  apiKey: string,
  payload: { from: string; to: string[]; subject: string; html: string; reply_to?: string },
): Promise<void> {
  const attempt = async (from: string) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, from }),
    });
    return res;
  };

  let res = await attempt(payload.from);
  // Domain not yet verified → retry once from Resend's shared test address so
  // the enquiry is never silently dropped while DNS propagates.
  if (!res.ok && (res.status === 403 || res.status === 422)) {
    const body = await res.clone().text().catch(() => "");
    if (/domain|verify|not.?verified/i.test(body)) {
      res = await attempt(RESEND_FALLBACK_FROM);
    }
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Resend send failed [${res.status}]: ${body}`);
  }
}

function esc(value: string | undefined): string {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | number | undefined): string {
  if (value === undefined || value === "") return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#8a8577;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:6px 0;color:#2e2b25;font-size:14px;">${esc(String(value))}</td>
  </tr>`;
}

export async function sendEnquiryEmails(data: EnquiryData, notifyEmail: string): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured");

  const dateLabel = data.date
    ? new Date(`${data.date}T12:00:00Z`).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : undefined;

  // 1) Notification to Craig — must succeed or the whole submission fails.
  const notifyHtml = `
  <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2e2b25;">
    <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8577;margin:0 0 8px;">New wedding enquiry</p>
    <h1 style="font-size:26px;font-weight:normal;margin:0 0 20px;">${esc(data.names)}</h1>
    <table style="border-collapse:collapse;">
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Wedding date", dateLabel)}
      ${row("Venue", data.venue)}
      ${row("Part of the day", data.part)}
      ${row("Guest count", data.guests)}
      ${row("Setting", data.setting)}
      ${row("Package", data.packageInterest)}
      ${row("Found you via", data.referral)}
    </table>
    ${
      data.requests
        ? `<p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8577;margin:24px 0 8px;">In their words</p>
           <p style="font-size:14px;line-height:1.6;font-style:italic;border-left:3px solid #b9c4ad;padding-left:14px;margin:0;">${esc(data.requests)}</p>`
        : ""
    }
    <p style="margin-top:28px;font-size:13px;color:#8a8577;">Reply directly to this email to respond to the couple.</p>
  </div>`;

  await resendSend(apiKey, {
    from: NOTIFY_FROM,
    to: [notifyEmail],
    subject: `Wedding enquiry — ${data.names}${data.date ? ` — ${data.date}` : ""}`,
    html: notifyHtml,
    reply_to: data.email,
  });

  // 2) Warm confirmation to the couple — failure here must not lose the enquiry.
  try {
    const firstName = data.names.split(/[\s&,]+/).filter(Boolean)[0] ?? "there";
    const coupleHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#2e2b25;">
      <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#8a8577;margin:0 0 8px;">Handpan Weddings</p>
      <h1 style="font-size:26px;font-weight:normal;margin:0 0 16px;">Thank you, ${esc(firstName)}.</h1>
      <p style="font-size:15px;line-height:1.7;margin:0 0 14px;">Your enquiry has reached me — thank you for thinking of handpan music for your day.</p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 14px;">I'll come back to you within a day or two with availability${
        dateLabel ? ` for <strong>${esc(dateLabel)}</strong>` : ""
      } and a few ideas shaped around what you've told me.</p>
      <p style="font-size:15px;line-height:1.7;margin:0 0 24px;">If anything changes in the meantime, just reply to this email.</p>
      <p style="font-size:15px;line-height:1.7;margin:0;">Warmly,<br/>Craig</p>
      <p style="font-size:12px;color:#8a8577;margin-top:28px;">Craig Coppack · Handpan Weddings · handpanweddings.com</p>
    </div>`;

    await resendSend(apiKey, {
      from: COUPLE_FROM,
      to: [data.email],
      subject: "Your wedding enquiry — thank you",
      html: coupleHtml,
      reply_to: "craig@handpanweddings.com",
    });
  } catch (err) {
    console.error("Couple confirmation email failed (notification already sent):", err);
  }
}

// ---------------------------------------------------------------------------
// HubSpot
// ---------------------------------------------------------------------------

function splitNames(names: string): { firstname: string; lastname?: string } {
  const trimmed = names.trim();
  // Couples ("Hannah & Tom", "Hannah and Tom") → first partner as firstname,
  // full names stay on the deal name and note.
  const coupleMatch = trimmed.split(/\s+(?:&|and)\s+/i);
  if (coupleMatch.length > 1) {
    return { firstname: coupleMatch[0]!.trim() };
  }
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstname: parts[0]! };
  return { firstname: parts[0]!, lastname: parts.slice(1).join(" ") };
}

function packageAmount(packageInterest?: string): number | undefined {
  if (!packageInterest) return undefined;
  if (packageInterest.startsWith("Solo")) return 600;
  if (packageInterest.startsWith("Handpan Duo")) return 1050;
  if (packageInterest.startsWith("Handpan Trio")) return 1450;
  return undefined;
}

async function hubspot(
  token: string,
  path: string,
  init: RequestInit,
  label: string,
): Promise<Response> {
  const res = await fetch(`${HUBSPOT_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HubSpot ${label} failed [${res.status}]: ${body}`);
  }
  return res;
}

async function upsertContact(token: string, data: EnquiryData): Promise<string> {
  const { firstname, lastname } = splitNames(data.names);
  const properties: Record<string, string> = {
    email: data.email,
    firstname,
    hs_lead_status: "NEW",
  };
  if (lastname) properties.lastname = lastname;
  if (data.phone) properties.phone = data.phone;

  // Match on email so repeat enquiries update rather than duplicate.
  const searchRes = await hubspot(
    token,
    "/crm/v3/objects/contacts/search",
    {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "email", operator: "EQ", value: data.email }] },
        ],
        properties: ["email"],
        limit: 1,
      }),
    },
    "contact search",
  );
  const searchBody = (await searchRes.json()) as { results?: Array<{ id: string }> };
  const existingId = searchBody.results?.[0]?.id;

  if (existingId) {
    await hubspot(
      token,
      `/crm/v3/objects/contacts/${existingId}`,
      { method: "PATCH", body: JSON.stringify({ properties }) },
      "contact update",
    );
    return existingId;
  }

  const createRes = await hubspot(
    token,
    "/crm/v3/objects/contacts",
    { method: "POST", body: JSON.stringify({ properties }) },
    "contact create",
  );
  const created = (await createRes.json()) as { id: string };
  return created.id;
}

// Custom deal properties for the wedding specifics — filterable/reportable in
// HubSpot rather than buried in the note. Created automatically on first use.
const CUSTOM_DEAL_PROPERTIES: Array<{
  name: string;
  label: string;
  type: string;
  fieldType: string;
}> = [
  { name: "wedding_date", label: "Wedding date", type: "date", fieldType: "date" },
  { name: "wedding_venue", label: "Wedding venue", type: "string", fieldType: "text" },
  { name: "part_of_day", label: "Part of the day", type: "string", fieldType: "text" },
  { name: "package_interest", label: "Package interest", type: "string", fieldType: "text" },
  { name: "guest_count", label: "Guest count", type: "number", fieldType: "number" },
  { name: "wedding_setting", label: "Wedding setting", type: "string", fieldType: "text" },
  { name: "special_requests", label: "Special requests", type: "string", fieldType: "textarea" },
  { name: "referral_source", label: "Referral source", type: "string", fieldType: "text" },
];

// Idempotent: lists existing deal properties, creates any that are missing,
// and returns the set of property names safe to write on the deal.
async function ensureDealProperties(token: string): Promise<Set<string>> {
  try {
    const res = await hubspot(token, "/crm/v3/properties/deals", { method: "GET" }, "list deal properties");
    const body = (await res.json()) as { results?: Array<{ name: string }> };
    const existing = new Set((body.results ?? []).map((p) => p.name));
    const ensured = new Set<string>();
    for (const def of CUSTOM_DEAL_PROPERTIES) {
      if (existing.has(def.name)) {
        ensured.add(def.name);
        continue;
      }
      try {
        await hubspot(
          token,
          "/crm/v3/properties/deals",
          { method: "POST", body: JSON.stringify({ ...def, groupName: "dealinformation" }) },
          `create deal property ${def.name}`,
        );
        ensured.add(def.name);
      } catch (err) {
        console.error(`HubSpot could not create deal property "${def.name}":`, err);
      }
    }
    return ensured;
  } catch (err) {
    // Token lacks schema permission — enquiry details stay safe in the note.
    console.error(
      "HubSpot deal properties unavailable — create them manually in Settings → Properties. Details will be kept in the deal note.",
      err,
    );
    return new Set();
  }
}

function noteBody(data: EnquiryData): string {
  const lines = [
    `Wedding enquiry via handpanweddings.com`,
    ``,
    `Names: ${data.names}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.date ? `Wedding date: ${data.date}` : null,
    data.venue ? `Venue: ${data.venue}` : null,
    data.part ? `Part of the day: ${data.part}` : null,
    data.guests ? `Guest count: ${data.guests}` : null,
    data.setting ? `Setting: ${data.setting}` : null,
    data.packageInterest ? `Package: ${data.packageInterest}` : null,
    data.referral ? `Found via: ${data.referral}` : null,
    data.requests ? `` : null,
    data.requests ? `In their words: ${data.requests}` : null,
  ].filter((l): l is string => l !== null);
  return lines.join("\n");
}

export async function createHubspotRecords(data: EnquiryData): Promise<void> {
  const token = process.env["HUBSPOT_PRIVATE_APP_TOKEN"];
  if (!token) throw new Error("HUBSPOT_PRIVATE_APP_TOKEN is not configured");

  const contactId = await upsertContact(token, data);

  const dealProperties: Record<string, string> = {
    dealname: `${data.names} — wedding${data.date ? ` ${data.date}` : ""}`,
    pipeline: "default",
    dealstage: "appointmentscheduled",
  };
  const amount = packageAmount(data.packageInterest);
  if (amount) dealProperties.amount = String(amount);
  if (data.date) {
    // Noon UTC avoids timezone shifting the calendar date.
    dealProperties.closedate = String(new Date(`${data.date}T12:00:00Z`).getTime());
  }

  const dealRes = await hubspot(
    token,
    "/crm/v3/objects/deals",
    {
      method: "POST",
      body: JSON.stringify({
        properties: dealProperties,
        associations: [
          {
            to: { id: contactId },
            // HubSpot-defined deal → contact association.
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
          },
        ],
      }),
    },
    "deal create",
  );
  const deal = (await dealRes.json()) as { id: string };

  // Attach the full enquiry as a note on both the deal and the contact.
  // Non-fatal: if the token lacks the notes scope, contact + deal already exist.
  try {
    await hubspot(
      token,
      "/crm/v3/objects/notes",
      {
        method: "POST",
        body: JSON.stringify({
          properties: {
            hs_note_body: noteBody(data),
            hs_timestamp: String(Date.now()),
          },
          associations: [
            {
              to: { id: deal.id },
              types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 214 }],
            },
            {
              to: { id: contactId },
              types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
            },
          ],
        }),
      },
      "note create",
    );
  } catch (err) {
    console.error("HubSpot note create failed (contact + deal already created):", err);
  }
}
