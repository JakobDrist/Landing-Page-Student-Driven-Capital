"use client";

import { motion, useReducedMotion } from "motion/react";

// Endless row of wordmarks drifting slowly (~20px/s) to the left with faded
// edges, after the logo ticker in the Stills "Track Record" section. The four
// type treatments mirror the variety of real marks: light with a glyph, bold
// capitals, serif with a full stop, and tight geometric bold. The drift and
// the edge fade are set on the elements themselves, so the ticker needs no
// global CSS.

export interface Wordmark {
  name: string;
  mark: string;
  style: string;
}

const styles: Record<string, string> = {
  thin: "text-[24px] font-light tracking-[-0.03em]",
  caps: "text-[19px] font-semibold tracking-[0.02em] uppercase",
  serif: "font-serif text-[27px] font-bold tracking-[-0.02em]",
  bold: "text-[24px] font-semibold tracking-[-0.04em]",
};

const tones = {
  /** Dark marks on light backgrounds. */
  light: "text-ink/60",
  /** Light marks on dark backgrounds. */
  dark: "text-paper/55",
};

/** Drift speed in px per second. */
const SPEED = 20;

/** Fades both edges of the row. */
const EDGE_FADE =
  "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%)";

function Glyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[19px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" />
    </svg>
  );
}

function Group({
  marks,
  tone,
  hidden,
}: {
  marks: Wordmark[];
  tone: keyof typeof tones;
  hidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-16 pr-16 md:gap-20 md:pr-20"
    >
      {marks.map((item) => (
        <li
          key={item.name}
          aria-label={hidden ? undefined : item.name}
          className={`flex h-7 items-center gap-1.5 leading-none whitespace-nowrap select-none ${tones[tone]} ${styles[item.style] ?? styles.bold}`}
        >
          {item.style === "thin" && <Glyph />}
          <span aria-hidden="true">{item.mark}</span>
        </li>
      ))}
    </ul>
  );
}

export function LogoTicker({
  marks,
  label,
  tone = "light",
}: {
  marks: Wordmark[];
  label: string;
  tone?: keyof typeof tones;
}) {
  const reduce = useReducedMotion();
  // One group is roughly 230px per mark including the gap.
  const duration = (marks.length * 230) / SPEED;
  return (
    <div
      role="group"
      aria-label={label}
      className="overflow-hidden py-1"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <motion.div
        className="flex w-max will-change-transform"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <Group marks={marks} tone={tone} />
        <Group marks={marks} tone={tone} hidden />
      </motion.div>
    </div>
  );
}
