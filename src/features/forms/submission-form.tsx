"use client";
import { useRef, useState, type FormEvent, type ReactNode } from "react";

export type SubmissionState = "idle" | "pending" | "success" | "error";

/**
 * Sends a membership or partnership enquiry to `/api/enquiries`. The id is
 * kept across retries so a resubmission after an error is not stored twice.
 */
export function useEnquirySubmission(kind?: "membership" | "partnership") {
  const [state, setState] = useState<SubmissionState>("idle");
  const [values, setValues] = useState<Record<string, string>>({});
  const id = useRef<string | null>(null);
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const entries = Object.fromEntries(new FormData(event.currentTarget));
    const sent = Object.fromEntries(
      Object.entries(entries).map(([key, value]) => [key, String(value)]),
    );
    busy.current = true;
    setState("pending");
    id.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id: id.current, ...sent }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setValues(sent);
      setState("success");
    } catch {
      setState("error");
    } finally {
      busy.current = false;
    }
  }
  return { state, values, submit };
}

export function SubmissionForm({
  children,
  className,
  label,
  kind,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  kind?: "membership" | "partnership";
}) {
  const { state, submit } = useEnquirySubmission(kind);
  return (
    <form
      onSubmit={submit}
      aria-label={label}
      aria-busy={state === "pending"}
      className={className}
    >
      {state === "success" ? (
        <div role="status" className="animate-menu-rise py-4">
          <div className="mb-10 grid size-16 place-items-center rounded-full bg-ink text-paper">
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="size-8"
              fill="none"
            >
              <path
                d="m12 24 8 8 16-17"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="submission-check"
              />
            </svg>
          </div>
          <p className="mb-4 text-[14px] leading-[1.4] text-ink/50">
            DSD Invest · Modtaget
          </p>
          <h3 className="font-serif text-[32px] leading-[1.1] font-medium tracking-[-0.015em] lg:text-[40px]">
            {kind === "membership"
              ? "Din interesse er registreret."
              : "Tak for jeres henvendelse."}
          </h3>
          <p className="mt-5 max-w-md text-[16px] leading-[1.6] text-ink/60 lg:text-[18px]">
            {kind === "membership"
              ? "Tak, fordi du vil være en del af DSD Invest. Vi har modtaget dine oplysninger og kontakter dig om næste skridt i optaget."
              : "Vi har modtaget jeres besked og vender tilbage på den e-mailadresse, I har oplyst. Vi glæder os til samtalen."}
          </p>
        </div>
      ) : (
        <>
          <fieldset
            disabled={state === "pending"}
            className="flex min-w-0 flex-col gap-6 disabled:opacity-60"
          >
            {children}
          </fieldset>
          <p className="text-[13px] leading-[1.5] text-ink/45">
            Vi gemmer oplysningerne for at behandle din henvendelse og kontakte
            dig om den.
          </p>
          {state === "pending" && (
            <p role="status" className="text-[14px] text-ink/60">
              Gemmer din henvendelse…
            </p>
          )}
          {state === "error" && (
            <p role="alert" className="text-[14px] text-[#9b2c1f]">
              Vi kunne ikke gemme din henvendelse. Dine oplysninger står stadig
              her — prøv igen.
            </p>
          )}
        </>
      )}
    </form>
  );
}
