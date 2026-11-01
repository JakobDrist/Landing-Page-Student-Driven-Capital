import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northwood",
  description: "Early-stage venture capital.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
