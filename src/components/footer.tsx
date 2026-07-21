import Link from "next/link";
import { site } from "@/data/site";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { Container } from "./section";
import { Wordmark } from "./wordmark";

export async function Footer() {
  const settings = await getSiteSettings();

  const contactLinks = [
    { label: "Email us", href: `mailto:${settings.contactEmail}` },
    { label: "WhatsApp", href: settings.whatsappUrl, external: true },
  ];

  const socialLinks = [
    { label: "Instagram", href: settings.instagramUrl },
    { label: "LinkedIn", href: settings.linkedinUrl },
  ];

  return (
    <footer className="border-t border-line">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-3 gap-x-6 gap-y-10 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-12">
          <div className="col-span-3 md:col-span-1">
            <Link
              href="/"
              aria-label="Dyro Media — home"
              className="inline-block text-[22px] text-fg"
            >
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {settings.footerBlurb}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline inline-block text-sm text-fg/80 transition-colors hover:text-accent-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link
                  href="/book"
                  className="link-underline inline-block text-sm text-accent transition-colors hover:text-accent-bright"
                >
                  Book a Call
                </Link>
              </li>
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link-underline inline-block text-sm text-fg/80 transition-colors hover:text-accent-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
              Follow
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-block text-sm text-fg/80 transition-colors hover:text-accent-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-8 font-mono text-[11px] tracking-[0.2em] uppercase text-muted/60">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
