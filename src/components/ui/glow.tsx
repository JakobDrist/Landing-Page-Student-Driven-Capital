/** The original warm-to-cool light treatment, expressed with Tailwind utilities. */
export function Glow({
  band = false,
  subdued = false,
}: {
  band?: boolean;
  subdued?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div
        className={`absolute -right-[10%] -left-[10%] bg-[radial-gradient(40%_60%_at_22%_70%,#ff8c468c,transparent_70%),radial-gradient(38%_60%_at_50%_80%,#aa5aff80,transparent_70%),radial-gradient(40%_60%_at_80%_70%,#4678ff8c,transparent_70%)] blur-[40px] ${band ? "-top-[40%] -bottom-[40%] opacity-90" : `-bottom-[35%] h-[85%] ${subdued ? "opacity-55" : "opacity-60"}`}`}
      />
    </div>
  );
}
