// Minimal analytics helpers: Meta Pixel behind a consent gate.
// The pixel only loads after a visitor accepts cookies. Until a Pixel ID is
// set (VITE_META_PIXEL_ID), every call is a safe no-op.

const CONSENT_KEY = "cookie-consent";

export type ConsentChoice = "accepted" | "declined";

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(CONSENT_KEY) as ConsentChoice | null) ?? null;
}

export function setConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, choice);
  if (choice === "accepted") loadMetaPixel();
}

/** Load the Meta Pixel if consent was given and an ID is configured. */
export function loadMetaPixel() {
  if (typeof window === "undefined") return;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
  if (!pixelId) return;
  // Already loaded
  if ((window as any).fbq) return;

  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  (window as any).fbq("init", pixelId);
  (window as any).fbq("track", "PageView");
}

/** Fire the Meta Pixel Lead event (used after a successful enquiry). */
export function trackLead() {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead");
  }
}
