"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export interface Department {
  name: string;
  text: string;
  skills: string[];
  output: string;
  examples?: string;
  growth?: string;
}

/** Departments as quiet typographic rows; one opens at a time to reveal its role. */
export function DepartmentList({
  departments,
  extended = false,
}: {
  departments: Department[];
  extended?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const reducedMotion = useReducedMotion();
  const id = useId();
  return (
    <ol className="group/list border-b border-line">
      {departments.map((department, index) => {
        const expanded = open === index;
        return (
          <motion.li
            key={department.name}
            className="relative"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: index * 0.07, ease }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px origin-left bg-line"
              initial={reducedMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.07, ease }}
            />
            <div className="transition-opacity duration-500 group-hover/list:opacity-45 hover:opacity-100">
              <h3>
                <button
                  type="button"
                  id={`${id}-button-${index}`}
                  aria-expanded={expanded}
                  aria-controls={`${id}-panel-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                  className="flex w-full cursor-pointer items-baseline gap-5 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 md:gap-8 md:py-8"
                >
                  <span className="w-6 shrink-0 text-[13px] text-muted tabular-nums">
                    0{index + 1}
                  </span>
                  <span className="flex-1 text-[26px] leading-[1.15] tracking-[-0.025em] md:text-[34px]">
                    {department.name}
                  </span>
                  <span className="hidden text-[13px] text-muted lg:block">
                    {department.skills.join(" · ")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative ml-2 size-3 shrink-0 self-center"
                  >
                    <span className="absolute top-1/2 left-0 h-px w-3 bg-current" />
                    <span
                      className={`absolute top-0 left-1/2 h-3 w-px bg-current transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${expanded ? "scale-y-0" : ""}`}
                    />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="panel"
                    id={`${id}-panel-${index}`}
                    role="region"
                    aria-labelledby={`${id}-button-${index}`}
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 pb-9 pl-11 md:grid-cols-[1.4fr_1fr] md:gap-12 md:pl-14">
                      <p className="max-w-xl text-[17px] leading-[1.6] text-muted">
                        {department.text}
                      </p>
                      <dl className="text-[15px] leading-[1.6]">
                        <dt className="text-[13px] text-muted">Du leverer</dt>
                        <dd className="mt-1">{department.output}</dd>
                        {extended && department.examples && (
                          <>
                            <dt className="mt-4 text-[13px] text-muted">
                              Eksempler på opgaver
                            </dt>
                            <dd className="mt-1">{department.examples}</dd>
                          </>
                        )}
                        {extended && department.growth && (
                          <>
                            <dt className="mt-4 text-[13px] text-muted">
                              Du udvikler
                            </dt>
                            <dd className="mt-1">{department.growth}</dd>
                          </>
                        )}
                        <dt className="mt-4 text-[13px] text-muted lg:hidden">
                          Kompetencer
                        </dt>
                        <dd className="mt-1 lg:hidden">
                          {department.skills.join(" · ")}
                        </dd>
                      </dl>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
