export function Grain({ className = "opacity-50" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 bg-[url('/images/texture/grain.svg')] bg-[length:200px_200px] mix-blend-overlay ${className}`}
    />
  );
}
