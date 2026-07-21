import type { Metadata } from "next";
import { site } from "@/data/site";
import { getServicesPageContent, getServices, getTestimonials } from "@/sanity/lib/fetch";
import { Container, Eyebrow, Section } from "@/components/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Services",
  description:
    "Dyro Media services — video editing, post-production, videography, photography, event coverage, brand and PR shoots, and commercial production.",
};

export default async function ServicesPage() {
  const [content, services, testimonials] = await Promise.all([
    getServicesPageContent(),
    getServices(),
    getTestimonials(),
  ]);
  const { hero } = content;

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

      <Section eyebrow="Offerings" title="What we deliver">
        <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.title}>
              <div className="glass-panel sheen flex h-full flex-col p-8">
                <h3 className="font-display text-metal-soft text-2xl tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-baseline gap-3 text-sm text-fg/80">
                      <span aria-hidden="true" className="h-px w-3 shrink-0 translate-y-[-3px] bg-silver" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {service.startingFrom && (
                  <p className="mt-auto pt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                    {service.startingFrom}
                  </p>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        eyebrow="Testimonials"
        title="What clients say"
        lead="Real words from the people who hire us again."
      >
        <Reveal>
          <TestimonialCarousel items={testimonials} />
        </Reveal>
      </Section>

      <CtaBand line="Tell us what you're making." />
    </>
  );
}
