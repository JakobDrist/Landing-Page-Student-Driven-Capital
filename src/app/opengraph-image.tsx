import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { home, site } from "@/content/data";

// Link preview (Slack, iMessage, LinkedIn …) in the homepage hero's idiom:
// black text panel with the Source Serif headline, the Storebælt bridge on
// the right. Rendered once at build time.

export const alt = `${site.brand} – ${home.hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// next/og (Satori) widens some Geist word spaces; non-breaking spaces keep
// the normal width for these short, single-line strings.
const nbsp = (text: string) => text.replace(/ /g, "\u00a0");

const asset = (file: string) =>
  readFile(join(process.cwd(), "src/assets/og", file));

export default async function OpenGraphImage() {
  const [serif, sans, bridge] = await Promise.all([
    asset("SourceSerif4-Medium.ttf"),
    asset("Geist-Regular.ttf"),
    asset("bridge.jpg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#000",
          color: "#fbfef9",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 612,
            padding: "52px 56px",
          }}
        >
          <div style={{ display: "flex", fontFamily: "Serif", fontSize: 30 }}>
            {site.brand}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "#1e1e24",
                borderRadius: 10,
                padding: "8px 16px",
                fontFamily: "Sans",
                fontSize: 18,
              }}
            >
              {nbsp(home.hero.eyebrow)}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontFamily: "Serif",
                fontSize: 64,
                lineHeight: 1.02,
                letterSpacing: -1.6,
              }}
            >
              {home.hero.title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Sans",
              fontSize: 20,
              color: "rgba(251, 254, 249, 0.6)",
            }}
          >
            {nbsp(site.tagline)}
          </div>
        </div>
        <img
          src={`data:image/jpeg;base64,${bridge.toString("base64")}`}
          width={588}
          height={630}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, weight: 500, style: "normal" },
        { name: "Sans", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
