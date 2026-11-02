import { pages } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { TeamSection } from "@/components/sections/team-section";
export function TeamPage() {
  return (
    <>
      <PageHeader {...pages.team} />
      {pages.team.groups.map((group) => (
        <TeamSection
          key={group.title}
          title={group.title}
          items={group.people}
          compact
        />
      ))}
    </>
  );
}
