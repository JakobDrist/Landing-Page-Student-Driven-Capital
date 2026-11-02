import { companies, companySummary, pages } from "@/content/data";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { PortfolioDirectory } from "@/features/portfolio/portfolio-directory";
export function PortfolioPage() {
  return (
    <>
      <PageHeader {...pages.portfolio} />
      <Container className="pb-20 md:pb-25 lg:pb-29 xl:pb-34">
        <PortfolioDirectory companies={companies.map(companySummary)} />
      </Container>
    </>
  );
}
