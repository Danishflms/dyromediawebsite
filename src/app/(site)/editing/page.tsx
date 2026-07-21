import type { Metadata } from "next";
import { site } from "@/data/site";
import { getEditingPageContent, getEditingPortfolio } from "@/sanity/lib/fetch";
import { Container, Eyebrow, Section } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { EditingGallery } from "@/components/editing-gallery";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Editing",
  description:
    "Post-production for creators and brands worldwide — short-form, long-form YouTube, ads, reels, color, and sound by Dyro Media.",
};

export default async function EditingPage() {
  const [content, projects] = await Promise.all([
    getEditingPageContent(),
    getEditingPortfolio(),
  ]);
  const { hero, process } = content;

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

      <Section eyebrow="Portfolio" title="Recent edits">
        <EditingGallery projects={projects} />
      </Section>

      <Section eyebrow="Process" title="How an edit moves">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <RevealItem key={step.step}>
              <div className="glass-panel sheen h-full p-8">
                <p className="text-metal font-display text-3xl tracking-tight">
                  {step.step}
                </p>
                <h3 className="mt-4 text-lg font-medium text-fg">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaBand line="Have footage waiting for a cut?" />
    </>
  );
}
