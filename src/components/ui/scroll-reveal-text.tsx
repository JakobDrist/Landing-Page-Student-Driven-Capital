"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { Pill, frame } from "./pill";

// Pinned statement whose words light up one by one as the page scrolls. Set in
// the Stills idiom: black ground, cream label pill, Source Serif 500 at
// display size, words fading from 8% to full cream.
//
// Hand-off to the next section: the pin lasts three viewport heights. Words
// light up during the first half. During the second half the statement
// recedes (scales to 90%, drifts up) and dissolves word by word in reading
// order — each word blurs, fades to a faint trace and drifts off in its own
// direction — while the following section (see `HandoffCard`) rises over it
// from 100svh below.

/** Share of the pinned scroll used to light up the words. */
const REVEAL_END = 0.45;
/** Share of the pinned scroll after which the statement starts to recede. */
const RECEDE_START = 0.47;
/** Spread of the dissolve start across the words, as a share of the scroll. */
const DISSOLVE_SPREAD = 0.18;
/** How long each word takes to dissolve, as a share of the scroll. */
const DISSOLVE_LENGTH = 0.14;
/** What remains of a dissolved word: a faint, blurred trace. */
const DISSOLVED_OPACITY = 0.12;
/** Words not yet lit sit just above the black ground. */
const UNLIT_OPACITY = 0.08;
const DISSOLVED_BLUR = 10;

/** Deterministic pseudo-random number in [0, 1) so server and client agree. */
function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/** Scroll window in which item `index` of `count` dissolves. */
function dissolveWindow(index: number, count: number): [number, number] {
  const start = RECEDE_START + (index / count) * DISSOLVE_SPREAD;
  return [start, start + DISSOLVE_LENGTH];
}

function useDissolve(
  progress: MotionValue<number>,
  index: number,
  count: number,
) {
  const [start, end] = dissolveWindow(index, count);
  const filter = useTransform(
    progress,
    [start, end],
    ["blur(0px)", `blur(${DISSOLVED_BLUR}px)`],
  );
  const x = useTransform(
    progress,
    [start, end],
    [0, (seeded(index, 1) - 0.5) * 32],
  );
  const y = useTransform(
    progress,
    [start, end],
    [0, -(16 + seeded(index, 2) * 40)],
  );
  const rotate = useTransform(
    progress,
    [start, end],
    [0, (seeded(index, 3) - 0.5) * 8],
  );
  return { start, end, filter, x, y, rotate };
}

function RevealWord({
  word,
  progress,
  start,
  end,
  index,
  count,
  animate,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  index: number;
  count: number;
  animate: boolean;
}) {
  const dissolve = useDissolve(progress, index, count);
  // Lights up from 8% to full, holds, then dissolves to a faint trace.
  const opacity = useTransform(
    progress,
    [start, end, dissolve.start, dissolve.end],
    [UNLIT_OPACITY, 1, 1, DISSOLVED_OPACITY],
  );
  return (
    <motion.span
      className="inline-block motion-reduce:opacity-100!"
      style={
        animate
          ? {
              opacity,
              filter: dissolve.filter,
              x: dissolve.x,
              y: dissolve.y,
              rotate: dissolve.rotate,
            }
          : undefined
      }
    >
      {word}
    </motion.span>
  );
}

/** The label pill dissolves first, ahead of the words. */
function DissolvingLabel({
  label,
  progress,
  animate,
}: {
  label: string;
  progress: MotionValue<number>;
  animate: boolean;
}) {
  const dissolve = useDissolve(progress, 0, 1);
  const opacity = useTransform(
    progress,
    [dissolve.start, dissolve.end],
    [1, DISSOLVED_OPACITY],
  );
  return (
    <motion.div
      className="w-fit"
      style={
        animate
          ? { opacity, filter: dissolve.filter, y: dissolve.y }
          : undefined
      }
    >
      <Pill tone="dark">{label}</Pill>
    </motion.div>
  );
}

export function ScrollRevealText({
  id,
  label,
  text,
}: {
  id?: string;
  label: string;
  text: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [RECEDE_START, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [RECEDE_START, 1], [0, -48]);
  const animate = !reduceMotion;
  const words = text.split(/\s+/);

  return (
    <section id={id} className="bg-night text-paper">
      <div ref={ref} className="relative motion-safe:min-h-[300svh]">
        <div className="sticky top-0 flex min-h-svh items-center overflow-hidden py-28 motion-reduce:static motion-reduce:min-h-0 lg:py-[140px]">
          <motion.div
            className={`${frame} origin-center`}
            style={animate ? { scale, y } : undefined}
          >
            <DissolvingLabel
              label={label}
              progress={scrollYProgress}
              animate={animate}
            />
            <p className="sr-only">{text}</p>
            <p
              aria-hidden="true"
              className="mt-10 max-w-[1100px] font-serif text-[clamp(32px,4vw,56px)] leading-[1.14] font-medium tracking-[-0.02em] text-balance"
            >
              {words.map((word, index) => (
                <span key={index}>
                  <RevealWord
                    word={word}
                    progress={scrollYProgress}
                    start={(index / words.length) * REVEAL_END}
                    end={((index + 1) / words.length) * REVEAL_END}
                    index={index}
                    count={words.length}
                    animate={animate}
                  />
                  {index < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
