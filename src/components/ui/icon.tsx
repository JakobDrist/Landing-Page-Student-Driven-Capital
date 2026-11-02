export function Icon({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export const searchIcon =
  "m21 21-4.34-4.34M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z";
