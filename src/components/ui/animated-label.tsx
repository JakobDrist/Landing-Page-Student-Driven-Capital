import type { ReactNode } from "react";
export function AnimatedLabel({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat [background-position:0_100%] [background-size:0_1px] transition-[background-size] duration-450 ease-[cubic-bezier(.16,1,.3,1)] group-hover:[background-size:100%_1px]">
      {children}
    </span>
  );
}
