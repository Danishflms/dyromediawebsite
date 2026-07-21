import type { Metadata } from "next";
import { site } from "@/data/site";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { Container, Eyebrow } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { CalendlyEmbed } from "@/components/calendly-embed";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Book a Call",
  description:
    "Book an intro call with Dyro Media. Tell us about your project — we'll come back with a plan and a number.",
};

export default async function BookPage() {
  const settings = await getSiteSettings();

  return (
    <section className="pt-28 md:pt-44">
      <Container className="pb-24 md:pb-32">
        <Reveal>
          <Eyebrow className="mb-8">Book a Call</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-fg">
            Fifteen minutes. No pitch deck.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Pick a slot that works and tell us what you&apos;re making. We&apos;ll
            come back with a plan and a number.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-14">
          <CalendlyEmbed calendlyUrl={settings.calendlyUrl} />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <p className="text-sm text-muted">
            Prefer email or chat?{" "}
            <a
              href={`mailto:${settings.contactEmail}`}
              className="text-accent transition-colors hover:text-accent-bright"
            >
              {settings.contactEmail}
            </a>{" "}
            or{" "}
            <a
              href={settings.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent transition-colors hover:text-accent-bright"
            >
              WhatsApp
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
