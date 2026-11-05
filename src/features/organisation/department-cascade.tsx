"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

// Departments as a cascade of dark cards, after the Services section of the
// Sanjaya Framer template: each card trails to the right and is faded while
// it is low in the viewport, then slides into line and brightens as it rises,
// so the stack reads as a diagonal that straightens out on scroll. Each card
// has the number, name and description on the left with the core skills as a
// small uppercase list, and a grainy photograph on the right.

interface Department {
  name: string;
  text: string;
  skills: string[];
  output: string;
}

export interface CardImage {
  src: string;
  position: string;
}

function Card({
  department,
  index,
  image,
  outputLabel,
}: {
  department: Department;
  index: number;
  image: CardImage;
  outputLabel: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 25%"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["26%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [0.3, 1]);

  return (
    <li ref={ref}>
      <motion.article
        style={reduce ? undefined : { x, opacity }}
        className="grid overflow-hidden rounded-[14px] bg-graphite text-paper will-change-transform sm:grid-cols-[1fr_42%]"
      >
        <div className="flex flex-col p-6 sm:p-7 lg:p-8">
          <p className="font-mono text-[12px] tracking-[0.04em] text-paper/45">
            / {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-serif text-[26px] leading-[1.15] font-medium tracking-[-0.012em] lg:text-[30px]">
            {department.name}
          </h3>
          <p className="mt-3 max-w-[340px] text-[14px] leading-[1.55] text-paper/60">
            {department.text}
          </p>

          <ul className="mt-8 font-mono text-[11.5px] tracking-[0.06em] text-paper/75 uppercase">
            {department.skills.map((skill) => (
              <li
                key={skill}
                className="border-b border-paper/10 py-2.5 first:border-t"
              >
                {skill}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] leading-[1.5] text-paper/45">
            <span className="text-paper/70">{outputLabel}:</span>{" "}
            {department.output}
          </p>
        </div>

        <div className="relative hidden min-h-[260px] overflow-hidden sm:block">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(max-width: 1023px) 40vw, 260px"
            className={`object-cover grayscale contrast-[1.15] ${image.position}`}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/images/texture/grain.svg')] bg-[length:140px_140px] opacity-60 mix-blend-overlay"
          />
        </div>
      </motion.article>
    </li>
  );
}

export function DepartmentCascade({
  departments,
  images,
  outputLabel,
}: {
  departments: Department[];
  images: CardImage[];
  outputLabel: string;
}) {
  return (
    <ol className="space-y-4">
      {departments.map((department, index) => (
        <Card
          key={department.name}
          department={department}
          index={index}
          image={images[index % images.length]}
          outputLabel={outputLabel}
        />
      ))}
    </ol>
  );
}
