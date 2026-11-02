import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 md:py-25 lg:py-29 xl:py-34 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
