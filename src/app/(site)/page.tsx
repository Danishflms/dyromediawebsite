import Link from "next/link";
import type { Project } from "@/data/types";
import {
  getHomeContent,
  getHomeSelectedWork,
  getTestimonials,
  type HomeContent,
} from "@/sanity/lib/fetch";
import { Container, Section } from "@/components/section";
import { CtaLink } from "@/components/cta-link";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { HeroHeadline } from "@/components/hero-headline";
import { RollingWords } from "@/components/rolling-words";
import { WorkCard } from "@/components/work-card";
import { AutoplayVideo } from "@/components/autoplay-video";
import { CountUp } from "@/components/count-up";
import { IndustrySelect } from "@/components/industry-select";
import { ServicesShowcase } from "@/components/services-showcase";
import { LogoMarquee } from "@/components/logo-marquee";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { CtaBand } from "@/components/cta-band";

function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="sticky top-0 z-0 flex min-h-dvh items-center justify-center overflow-hidden text-center">
      {/* Optional muted showreel / image. Falls back to the placeholder frame. */}
      {(hero.backgroundVideoUrl || hero.backgroundImageUrl) && (
        <div aria-hidden="true" className="absolute inset-0">
          {hero.backgroundVideoUrl ? (
            <video
              src={hero.backgroundVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover opacity-20"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero.backgroundImageUrl}
              alt=""
              className="h-full w-full object-cover opacity-20"
            />
          )}
          <div className="absolute inset-0 bg-bg/75" />
        </div>
      )}

      {/* Soft chrome glow anchored behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.07), rgba(255,255,255,0) 60%)",
        }}
      />

      {/* Viewport framing marks — desktop only (declutter on phones). */}
      <span aria-hidden="true" className="pointer-events-none absolute left-6 top-24 hidden h-4 w-4 border-l border-t border-white/15 md:left-10 md:block" />
      <span aria-hidden="true" className="pointer-events-none absolute right-6 top-24 hidden h-4 w-4 border-r border-t border-white/15 md:right-10 md:block" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-24 left-6 hidden h-4 w-4 border-b border-l border-white/15 md:left-10 md:block" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-24 right-6 hidden h-4 w-4 border-b border-r border-white/15 md:right-10 md:block" />

      <Container className="relative z-10 flex flex-col items-center pb-20 pt-28 md:pb-28 md:pt-32 lg:pb-16 lg:pt-24">
        <Reveal>
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {hero.eyebrow}
          </span>
        </Reveal>

        <div className="mt-8 md:mt-14 lg:mt-10">
          <HeroHeadline lines={hero.headline} />
        </div>

        <div aria-hidden="true" className="hero-line mt-8 md:mt-10 lg:mt-7" />

        {/* Beneath the tagline. Three distinct compositions:
            phone  — everything stacked and centred;
            tablet — rolling words | info side by side, CTAs on their own row
                     (three columns can't hold a 60px phrase until ~1280px);
            wide   — rolling words | CTAs | info across three columns. */}
        <div className="mt-10 grid w-full items-center gap-8 sm:grid-cols-2 md:mt-16 lg:mt-10 lg:gap-12 xl:grid-cols-3">
          <Reveal delay={0.15} className="flex justify-center sm:justify-start">
            <RollingWords />
          </Reveal>
          <Reveal
            delay={0.2}
            className="flex w-full flex-col items-center gap-3 sm:order-last sm:col-span-2 sm:flex-row sm:justify-center lg:gap-4 xl:order-none xl:col-span-1 xl:flex-col"
          >
            <CtaLink href={hero.primaryCta.href} size="lg" block>
              {hero.primaryCta.label}
            </CtaLink>
            <CtaLink href={hero.secondaryCta.href} variant="secondary" size="lg" block>
              {hero.secondaryCta.label}
            </CtaLink>
          </Reveal>
          <Reveal delay={0.25} className="flex justify-center sm:justify-end">
            <p className="max-w-sm text-center text-base leading-relaxed text-muted sm:text-left md:text-lg lg:max-w-md lg:text-xl">
              {hero.subhead}
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Scroll cue — desktop only. */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted/60">
          Scroll
        </span>
        <span className="relative flex h-7 w-px justify-center bg-white/15">
          <span className="scroll-dot absolute top-0 h-2 w-px bg-white/80" />
        </span>
      </div>
    </section>
  );
}

function WhatWeDo({ whatWeDo }: { whatWeDo: HomeContent["whatWeDo"] }) {
  return (
    <Section eyebrow="What we do" title="Two ways to work with us">
      <RevealGroup className="grid gap-5 md:grid-cols-2">
        {whatWeDo.map((path) => (
          <RevealItem key={path.href}>
            <Link
              href={path.href}
              className="glass-panel sheen group flex h-full flex-col justify-between gap-10 p-8 lg:p-12"
            >
              <div>
                <h3 className="font-display text-metal-soft text-3xl tracking-tight md:text-4xl">
                  {path.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {path.description}
                </p>
              </div>
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-silver transition-colors group-hover:text-white">
                Explore {path.title}{" "}
                <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <Section
      eyebrow="Selected work"
      title="A cut of what we make"
      lead="A mix of edits and full productions. The full portfolios live on their own pages."
    >
      <RevealGroup className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <RevealItem key={project.id}>
            <WorkCard
              project={project}
              media={
                project.video ? (
                  <AutoplayVideo
                    video={project.video}
                    aspect={project.aspect}
                    title={project.title}
                  />
                ) : undefined
              }
            />
          </RevealItem>
        ))}
      </RevealGroup>
      <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <CtaLink href="/editing" variant="secondary">
          Editing portfolio
        </CtaLink>
        <CtaLink href="/production" variant="secondary">
          Production portfolio
        </CtaLink>
        {/* The only entry point to the per-industry pages. */}
        <IndustrySelect />
      </Reveal>
    </Section>
  );
}

function Stats({ stats }: { stats: HomeContent["stats"] }) {
  return (
    <section className="border-t border-line">
      <Container className="py-16 md:py-20">
        {/* Two-up until there's genuinely room for four — at 768px a 4-col
            split leaves 144px per stat and wraps the labels unevenly. */}
        <RevealGroup className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <p className="text-metal font-display text-4xl tracking-tight md:text-6xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.2em] uppercase text-muted">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function Clients({ clients }: { clients: HomeContent["clients"] }) {
  return (
    <section className="border-t border-line">
      <Container className="py-16 md:py-20">
        <Reveal>
          <p className="mb-8 text-center font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            Our Clients
          </p>
          <LogoMarquee clients={clients} />
        </Reveal>
      </Container>
    </section>
  );
}

function Testimonials({
  items,
}: {
  items: { quote: string; name: string; role: string; result?: string; photoUrl?: string }[];
}) {
  return (
    <Section eyebrow="Client words" title="Taken at their word">
      <Reveal>
        <TestimonialCarousel items={items} />
      </Reveal>
    </Section>
  );
}

export default async function Home() {
  const [content, selectedWork, testimonials] = await Promise.all([
    getHomeContent(),
    getHomeSelectedWork(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* The hero is pinned (sticky) while the first section scrolls up and
          over it. Wrapping just the hero + first section limits the sticky
          to that stretch, so the rest of the page scrolls normally. The
          opaque bg is what hides the pinned hero as it's covered. */}
      <div className="relative">
        <Hero hero={content.hero} />
        <div className="relative z-10 bg-bg">
          <WhatWeDo whatWeDo={content.whatWeDo} />
        </div>
      </div>
      <SelectedWork projects={selectedWork} />
      <ServicesShowcase />
      <Stats stats={content.stats} />
      <Clients clients={content.clients} />
      <Testimonials items={testimonials} />
      <CtaBand />
    </>
  );
}
