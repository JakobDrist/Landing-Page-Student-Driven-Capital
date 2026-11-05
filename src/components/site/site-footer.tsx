import Link from "next/link";
import { site } from "@/content/data";
import { Container } from "@/components/ui/container";
import { DemoForm } from "@/features/forms/demo-form";
import { Icon } from "@/components/ui/icon";
export function SiteFooter() {
  return (
    <footer className="bg-navy text-[#f3f3f1]">
      <Container>
        <div className="flex flex-col gap-10 pt-20 pb-16 md:pt-25 lg:flex-row xl:pt-28">
          <div className="lg:flex-[1] lg:pr-12">
            <h2 className="text-[20px] leading-[1.35] tracking-[-0.02em]">
              {site.newsletter.title}
            </h2>
            <p className="mt-2 max-w-[360px] text-[15px] leading-6 tracking-[-0.01em] text-navy-muted">
              {site.newsletter.description}
            </p>
            <DemoForm
              className="mt-6 flex max-w-[360px] items-center border-b border-navy-line"
              label="Nyhedsbrev"
            >
              <input
                type="email"
                name="email"
                required
                aria-label="E-mailadresse"
                placeholder={site.newsletter.placeholder}
                className="h-11 min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-none placeholder:text-navy-muted"
              />
              <button
                type="submit"
                className="group flex h-11 cursor-pointer items-center gap-3 text-[13px]"
              >
                Tilmeld
                <Icon
                  path="M5 12h14m-5-5 5 5-5 5"
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </button>
            </DemoForm>
          </div>
          <nav
            aria-label="Footernavigation"
            className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:flex-[1.4]"
          >
            {site.footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-[13px] leading-[1.35] text-navy-muted">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] leading-6 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between gap-6 border-t border-navy-line pt-8 pb-10">
          <ul className="flex flex-wrap gap-5 text-[13px] text-navy-muted">
            {site.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-5">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-[15px] text-navy-muted hover:text-white"
              >
                <Icon
                  path={
                    social.label === "LinkedIn"
                      ? "M4 9v11M4 4v.01M9 20V9m0 5a5 5 0 0 1 10 0v6"
                      : "M4 4h4l12 16h-4L4 4Zm16 0L4 20"
                  }
                />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
