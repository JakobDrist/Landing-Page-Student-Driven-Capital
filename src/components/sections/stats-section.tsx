import { AnimatedNumber } from "@/components/ui/animated-number";
import type { Figure } from "@/content/types";
export function Figures({
  figures,
  dark = false,
}: {
  figures: Figure[];
  dark?: boolean;
}) {
  return (
    <dl className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-y-12 md:grid-cols-4">
      {figures.map((figure) => (
        <div key={figure.label} className="text-center">
          <dt className="text-[44px] leading-none tracking-[-0.03em] md:text-[54px] xl:text-[62px]">
            <AnimatedNumber value={figure.value} />
          </dt>
          <dd
            className={`mt-3 text-[13px] leading-[1.35] tracking-[-0.01em] ${dark ? "text-paper/60" : "text-muted"}`}
          >
            {figure.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
