import type { Metadata } from "next";
import { site } from "@/data/site";
import { getProductionPageContent, getProductionPortfolio } from "@/sanity/lib/fetch";
import { Container, Eyebrow, Section } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { WorkCard } from "@/components/work-card";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Production",
  description:
    "Full-service media production by Dyro Media — photography, videography, event coverage, brand shoots, PR, and commercial production.",
};

export default async function ProductionPage() {
  const [content, allProjects] = await Promise.all([
    getProductionPageContent(),
    getProductionPortfolio(),
  ]);
  const { hero, shootTypes, categoryOrder } = content;

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
          <RevealGroup className="mt-12 flex flex-wrap gap-3">
            {shootTypes.map((type) => (
              <RevealItem key={type}>
                <span className="glass-panel inline-flex px-4 py-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                  {type}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {categoryOrder.map((category) => {
        const projects = allProjects.filter((p) => p.category === category);
        if (projects.length === 0) return null;
        return (
          <Section key={category} eyebrow="Portfolio" title={category}>
            <RevealGroup className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {projects.map((project) => (
                <RevealItem key={project.id}>
                  <WorkCard project={project} icon="camera" />
                </RevealItem>
              ))}
            </RevealGroup>
          </Section>
        );
      })}

      <CtaBand line="Planning a shoot? Let's scope it." />
    </>
  );
}
