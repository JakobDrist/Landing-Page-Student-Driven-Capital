"use client";

import NumberFlow, { type Plugin } from "@number-flow/react";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const timing = { duration: 1400, easing: "cubic-bezier(0.22, 1, 0.36, 1)" };
const spinTiming = { ...timing, duration: 2000 };

// Give every digit a full extra turn, including digits that finish at zero.
const extraTurn: Plugin = {
  getDelta(value, previous, { length }) {
    return ((value - previous + length) % length) + length;
  },
};
const plugins = [extraTurn];

export function AnimatedNumber({
  value,
  started,
}: {
  value: string;
  started?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) return <span>{value}</span>;

  const [, prefix, number, suffix] = match;
  const visible = reducedMotion || (started ?? inView);

  return (
    <span ref={ref} className="inline-block tabular-nums" aria-label={value}>
      <NumberFlow
        aria-hidden="true"
        value={visible ? Number(number) : 0}
        prefix={prefix}
        suffix={suffix}
        locales="en-US"
        format={{
          useGrouping: false,
          minimumFractionDigits: number.split(".")[1]?.length ?? 0,
        }}
        transformTiming={timing}
        spinTiming={spinTiming}
        plugins={plugins}
        opacityTiming={{ duration: 250 }}
        trend={1}
      />
    </span>
  );
}
