import { people, selectBySlug } from "@/content/data";
import type { ContentLink } from "@/content/types";
import { PersonCard } from "@/components/cards/person-card";
import { Section } from "./section";
import { SectionHeading } from "@/components/ui/section-heading";
export function TeamSection({
  title,
  items,
  action,
  compact = false,
}: {
  title: string;
  items: string[];
  action?: ContentLink | null;
  compact?: boolean;
}) {
  if (!items.length) return null;
  return (
    <Section>
      <SectionHeading title={title} action={action} />
      <div
        className={`mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-3 md:gap-x-6 ${compact ? "lg:grid-cols-4" : "lg:grid-cols-6"}`}
      >
        {selectBySlug(people, items).map((person) => (
          <PersonCard key={person.slug} person={person} />
        ))}
      </div>
    </Section>
  );
}
