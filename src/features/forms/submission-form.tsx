"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";

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
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle",
  );
  const id = useRef<string | null>(null);
  const busy = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    busy.current = true;
    setState("pending");
    id.current ??= crypto.randomUUID();
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id: id.current, ...values }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
    } catch {
      setState("error");
    } finally {
      busy.current = false;
    }
  }
  return (
    <form
      onSubmit={submit}
      aria-label={label}
      aria-busy={state === "pending"}
      className={className}
    >
      {state === "success" ? (
        <div
          role="status"
          className="animate-menu-rise rounded-2xl border border-line bg-canvas px-7 py-12 sm:p-12"
        >
          <div className="mb-8 grid size-20 place-items-center rounded-full bg-brand text-white">
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="size-10"
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
          <p className="mb-3 text-sm text-muted">DSD Invest · Modtaget</p>
          <h3 className="text-3xl tracking-tight">
            {kind === "membership"
              ? "Din interesse er registreret."
              : "Tak for jeres henvendelse."}
          </h3>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
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
          <p className="text-sm leading-6 text-muted">
            Vi gemmer oplysningerne for at behandle din henvendelse og kontakte
            dig om den. Læs mere i vores{" "}
            <Link
              href="/legal/privacy"
              className="underline underline-offset-4 hover:text-ink"
            >
              privatlivspolitik
            </Link>
            .
          </p>
          {state === "pending" && (
            <p role="status" className="text-muted">
              Gemmer din henvendelse…
            </p>
          )}
          {state === "error" && (
            <p role="alert">
              Vi kunne ikke gemme din henvendelse. Dine oplysninger står stadig
              her — prøv igen.
            </p>
          )}
        </>
      )}
    </form>
  );
}
