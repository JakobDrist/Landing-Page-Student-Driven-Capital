"use client";

import { useRef, type ReactNode, type SyntheticEvent } from "react";

// Wraps a form control so that filling it plays the "imprint": the field is
// pressed in like a stamp, the text settles into place and a sheen passes
// over it (styles in globals.css under `.imprint`). It plays when the browser
// autofills the field, and when someone leaves a field they changed with a
// value in it. Autofilled fields cascade by `order`, so a whole form filled at
// once is stamped one field after the other.

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export function ImprintField({
  children,
  order = 0,
}: {
  children: ReactNode;
  /** Position in the form, used to stagger autofilled fields. */
  order?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef("");

  function play(delay: number) {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--imprint-delay", `${delay}s`);
    // Restart the animation if it already ran.
    element.removeAttribute("data-imprint");
    void element.offsetWidth;
    element.setAttribute("data-imprint", "");
  }

  function onAnimationStart(event: SyntheticEvent<HTMLSpanElement>) {
    const native = event.nativeEvent as AnimationEvent;
    if (native.animationName !== "autofill-detect") return;
    last.current = (event.target as FieldElement).value.trim();
    play(order * 0.07);
  }

  function onBlur(event: SyntheticEvent<HTMLSpanElement>) {
    const value = (event.target as FieldElement).value.trim();
    if (!value || value === last.current) return;
    last.current = value;
    play(0);
  }

  return (
    <span
      ref={ref}
      className="imprint"
      onAnimationStart={onAnimationStart}
      onBlur={onBlur}
    >
      {children}
    </span>
  );
}
