import Link from "next/link";
import type { ReactNode } from "react";

// Labels, buttons and links measured from the Stills reference:
// - interface text is Geist 14px at weight 500;
// - buttons and the menu toggle fade to 85% opacity on hover;
// - text links carry a north-east arrow that turns 45° to point east on hover;
// - hover transitions use a soft spring (~1s, slight overshoot).

const labelTones = {
  /** On light backgrounds. */
  light: "bg-[#1919231a] text-ink",
  /** On the black hero. */
  hero: "bg-chip text-paper",
  /** On black sections. */
  dark: "bg-paper text-ink",
};

export function Pill({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof labelTones;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex w-fit rounded-[10px] px-4 py-2 text-[14px] leading-[14px] font-medium [font-feature-settings:normal] ${labelTones[tone]} ${className}`}
    >
      {children}
    </p>
  );
}

const buttonTones = {
  /** Cream pill on dark backgrounds. */
  light: "bg-paper text-ink",
  /** Black pill on light backgrounds. */
  dark: "bg-ink text-paper",
  /** Transparent pill on light backgrounds. */
  ghost: "bg-transparent text-ink",
};

export function PillLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  tone?: keyof typeof buttonTones;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center justify-center rounded-full px-6 py-[14px] text-[14px] leading-[15.4px] font-medium [font-feature-settings:normal] transition-opacity duration-700 ease-spring hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 ${buttonTones[tone]}`}
    >
      {children}
    </Link>
  );
}

/**
 * The Stills arrow: a north-east arrow head (16px, 1.5px stroke) that turns
 * 45° to point east when its link is hovered.
 */
export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`block size-4 shrink-0 transition-transform duration-1000 ease-spring group-hover:rotate-45 ${className}`}
    >
      <path d="M7 7h10v10M7 17 17 7" />
    </svg>
  );
}

/** Plain text link with the Stills arrow. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex w-fit items-center gap-[5px] text-[14px] leading-[15.4px] font-medium [font-feature-settings:normal] ${className}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

/** Content width used by most Stills sections: 1136px at 1440px viewport. */
export const frame = "mx-auto w-full max-w-[1184px] px-6 md:px-10 lg:px-6";
/** Wider frame used by the approach section: 1200px at 1440px viewport. */
export const wideFrame = "mx-auto w-full max-w-[1248px] px-6 md:px-10 lg:px-6";
/** Vertical rhythm: 140px top and bottom on desktop. */
export const sectionSpace = "py-20 md:py-28 lg:py-[140px]";
