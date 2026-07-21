import type { Metadata, Viewport } from "next";
import { Fraunces, Onest } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { site } from "@/data/site";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { MotionProvider } from "@/components/motion-provider";
import { SiteParticles } from "@/components/site-particles";
import { BackgroundFX } from "@/components/background-fx";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

// Onest — a clean, native-feeling grotesk. Distinctive without the
// ubiquity of Inter; carries the body copy and mono-free UI text.
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${settings.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: settings.description,
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: "en_US",
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${GeistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-bg text-fg">
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteParticles />
          <BackgroundFX />
          <Nav />
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
