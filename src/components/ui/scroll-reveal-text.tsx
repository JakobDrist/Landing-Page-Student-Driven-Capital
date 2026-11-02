"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { Container } from "./container";

function RevealWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <motion.span className="motion-reduce:opacity-100!" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export function ScrollRevealText({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const words = text.split(/\s+/);

  return (
    <div ref={ref} className="relative min-h-[180svh] motion-reduce:min-h-0">
      <div className="sticky top-0 flex min-h-svh items-center py-24 motion-reduce:static motion-reduce:min-h-0 md:py-28">
        <Container>
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-[13px] leading-5 tracking-[0.14em] text-paper/60 uppercase md:mb-14">
              {title}
            </h2>
            <p className="sr-only">{text}</p>
            <p
              aria-hidden="true"
              className="text-[clamp(1.75rem,3.85vw,3.6rem)] leading-[1.16] tracking-[-0.035em] text-paper"
            >
              {words.map((word, index) => (
                <span key={index}>
                  <RevealWord
                    word={word}
                    progress={scrollYProgress}
                    start={(index / words.length) * 0.9}
                    end={((index + 1) / words.length) * 0.9}
                  />
                  {index < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
