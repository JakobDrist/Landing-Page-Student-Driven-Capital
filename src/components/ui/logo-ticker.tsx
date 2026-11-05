// Endless row of wordmarks, after the logo ticker in the Stills "Track Record"
// section: marks ~18–22px tall in 70% black, 80px apart, edges faded with a
// mask, drifting slowly (~20px/s) to the left. The four type treatments mirror
// the variety of the reference marks: light with a glyph, bold capitals, bold
// serif with a full stop, and tight geometric bold.

export interface Wordmark {
  name: string;
  mark: string;
  style: string;
}

const styles: Record<string, string> = {
  thin: "text-[29px] font-light tracking-[-0.03em]",
  caps: "text-[23px] font-bold tracking-[0.02em] uppercase",
  serif: "font-serif text-[32px] font-bold tracking-[-0.02em]",
  bold: "text-[28px] font-semibold tracking-[-0.04em]",
};

const SPEED = 20; // px per second

function Glyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[22px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" />
    </svg>
  );
}

function Group({ marks, hidden }: { marks: Wordmark[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-20 pr-20"
    >
      {marks.map((item) => (
        <li
          key={item.name}
          aria-label={hidden ? undefined : item.name}
          className={`flex h-[22px] items-center gap-1.5 leading-none whitespace-nowrap text-ink/70 select-none ${styles[item.style] ?? styles.bold}`}
        >
          {item.style === "thin" && <Glyph />}
          <span aria-hidden="true">{item.mark}</span>
        </li>
      ))}
    </ul>
  );
}

export function LogoTicker({
  marks,
  label,
}: {
  marks: Wordmark[];
  label: string;
}) {
  // One group is roughly 250px per mark including the gap.
  const duration = Math.round((marks.length * 250) / SPEED);
  return (
    <div
      className="ticker-mask overflow-hidden py-1"
      aria-label={label}
      role="group"
    >
      <div
        className="ticker-track flex w-max"
        style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
      >
        <Group marks={marks} />
        <Group marks={marks} hidden />
      </div>
    </div>
  );
}
