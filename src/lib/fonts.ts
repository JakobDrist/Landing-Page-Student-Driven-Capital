import localFont from "next/font/local";
export const outfit = localFont({
  src: [
    {
      path: "../../public/fonts/outfit-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/outfit-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});
