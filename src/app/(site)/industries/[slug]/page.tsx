import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { industries, findIndustry } from "@/data/industries";
import { getIndustryPortfolio } from "@/sanity/lib/fetch";
import { Container, Eyebrow, Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { EditingGallery } from "@/components/editing-gallery";
import { CtaBand } from "@/components/cta-band";

type Params = { params: Promise<{ slug: string }> };

/** Only the known industries exist; anything else 404s. */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = findIndustry(slug);

  return {
    metadataBase: new URL(site.url),
    title: industry ? `${industry.label} Work` : "Work",
    description: industry
      ? `Selected ${industry.label.toLowerCase()} work by Dyro Media.`
      : undefined,
    // Unlisted: reachable by URL, but kept out of search results and the
    // sitemap. Not the same as private — see the note in the README.
    robots: { index: false, follow: false },
  };
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = findIndustry(slug);
  if (!industry) notFound();

  const projects = await getIndustryPortfolio(slug);

  return (
    <>
      <section className="pt-28 md:pt-44">
        <Container className="pb-20 md:pb-28">
          <Reveal>
            <Eyebrow className="mb-8">Industry</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-fg">
              {industry.label}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Work we&apos;ve cut and shot for {industry.label.toLowerCase()} brands and
              creators.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section eyebrow="Portfolio" title={`${industry.label} work`}>
        {projects.length > 0 ? (
          <EditingGallery projects={projects} />
        ) : (
          <Reveal>
            <div className="glass-panel p-10 text-center md:p-14">
              <p className="text-base text-muted md:text-lg">
                Nothing here yet — {industry.label.toLowerCase()} work is on its way.
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-muted/60">
                Tag a portfolio item with this industry in the Studio to fill this page
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      <CtaBand line="Working in this space? Let's talk." />
    </>
  );
}
