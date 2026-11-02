import Link from "next/link";
import type { InlineRun, RichTextBlock } from "@/content/types";
export function InlineText({ runs }: { runs: InlineRun[] }) {
  return runs.map((run, index) => {
    let text: React.ReactNode = run.text;
    if (run.bold)
      text = <strong className="font-semibold text-ink">{text}</strong>;
    if (run.italic) text = <em>{text}</em>;
    return run.href ? (
      <Link
        key={index}
        href={run.href}
        className="underline decoration-ink/35 underline-offset-[0.15em] transition-colors hover:decoration-blue-600"
      >
        {text}
      </Link>
    ) : (
      <span key={index}>{text}</span>
    );
  });
}
export function RichText({
  blocks,
  className = "",
}: {
  blocks: RichTextBlock[];
  className?: string;
}) {
  return (
    <div
      className={`space-y-[1.35em] text-[18px] leading-[1.7] tracking-[-0.01em] text-muted ${className}`}
    >
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "heading":
            return (
              <h2
                key={index}
                className="mt-[2em] text-[clamp(24px,2.5vw,34px)] leading-[1.2] tracking-[-0.025em] text-ink"
              >
                <InlineText runs={block.runs} />
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-12 text-[clamp(25.6px,calc(21.6px+1vw),34.4px)] leading-[1.25] tracking-[-0.02em] text-ink before:content-['“'] after:content-['”']"
              >
                <InlineText runs={block.runs} />
              </blockquote>
            );
          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={index}
                className={`space-y-2 pl-6 ${block.ordered ? "list-decimal" : "list-disc marker:text-emerald-700"}`}
              >
                {block.items.map((runs, i) => (
                  <li key={i}>
                    <InlineText runs={runs} />
                  </li>
                ))}
              </Tag>
            );
          }
          case "table":
            return (
              <div key={index} className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-[15px] tabular-nums">
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i}>
                        {row.map((runs, j) => (
                          <td
                            key={j}
                            className="border-b border-line py-3 pr-4"
                          >
                            <InlineText runs={runs} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return (
              <p key={index}>
                <InlineText runs={block.runs} />
              </p>
            );
        }
      })}
    </div>
  );
}
