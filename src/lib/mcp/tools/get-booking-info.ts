import { defineTool } from "@lovable.dev/mcp-js";

const info = {
  musician: "Craig Coppack — live handpan for weddings",
  focus:
    "Two-hour drinks reception sets, solo or with double bass and clarinet. Ceremony music, elopements, and bespoke bookings by enquiry.",
  areasCovered: ["London", "Surrey", "Sussex", "Kent", "Essex"],
  furtherTravel: "Further travel by arrangement, including destination weddings.",
  bookingProcess: [
    "Send an enquiry with your date and venue",
    "Availability check and a short call about your day",
    "Deposit and confirmation",
    "Final details exchanged in the weeks before the wedding",
  ],
  enquiryUrl: "https://handpanweddings.com/contact",
  email: "craig@handpanweddings.com",
  insurance: "Public liability insurance held; documentation available for venues and planners.",
};

export default defineTool({
  name: "get_booking_info",
  title: "Get booking and coverage info",
  description:
    "Get the areas covered, booking process, contact details, and how to send a wedding enquiry.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
    structuredContent: info,
  }),
});
