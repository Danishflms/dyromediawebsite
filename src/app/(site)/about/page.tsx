import type { Metadata } from "next";
import { site } from "@/data/site";
import { getAboutPageContent } from "@/sanity/lib/fetch";
import { Container, Eyebrow, Section } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "About",
  description:
    "Dyro Media is a creative media agency built on years of hands-on craft — world-class post-production and full-scale production under one roof.",
};

export default async function AboutPage() {
  const { hero, whoWeAre, philosophy, capabilities } = await getAboutPageContent();

  return (
    <>
      <section className="pt-28 md:pt-44">
        <Container className="pb-20 md:pb-28">
          <Reveal>
            <Eyebrow className="mb-8">{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-fg">
              {hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {hero.subhead}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section eyebrow={whoWeAre.eyebrow} title={whoWeAre.title}>
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <RevealGroup className="flex max-w-2xl flex-col gap-6">
            {whoWeAre.paragraphs.map((paragraph) => (
              <RevealItem key={paragraph.slice(0, 24)}>
                <p className="text-base leading-relaxed text-fg/85 md:text-lg">
                  {paragraph}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            {/* TODO: swap for real behind-the-scenes imagery. */}
            <MediaPlaceholder aspect="1:1" icon="camera" label="Behind the scenes" />
          </Reveal>
        </div>
      </Section>

      <Section eyebrow={philosophy.eyebrow} title={philosophy.title}>
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {philosophy.items.map((item) => (
            <RevealItem key={item.title}>
              <div className="glass-panel sheen h-full p-8 md:p-10">
                <h3 className="font-display text-metal-soft text-2xl tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section eyebrow={capabilities.eyebrow} title={capabilities.title}>
        <RevealGroup className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {capabilities.items.map((item, i) => (
            <RevealItem key={item}>
              <div className="flex items-baseline gap-4 border-b border-line pb-5">
                <span className="text-metal font-mono text-xs tracking-[0.2em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-fg/90">{item}</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand />
    </>
  );
}
