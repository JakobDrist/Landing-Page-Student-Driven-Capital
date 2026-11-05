"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

// Screenshot of the DSD Invest platform for the membership hero. It starts
// tilted back in perspective and flattens as the page scrolls. The window is
// fully opaque with a crisp edge and a soft drop shadow: no fade, no blur.
// Swap the image file to show a newer screenshot.

export function PlatformShot({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 15%"],
  });
  // The shot is already partly in view on load, so the tilt is mapped from
  // that starting point rather than from zero.
  const range = [0.25, 1];
  const rotateX = useTransform(scrollYProgress, range, [18, 0]);
  const scale = useTransform(scrollYProgress, range, [0.94, 1]);
  const y = useTransform(scrollYProgress, range, [40, 0]);

  return (
    <div ref={ref} className="[perspective:1400px]">
      <motion.div
        style={
          reduce
            ? undefined
            : { rotateX, scale, y, transformOrigin: "50% 100%" }
        }
        className="relative will-change-transform"
      >
        <div className="overflow-hidden rounded-[16px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_50px_120px_-30px_rgba(10,12,16,0.55)]">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            preload
            sizes="(max-width: 1184px) 100vw, 1136px"
            className="block h-auto w-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
