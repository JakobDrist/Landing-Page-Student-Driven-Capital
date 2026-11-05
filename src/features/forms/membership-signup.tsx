"use client";

import type { FormDefinition, Media } from "@/content/types";
import { Pill, TextLink } from "@/components/ui/pill";
import { displayTitle } from "@/components/ui/section-heading";
import { ImprintField } from "@/components/ui/imprint-field";
import { SpireReveal } from "@/components/ui/spire-reveal";
import { useEnquirySubmission } from "./submission-form";

// Waiting-list block for the membership page: a heading row (label and large
// title), then a soft form card beside a card with
// the Børsen spire rising against a grainy sky. After sending, the form card
// gives way to a short thank-you that draws its own check mark.
//
// Field names and values come from `membership.form`, which `/api/enquiries`
// validates; nothing here changes what is sent.

type Field = FormDefinition["fields"][number];

/** Helpful placeholders; the form definition itself has none. */
const PLACEHOLDERS: Record<string, string> = {
  name: "Dit fulde navn",
  email: "dig@eksempel.dk",
  university: "F.eks. Aarhus Universitet",
  programme: "F.eks. Økonomi eller Datalogi",
  motivation: "Hvad interesserer dig, og hvad vil du gerne arbejde med?",
};

// Fields are soft grey wells; on focus the well simply turns white.
const control =
  "w-full rounded-[10px] [--field-fill:#e9ece7] border-0 bg-[#14120d0d] px-4 text-[14px] leading-[1.4] text-ink caret-ink outline-none transition-colors duration-300 placeholder:text-ink/40 hover:bg-[#14120d12] focus:bg-white";

function FieldControl({ field, order }: { field: Field; order: number }) {
  const id = `field-${field.name}`;
  const label = field.label.replace(" (valgfrit)", "");
  return (
    <div className={field.fullWidth ? "sm:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] leading-[1.4] text-ink/75"
      >
        {label}
        {!field.required && (
          <span className="ml-1 text-ink/40">· valgfrit</span>
        )}
      </label>
      {field.type === "select" ? (
        <ImprintField order={order}>
          <select
            id={id}
            name={field.name}
            required={field.required}
            defaultValue={field.options[0]?.value}
            className={`${control} h-11 cursor-pointer appearance-none pr-10`}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink/50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </ImprintField>
      ) : field.type === "textarea" ? (
        <ImprintField order={order}>
          <textarea
            id={id}
            name={field.name}
            required={field.required}
            placeholder={PLACEHOLDERS[field.name]}
            rows={4}
            className={`${control} block min-h-[104px] resize-y py-3`}
          />
        </ImprintField>
      ) : (
        <ImprintField order={order}>
          <input
            id={id}
            type={field.type}
            name={field.name}
            required={field.required}
            placeholder={PLACEHOLDERS[field.name]}
            autoComplete={
              field.name === "name"
                ? "name"
                : field.name === "email"
                  ? "email"
                  : field.name === "university"
                    ? "organization"
                    : "off"
            }
            className={`${control} h-11`}
          />
        </ImprintField>
      )}
    </div>
  );
}

function Confirmation({ name }: { name: string }) {
  const first = name.trim().split(/\s+/)[0];
  return (
    <div
      role="status"
      className="flex min-h-[420px] flex-col justify-center py-6"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 56 56"
        className="size-14 text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle
          cx="28"
          cy="28"
          r="26"
          pathLength={1}
          className="signup-draw"
          style={{ animationDelay: "0.1s" }}
        />
        <path
          d="m18 29 7 7 13-15"
          pathLength={1}
          className="signup-draw"
          style={{ animationDelay: "0.7s" }}
        />
      </svg>
      <p
        className="signup-rise mt-8 text-[14px] leading-[1.4] text-ink/50"
        style={{ animationDelay: "0.9s" }}
      >
        Du er på ventelisten
      </p>
      <p
        className="signup-rise mt-2 font-serif text-[40px] leading-[1.08] font-medium tracking-[-0.02em]"
        style={{ animationDelay: "1s" }}
      >
        {first ? `Tak, ${first}.` : "Tak."}
      </p>
      <p
        className="signup-rise mt-4 max-w-[420px] text-[16px] leading-[1.6] text-ink/60"
        style={{ animationDelay: "1.1s" }}
      >
        Vi har registreret din interesse og kontakter dig, når optaget åbner.
      </p>
      <div className="signup-rise mt-8" style={{ animationDelay: "1.2s" }}>
        <TextLink href="/">Tilbage til forsiden</TextLink>
      </div>
    </div>
  );
}

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
  const { state, values, submit } = useEnquirySubmission("membership");

  return (
    <div>
      {/* Heading row: label and large title. */}
      <div data-reveal>
        <Pill>{label}</Pill>
        <h2 className={`${displayTitle} mt-8`}>{title}</h2>
      </div>

      <div className="mt-12 grid gap-3 lg:mt-16 lg:grid-cols-[1fr_400px]">
        {/* Form card */}
        <div
          data-reveal
          className="rounded-[20px] bg-[#14120d08] p-5 sm:p-7 lg:p-8"
        >
          {state === "success" ? (
            <Confirmation name={values.name ?? ""} />
          ) : (
            <form
              onSubmit={submit}
              aria-label="Tilmelding til ventelisten"
              aria-busy={state === "pending"}
            >
              <fieldset
                disabled={state === "pending"}
                className="grid min-w-0 grid-cols-1 gap-x-3 gap-y-5 transition-opacity disabled:opacity-60 sm:grid-cols-2"
              >
                {definition.fields.map((field, index) => (
                  <FieldControl key={field.name} field={field} order={index} />
                ))}
              </fieldset>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <button
                  type="submit"
                  disabled={state === "pending"}
                  className="group flex cursor-pointer items-center gap-1 focus-visible:outline-none disabled:cursor-wait"
                >
                  <span className="inline-flex h-[43px] items-center rounded-full bg-ink px-6 text-[14px] leading-none font-medium text-paper [font-feature-settings:normal] transition-opacity duration-500 group-hover:opacity-85 group-focus-visible:outline-2 group-focus-visible:outline-offset-4">
                    {state === "pending" ? "Sender…" : definition.submit}
                  </span>
                  <span className="grid size-[43px] place-items-center rounded-full bg-ink text-paper transition-opacity duration-500 group-hover:opacity-85">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-4 transition-transform duration-1000 ease-spring group-hover:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 7h10v10M7 17 17 7" />
                    </svg>
                  </span>
                </button>
                <p className="max-w-[260px] text-[12px] leading-[1.5] text-ink/45">
                  Vi bruger kun oplysningerne til at kontakte dig om optaget.
                </p>
              </div>

              {state === "error" && (
                <p role="alert" className="mt-5 text-[14px] text-[#9b2c1f]">
                  Vi kunne ikke gemme din tilmelding. Dine oplysninger står
                  stadig her — prøv igen.
                </p>
              )}
            </form>
          )}
        </div>

        {/* Spire card: the Børsen spire rising against a grainy sky. */}
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
      </div>
    </div>
  );
}
