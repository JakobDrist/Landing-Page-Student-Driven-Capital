"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";

export function FundRow({
  name,
  year,
  size,
  maximum,
}: {
  name: string;
  year: string;
  size: string;
  maximum: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const started = Boolean(reducedMotion || inView);
  const amount = Number(size.replace(/[^\d.]/g, ""));

  return (
    <div ref={ref} className="flex items-center gap-5">
      <div className="w-28 shrink-0">
        <p className="text-[17px] leading-[1.4]">{name}</p>
        <p className="text-[13px] leading-[1.35] text-muted">{year}</p>
      </div>
      <div className="flex flex-1 items-center" aria-hidden="true">
        <motion.div
          className="h-2 origin-left rounded-full bg-[#5d85ff]"
          style={{ width: `${(amount / maximum) * 100}%` }}
          initial={false}
          animate={{ scaleX: started ? 1 : 0 }}
          transition={{
            duration: reducedMotion ? 0 : 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
      <p className="w-17 text-right text-[15px]">
        <AnimatedNumber value={size} started={started} />
      </p>
    </div>
  );
}
