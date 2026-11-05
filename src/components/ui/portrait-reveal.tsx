"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Portrait entrance for the Founding Partners grid.
 *
 * - Curtain: the frame opens from the bottom up (clip-path, expo in-out)
 *   while the photo inside settles from 145% to 100% and comes into focus
 *   (blur and desaturation clear), like a lens finding its subject.
 *   Portraits open one after another (`index` × 0.22s).
 * - Depth: while the row scrolls past, each portrait drifts at its own speed
 *   (`drift` px over the pass), so the middle one moves a little faster.
 * - Hover: the photo eases in slightly.
 *
 * The hidden state only applies under `.reveal-armed` (set before first
 * paint by the reveal boot script), so portraits are visible without
 * JavaScript; reduced motion skips curtain, zoom and drift.
 */
export function PortraitReveal({
  children,
  index,
  drift,
  className = "",
  frameClassName = "",
  caption,
}: {
  children: ReactNode;
  /** Rendered under the frame; drifts with the portrait. */
  caption?: ReactNode;
  index: number;
  drift: number;
  className?: string;
  /** Size and background of the portrait frame. */
  frameClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Stacked on small screens, full drift would let portraits overlap.
  const [scale, setScale] = useState(1);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [drift * scale, -drift * scale],
  );

  useEffect(() => {
    const media = matchMedia("(min-width: 768px)");
    const update = () => setScale(media.matches ? 1 : 0.33);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setOpen(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      className={className}
    >
      <div
        className={`portrait-curtain relative overflow-hidden ${frameClassName}`}
        data-open={open || undefined}
        style={
          { "--portrait-delay": `${index * 0.22}s` } as React.CSSProperties
        }
      >
        <div className="portrait-media absolute inset-0">{children}</div>
      </div>
      {caption}
    </motion.div>
  );
}
