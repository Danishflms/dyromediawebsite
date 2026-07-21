import { getSiteSettings } from "@/sanity/lib/fetch";
import { Container, Eyebrow } from "./section";
import { CtaLink } from "./cta-link";
import { Reveal } from "./reveal";

/** Recurring, understated call-to-action band placed near the foot of most pages. */
export async function CtaBand({ line }: { line?: string }) {
  const settings = await getSiteSettings();
  const resolvedLine = line || settings.ctaLine;

  return (
    <section className="border-t border-line">
      <Container className="flex flex-col items-center gap-10 py-24 text-center md:py-36">
        <Reveal className="flex flex-col items-center gap-6">
          <Eyebrow>{settings.ctaEyebrow}</Eyebrow>
          <h2 className="font-display text-metal text-metal-shimmer max-w-3xl text-4xl leading-[1.02] tracking-tight md:text-6xl">
            {resolvedLine}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <CtaLink href="/book">{settings.ctaButtonLabel}</CtaLink>
        </Reveal>
      </Container>
    </section>
  );
}
