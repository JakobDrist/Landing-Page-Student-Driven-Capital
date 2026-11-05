"use client";

import type { FormDefinition, Media } from "@/content/types";
import { SpireReveal } from "@/components/ui/spire-reveal";
import { SignupBlock } from "./signup-block";

// Waiting-list block for the membership page: the shared sign-up block with
// the Børsen spire rising against a grainy sky beside the form.

/** Helpful placeholders; the form definition itself has none. */
const PLACEHOLDERS: Record<string, string> = {
  name: "Dit fulde navn",
  email: "dig@eksempel.dk",
  university: "F.eks. Aarhus Universitet",
  programme: "F.eks. Økonomi eller Datalogi",
  motivation: "Hvad interesserer dig, og hvad vil du gerne arbejde med?",
};

export function MembershipSignup({
  label,
  title,
  imageLabel,
  spire,
  definition,
}: {
  label: string;
  title: string;
  imageLabel: string;
  spire: Media;
  definition: FormDefinition;
}) {
  return (
    <SignupBlock
      kind="membership"
      label={label}
      title={title}
      definition={definition}
      formLabel="Tilmelding til ventelisten"
      note="Vi bruger kun oplysningerne til at kontakte dig om optaget."
      placeholders={PLACEHOLDERS}
      confirmation={{
        status: "Du er på ventelisten",
        text: "Vi har registreret din interesse og kontakter dig, når optaget åbner.",
      }}
      error="Vi kunne ikke gemme din tilmelding. Dine oplysninger står stadig her — prøv igen."
      aside={
        <div
          data-reveal
          style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
          className="relative isolate min-h-[460px] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#7f97ad_0%,#a9b9c6_38%,#d9dcd8_72%,#ece5d8_100%)]"
        >
          <div className="absolute inset-x-[8%] top-[14%] bottom-0">
            <SpireReveal
              src={spire.src}
              alt={spire.alt}
              sizes="(max-width: 1023px) 80vw, 340px"
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/images/texture/grain.svg')] bg-[length:180px_180px] opacity-40 mix-blend-overlay"
          />
          <p className="absolute top-5 right-5 rounded-full px-3.5 py-1.5 text-[13px] leading-none text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)]">
            {imageLabel}
          </p>
        </div>
      }
    />
  );
}
