import { pages } from "@/content/data";

export function InvestmentFramework({
  expanded = false,
}: {
  expanded?: boolean;
}) {
  const { framework } = pages.sectors;

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-5">
        <p className="text-[13px] font-medium tracking-[0.08em] text-muted uppercase">
          {framework.eyebrow}
        </p>
        <p className="text-[13px] text-muted">
          {framework.architecture}
        </p>
      </div>

      <div className="mt-10 space-y-4 md:mt-14">
        {framework.levels.map((level, levelIndex) => (
          <div key={level.number}>
            <div className="rounded-[14px] border border-line bg-canvas px-5 py-6 md:px-8 md:py-8">
              <div className="mb-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-line pb-5">
                <span className="text-[13px] font-medium tabular-nums text-muted">
                  {level.number}
                </span>
                <h3 className="text-[22px] leading-[1.2] tracking-[-0.025em] md:text-[28px]">
                  {level.title}
                </h3>
              </div>
              <ol
                className={`grid gap-3 ${level.phases.length === 1 ? "grid-cols-1" : level.phases.length === 4 ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2"}`}
              >
                {level.phases.map((phase) => (
                  <li
                    key={phase.number}
                    className="flex min-h-40 flex-col rounded-[10px] border border-line bg-white p-5 md:p-6"
                  >
                    <span className="text-[13px] tabular-nums text-muted">
                      {phase.number}
                    </span>
                    <h4 className="mt-3 text-[19px] leading-[1.2] tracking-[-0.025em] md:text-[21px]">
                      {phase.title}
                    </h4>
                    <p className="mt-3 text-[15px] leading-[1.5] text-muted">
                      {phase.summary}
                    </p>
                    {expanded && (
                      <>
                        <p className="mt-4 border-t border-line pt-4 text-[15px] leading-[1.6] text-muted">
                          {phase.detail}
                        </p>
                        <span className="mt-auto pt-4 text-[12px] text-muted">
                          {phase.subphases} underfaser
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            {levelIndex < framework.levels.length - 1 && (
              <div className="flex h-12 items-center justify-center" aria-hidden="true">
                <span className="h-7 w-px bg-control" />
                <span className="-ml-[5px] mt-7 h-2 w-2 rotate-45 border-r border-b border-control" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 border-t border-line pt-8 md:mt-16">
        <p className="text-[12px] tracking-[0.1em] text-muted uppercase">
          {framework.principlesLabel}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {framework.principles.map((principle) => (
            <li
              key={principle}
              className="rounded-full border border-line px-4 py-2 text-[13px] leading-[1.35]"
            >
              {principle}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-4xl border-l-2 border-ink pl-5 text-[20px] leading-[1.4] tracking-[-0.02em] md:text-[26px]">
          {framework.maxim}
        </p>
        <p className="mt-7 max-w-4xl text-[13px] leading-[1.6] text-muted">
          {framework.note}
        </p>
      </div>
    </div>
  );
}
