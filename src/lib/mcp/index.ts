import { defineMcp } from "@lovable.dev/mcp-js";
import listPackages from "./tools/list-packages";
import listFaqs from "./tools/list-faqs";
import getBookingInfo from "./tools/get-booking-info";

export default defineMcp({
  name: "soulful-wedding-sounds",
  title: "Soulful Wedding Sounds",
  version: "0.1.0",
  instructions:
    "Public information about live handpan music for UK weddings. Use `list_packages` for packages and prices, `list_faqs` for common questions, and `get_booking_info` for coverage areas, the booking process, and how to enquire. These tools are read-only and cannot make a booking.",
  tools: [listPackages, listFaqs, getBookingInfo],
});
