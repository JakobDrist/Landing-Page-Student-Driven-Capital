import type { Metadata } from "next";
import { outfit } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata";
import "@/styles/globals.css";
export const metadata: Metadata = rootMetadata;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body
        className={`${outfit.variable} bg-paper font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
