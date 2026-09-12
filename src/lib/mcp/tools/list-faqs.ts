import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const faqs = [
  {
    question: "What parts of the wedding can you play for?",
    answer:
      "Ceremony, guest arrival, aisle walk, signing, exit, drinks reception, wedding breakfast, elopements, and outdoor celebrations.",
  },
  {
    question: "Can you play specific songs?",
    answer:
      "Some melodies can be adapted, but the handpan works best as atmospheric, melodic live music rather than exact covers. If you have a specific song in mind, I can advise whether it will translate well.",
  },
  {
    question: "Do you need power?",
    answer:
      "Usually yes, however the handpan is fully acoustic. Smaller, intimate settings may not require power while larger spaces benefit from amplification.",
  },
  {
    question: "Can you play outdoors?",
    answer:
      "Yes, weather permitting. A covered or shaded area is needed in rain, strong sun, or difficult weather. The handpans are particularly sensitive to prolonged sunlight exposure.",
  },
  {
    question: "How much space do you need?",
    answer: "Very little. A chair or stool and a small performance area are usually enough.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes — public liability insurance is held, and documentation can be shared with your venue or planner on request.",
  },
  {
    question: "How far do you travel?",
    answer:
      "London, Surrey, Sussex, Kent, Essex, and surrounding areas. Further travel may be available by arrangement, including destination weddings.",
  },
  {
    question: "How do bookings work?",
    answer:
      "Enquiry, availability check, a short call to talk through your day, deposit, confirmation, and a final details exchange in the weeks before the wedding.",
  },
];

export default defineTool({
  name: "list_faqs",
  title: "List frequently asked questions",
  description:
    "List the published FAQ answers about booking live handpan wedding music. Optionally filter by a keyword.",
  inputSchema: {
    query: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Optional keyword to filter questions and answers, e.g. 'outdoor' or 'travel'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.toLowerCase();
    const results = q
      ? faqs.filter(
          (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q),
        )
      : faqs;
    return {
      content: [{ type: "text", text: JSON.stringify({ results }, null, 2) }],
      structuredContent: { results },
    };
  },
});
