import type { Metadata } from "next";
import { geist, geistMono, sourceSerif } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata";
import {
  RevealObserver,
  revealBootScript,
} from "@/components/ui/reveal-observer";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import "@/styles/globals.css";
export const metadata: Metadata = rootMetadata;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${sourceSerif.variable} bg-paper font-sans text-ink antialiased`}
      >
        {children}
        <RevealObserver />
        <SmoothScroll />
      </body>
    </html>
  );
}
