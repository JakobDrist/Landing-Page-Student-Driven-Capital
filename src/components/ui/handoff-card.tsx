"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Wraps the section that follows a pinned `ScrollRevealText`. It is pulled up
 * by one viewport height so it rises over the still-pinned statement, and it
 * enters as a card — inset from the sides with rounded top corners — that
 * widens to full bleed as its top edge travels from the bottom of the viewport
 * to the top. The clip uses no transform, so sticky content inside keeps
 * working.
 */
export function HandoffCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% 0% ${inset}% round ${radius}px ${radius}px 0px 0px)`;

  return (
    <motion.div
      ref={ref}
      className="relative z-10 motion-safe:-mt-[100svh]"
      style={reduceMotion ? undefined : { clipPath }}
    >
      {children}
    </motion.div>
  );
}
