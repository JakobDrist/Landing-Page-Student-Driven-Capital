"use client";

import type { ReactNode } from "react";
import type { FormDefinition } from "@/content/types";
import { Pill, TextLink } from "@/components/ui/pill";
import { displayTitle } from "@/components/ui/section-heading";
import { ImprintField } from "@/components/ui/imprint-field";
import { useEnquirySubmission } from "./submission-form";

// Sign-up block shared by the membership and partnership pages: a heading row
// (label and large title), then a soft form card beside an image card. After
// sending, the form card gives way to a short thank-you that draws its own
// check mark.
//
// Field names and values come from the page's form definition, which
// `/api/enquiries` validates; nothing here changes what is sent.

type Field = FormDefinition["fields"][number];

const AUTOCOMPLETE: Record<string, string> = {
  name: "name",
  email: "email",
  university: "organization",
  organisation: "organization",
};

// Fields are soft grey wells; on focus the well simply turns white.
const control =
  "w-full rounded-[10px] [--field-fill:#e9ece7] border-0 bg-[#14120d0d] px-4 text-[14px] leading-[1.4] text-ink caret-ink outline-none transition-colors duration-300 placeholder:text-ink/40 hover:bg-[#14120d12] focus:bg-white";

function FieldControl({
  field,
  order,
  placeholder,
}: {
  field: Field;
  order: number;
  placeholder?: string;
}) {
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
            placeholder={placeholder}
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
            placeholder={placeholder}
            autoComplete={AUTOCOMPLETE[field.name] ?? "off"}
            className={`${control} h-11`}
          />
        </ImprintField>
      )}
    </div>
  );
}

export interface SignupConfirmation {
  /** Small line above the thank-you, e.g. "Du er på ventelisten". */
  status: string;
  text: string;
}

function Confirmation({
  name,
  status,
  text,
}: SignupConfirmation & { name: string }) {
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
        {status}
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
        {text}
      </p>
      <div className="signup-rise mt-8" style={{ animationDelay: "1.2s" }}>
        <TextLink href="/">Tilbage til forsiden</TextLink>
      </div>
    </div>
  );
}

export function SignupBlock({
  kind,
  label,
  title,
  definition,
  aside,
  formLabel,
  note,
  placeholders = {},
  confirmation,
  error,
}: {
  kind: "membership" | "partnership";
  label: string;
  title: string;
  definition: FormDefinition;
  /** Card shown beside the form on large screens. */
  aside: ReactNode;
  formLabel: string;
  /** Small privacy line beside the submit button. */
  note: string;
  placeholders?: Record<string, string>;
  confirmation: SignupConfirmation;
  error: string;
}) {
  const { state, values, submit } = useEnquirySubmission(kind);

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
            <Confirmation name={values.name ?? ""} {...confirmation} />
          ) : (
            <form
              onSubmit={submit}
              aria-label={formLabel}
              aria-busy={state === "pending"}
            >
              <fieldset
                disabled={state === "pending"}
                className="grid min-w-0 grid-cols-1 gap-x-3 gap-y-5 transition-opacity disabled:opacity-60 sm:grid-cols-2"
              >
                {definition.fields.map((field, index) => (
                  <FieldControl
                    key={field.name}
                    field={field}
                    order={index}
                    placeholder={placeholders[field.name]}
                  />
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
                  {note}
                </p>
              </div>

              {state === "error" && (
                <p role="alert" className="mt-5 text-[14px] text-[#9b2c1f]">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>

        {aside}
      </div>
    </div>
  );
}
