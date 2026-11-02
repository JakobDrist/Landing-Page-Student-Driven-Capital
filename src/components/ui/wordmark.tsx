/** Text wordmark that inherits the surrounding text colour. */
export function Wordmark({ brand }: { brand: string }) {
  return (
    <span className="block text-[21px] leading-5 font-medium tracking-[-0.035em] whitespace-nowrap">
      {brand}
    </span>
  );
}
