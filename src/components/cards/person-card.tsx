import { AnimatedLabel } from "@/components/ui/animated-label";
import Link from "next/link";
import { Media } from "@/components/ui/media";
import type { Person } from "@/content/types";
export function PersonCard({ person }: { person: Person }) {
  return (
    <Link href={person.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[#dcdcd8]">
        <Media
          image={person.image}
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 17vw"
          className="grayscale contrast-[1.04] transition-transform duration-1200 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 text-[18px] leading-[1.4] tracking-[-0.02em]">
        <AnimatedLabel>{person.name}</AnimatedLabel>
      </h3>
      <p className="mt-1 text-[13px] leading-[1.35] tracking-[-0.01em] text-muted">
        {person.role}
      </p>
    </Link>
  );
}
