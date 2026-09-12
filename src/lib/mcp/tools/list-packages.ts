import { defineTool } from "@lovable.dev/mcp-js";

const packages = [
  {
    name: "Solo Handpan",
    price: "£600",
    priceGbp: 600,
    summary:
      "Two hours of live handpan music through your drinks reception — gentle, melodic, and completely acoustic.",
    includes: [
      "2 hours of live music",
      "Indoor or outdoor performance",
      "Acoustic — no power needed in most spaces",
      "Professional setup and arrival",
    ],
    mostPopular: false,
  },
  {
    name: "Handpan Duo",
    price: "£1,050",
    priceGbp: 1050,
    summary:
      "Handpan and double bass together — a warmer, fuller sound that still holds the calm, unobtrusive feel of the solo.",
    includes: [
      "Handpan + upright double bass",
      "2 hours of live music",
      "Ideal for larger receptions and grand spaces",
      "Most chosen by couples",
    ],
    mostPopular: true,
  },
  {
    name: "Handpan Trio",
    price: "£1,450",
    priceGbp: 1450,
    summary:
      "Handpan, double bass, and clarinet — the most cinematic option, arranged like a bespoke ensemble.",
    includes: [
      "Handpan + double bass + clarinet",
      "2 hours of live music",
      "A standout musical moment for guests",
      "Coordinated arrangements across the set",
    ],
    mostPopular: false,
  },
  {
    name: "Ceremony, Elopements & Bespoke",
    price: "Price on enquiry",
    priceGbp: null,
    summary:
      "Add ceremony music to any package, or ask about elopements, retreats, private estates, and destination weddings.",
    includes: [
      "Ceremony music as an add-on",
      "Elopements & vow renewals",
      "Multi-day events and retreats",
      "Destination and overseas weddings",
    ],
    mostPopular: false,
  },
];

const note =
  "Additional playing time, ceremony music, and further travel are all available on request — quoted individually.";

export default defineTool({
  name: "list_packages",
  title: "List wedding music packages",
  description:
    "List the live handpan wedding packages and prices (solo, duo with double bass, trio with clarinet, and bespoke options).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ packages, note }, null, 2) }],
    structuredContent: { packages, note },
  }),
});
