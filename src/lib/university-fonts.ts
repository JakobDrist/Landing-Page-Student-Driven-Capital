import {
  Barlow,
  DM_Sans,
  EB_Garamond,
  Exo_2,
  Figtree,
  Inter,
  Jost,
} from "next/font/google";

// Typefaces for the university names in the ticker. KU (EB Garamond) and AAU
// (Barlow) use their own web fonts; the others use licensed typefaces, so the
// closest open alternative stands in: AU Passata → Figtree, CBS DK Sans →
// Inter, DTU Neo Sans → Exo 2, SDU Brown → Jost, RUC The Wave → DM Sans.
// None are preloaded, so they never hold up the page. next/font needs the
// options written out in each call.

const garamond = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  display: "swap",
  preload: false,
});
const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
  preload: false,
});
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
  preload: false,
});
const exo = Exo_2({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  display: "swap",
  preload: false,
});
const jost = Jost({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  display: "swap",
  preload: false,
});
const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: "500",
  display: "swap",
  preload: false,
});
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
  preload: false,
});

export const universityFonts: Record<string, string> = {
  garamond: garamond.className,
  figtree: figtree.className,
  inter: inter.className,
  exo: exo.className,
  jost: jost.className,
  barlow: barlow.className,
  dmSans: dmSans.className,
};
