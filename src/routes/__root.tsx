import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 heading-display text-4xl">This page can't be found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for has moved or doesn't exist.
        </p>
        <Link to="/" className="btn-primary mt-8">Return home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="heading-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">
          Please try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Handpan Wedding Musician in Kent | Live Ceremony & Reception Music" },
      {
        name: "description",
        content:
          "Live handpan music for weddings, ceremonies, drinks receptions, elopements, and intimate celebrations across Kent, London, Sussex, Surrey, and beyond.",
      },
      { name: "author", content: "Craig Handpan" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Craig Handpan — Wedding Musician" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Handpan Wedding Musician in Kent | Live Ceremony & Reception Music" },
      { name: "twitter:title", content: "Handpan Wedding Musician in Kent | Live Ceremony & Reception Music" },
      { name: "description", content: "Soulful Wedding Sounds offers live handpan music for elegant and intimate wedding celebrations." },
      { property: "og:description", content: "Soulful Wedding Sounds offers live handpan music for elegant and intimate wedding celebrations." },
      { name: "twitter:description", content: "Soulful Wedding Sounds offers live handpan music for elegant and intimate wedding celebrations." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca7bcbe5-76b1-4baa-ba31-b2f3979d314c/id-preview-5f823ebf--a08e8228-5d14-439d-b3de-53d80cb0c677.lovable.app-1782682491885.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca7bcbe5-76b1-4baa-ba31-b2f3979d314c/id-preview-5f823ebf--a08e8228-5d14-439d-b3de-53d80cb0c677.lovable.app-1782682491885.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
