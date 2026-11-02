"use client";
import { useState, type FormEvent, type ReactNode } from "react";
export function DemoForm({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSubmitted(true);
  };
  return (
    <form className={className} aria-label={label} onSubmit={submit}>
      {submitted ? (
        <p role="status" className="py-6 text-[18px] leading-[1.5]">
          Tak. Dette er en forhåndsvisning, så intet blev gemt eller sendt.
        </p>
      ) : (
        children
      )}
    </form>
  );
}
