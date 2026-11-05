import { Geist, Source_Serif_4 } from "next/font/google";

/** Body and interface text (Stills reference: Geist). */
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

/**
 * Headings (Stills reference: Source Serif 4, weight 500). Stills loads the
 * static cut, whose optical size is the default text size (opsz 14); loading
 * the font without the opsz axis gives the same sturdy text-cut glyphs instead
 * of the thin display cut that automatic optical sizing would pick at 72px.
 */
export const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-serif",
  display: "swap",
});
