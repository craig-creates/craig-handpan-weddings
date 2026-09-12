import { useEffect, useState } from "react";
import { getConsent, setConsent, loadMetaPixel, type ConsentChoice } from "@/lib/analytics";

export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    const existing = getConsent();
    setChoice(existing);
    if (existing === "accepted") loadMetaPixel();
  }, []);

  if (choice !== null) return null;

  return (
    <>
    <div className="h-36 sm:h-24" aria-hidden="true" />
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur-md shadow-lg">
      <div className="container-prose py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl">
          This site uses cookies for analytics and ad measurement. You can
          accept or decline — the site works either way.
        </p>
        <div className="flex gap-3 flex-none">
          <button
            type="button"
            onClick={() => {
              setConsent("declined");
              setChoice("declined");
            }}
            className="btn-outline !py-2 !px-4 text-sm"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              setConsent("accepted");
              setChoice("accepted");
            }}
            className="btn-primary !py-2 !px-4 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
