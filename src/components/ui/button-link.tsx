import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icon";

const variants = {
  /** Blue primary button. */
  primary: "bg-brand text-white hover:bg-brand-hover",
  light: "bg-[#ececea] text-ink hover:bg-white",
  outline:
    "bg-transparent text-ink shadow-[inset_0_0_0_1px_#bdbdb8] hover:shadow-[inset_0_0_0_1px_#121212]",
  ghost:
    "bg-transparent text-[#f3f3f1] shadow-[inset_0_0_0_1px_#f3f3f180] hover:shadow-[inset_0_0_0_1px_#f3f3f1]",
};
export function ButtonLink({
  href,
  children,
  variant = "outline",
  small = false,
  arrow,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  small?: boolean;
  arrow?: boolean;
}) {
  const showArrow = arrow ?? !small;
  const solid = variant === "primary" || variant === "light";
  return (
    <Link
      href={href}
      className={`group inline-flex shrink-0 items-center justify-center gap-3.5 rounded-[10px] font-normal tracking-[-0.01em] transition-[background-color,box-shadow] duration-250 ease-[cubic-bezier(.25,.1,.25,1)] focus-visible:outline-2 focus-visible:outline-offset-4 ${small ? "h-[38px] pr-1 pl-[15px] text-[13px]" : "h-[46px] pr-[5px] pl-[18px] text-[15px]"}  ${variants[variant]}`}
    >
      {children}
      {showArrow ? (
        <span
          className={`${small ? "size-[30px]" : "size-9"} grid place-items-center rounded-[7px] transition-[padding] duration-250 group-hover:pl-1 ${solid ? (variant === "primary" ? "bg-white text-brand" : "bg-brand text-white") : ""}`}
        >
          <Icon path="M5 12h14m-5-5 5 5-5 5" />
        </span>
      ) : (
        <span aria-hidden="true" className={small ? "w-[11px]" : "w-[13px]"} />
      )}
    </Link>
  );
}
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[15px] tracking-[-0.01em] ${className}`}
    >
      <span className="decoration-1 underline-offset-4 group-hover:underline">
        {children}
      </span>
      <Icon
        path="M5 12h14m-5-5 5 5-5 5"
        className="transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1"
      />
    </Link>
  );
}
