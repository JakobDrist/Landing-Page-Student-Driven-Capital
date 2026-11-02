import { Container } from "@/components/ui/container";
import { pageTitle } from "@/components/ui/section-heading";
export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <header className="pt-16 pb-16 md:pt-24 md:pb-20 xl:pt-28 xl:pb-24">
      <Container>
        <div className="max-w-4xl">
          <h1 className={pageTitle}>{title}</h1>
          {description && (
            <p className="mt-8 max-w-[760px] text-[20px] leading-[1.5] tracking-[-0.015em] text-muted md:text-[24px]">
              {description}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}
