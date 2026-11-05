import { pages } from "@/content/data";

// The investment operating framework as an editorial table: each level is a
// row with its numeral and title on the left and its phases on the right as a
// hairline list (number, title, summary), so the nine phases read top to
// bottom as one method. Below, the maxim and the note line up with the phases.
// `expanded` adds each phase's detail and sub-phase count (used on the method
// page).

export function InvestmentFramework({
  expanded = false,
}: {
  expanded?: boolean;
}) {
  const { framework } = pages.sectors;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-5">
        <p className="text-[12px] font-medium tracking-[0.12em] text-muted uppercase">
          {framework.eyebrow}
        </p>
      </div>

      <ol className="border-b border-line">
        {framework.levels.map((level) => (
          <li
            key={level.number}
            className="grid gap-6 border-t border-line py-8 md:py-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12"
          >
            <div className="flex items-start gap-4 lg:gap-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-[13px] font-medium text-muted">
                {level.number}
              </span>
              <h3 className="pt-1.5 text-[22px] leading-[1.2] tracking-[-0.025em] md:text-[26px]">
                {level.title}
              </h3>
            </div>

            <ol
              className={`grid gap-x-10 ${level.phases.length > 1 ? "md:grid-cols-2" : ""}`}
            >
              {level.phases.map((phase) => (
                <li
                  key={phase.number}
                  className="group grid grid-cols-[36px_1fr] border-t border-line py-5 first:border-t-0 first:pt-1 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-1"
                >
                  <span className="pt-0.5 text-[13px] text-muted tabular-nums transition-colors duration-300 group-hover:text-ink">
                    {phase.number}
                  </span>
                  <div>
                    <h4 className="text-[18px] leading-[1.25] tracking-[-0.02em] md:text-[19px]">
                      {phase.title}
                    </h4>
                    <p className="mt-1.5 text-[15px] leading-[1.5] text-muted">
                      {phase.summary}
                    </p>
                    {expanded && (
                      <>
                        <p className="mt-4 text-[15px] leading-[1.6] text-muted">
                          {phase.detail}
                        </p>
                        <p className="mt-3 text-[12px] text-muted">
                          {phase.subphases} underfaser
                        </p>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
        <div className="lg:col-start-2">
          <p className="max-w-3xl text-[22px] leading-[1.35] tracking-[-0.02em] text-balance md:text-[28px]">
            {framework.maxim}
          </p>
          <p className="mt-6 max-w-2xl text-[13px] leading-[1.6] text-muted">
            {framework.note}
          </p>
        </div>
      </div>
    </div>
  );
}
