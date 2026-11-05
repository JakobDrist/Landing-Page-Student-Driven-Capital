"use client";

/* eslint-disable @next/next/no-img-element -- tiny static icons; next/image
   adds nothing here and would wrap each icon in extra markup. */

import { motion, useReducedMotion } from "motion/react";
import { universityFonts } from "@/lib/university-fonts";

// Endless row of Danish universities drifting slowly (~20px/s) to the left
// with faded edges. Each entry shows the university's own favicon beside its
// name, set in the university's typeface or the closest open alternative (see
// university-fonts.ts); a university whose favicon is too small to show
// sharply uses its official wordmark instead. The drift and the edge fade are
// set on the elements themselves, so the ticker needs no global CSS.

export interface University {
  name: string;
  /** Square favicon shown before the name. */
  icon?: string;
  /** Key into universityFonts. */
  font?: string;
  /** Official wordmark shown instead of icon and name. */
  wordmark?: string;
  /** Width-to-height ratio of the wordmark. */
  ratio?: number;
}

/** Drift speed in px per second. */
const SPEED = 20;

/** Fades both edges of the row. */
const EDGE_FADE =
  "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%)";

function Item({ university }: { university: University }) {
  if (university.wordmark) {
    const height = 18;
    return (
      <img
        src={university.wordmark}
        alt=""
        width={Math.round(height * (university.ratio ?? 1))}
        height={height}
        className="block"
      />
    );
  }
  return (
    <span className="flex items-center gap-2.5">
      {university.icon && (
        <img
          src={university.icon}
          alt=""
          width={26}
          height={26}
          className="block size-[26px] shrink-0 object-contain"
        />
      )}
      <span
        className={`text-[19px] leading-none tracking-[-0.01em] whitespace-nowrap text-ink/80 ${universityFonts[university.font ?? ""] ?? ""}`}
      >
        {university.name}
      </span>
    </span>
  );
}

function Group({
  universities,
  hidden,
}: {
  universities: University[];
  hidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 md:gap-16 md:pr-16"
    >
      {universities.map((university) => (
        <li
          key={university.name}
          aria-label={hidden ? undefined : university.name}
          className="flex h-8 items-center select-none"
        >
          <Item university={university} />
        </li>
      ))}
    </ul>
  );
}

export function LogoTicker({
  universities,
  label,
}: {
  universities: University[];
  label: string;
}) {
  const reduce = useReducedMotion();
  // One group is roughly 300px per entry including the gap.
  const duration = (universities.length * 300) / SPEED;
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
        <Group universities={universities} />
        <Group universities={universities} hidden />
      </motion.div>
    </div>
  );
}
