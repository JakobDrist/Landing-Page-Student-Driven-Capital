import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { home, site } from "@/content/data";

// Link preview (Slack, iMessage, LinkedIn …) in the homepage hero's look:
// the Storebælt bridge full-bleed under the same soft dark gradient, the
// wordmark top left, and the centred headline and description in Outfit with
// the primary button below. Rendered once at build time.

export const alt = `${site.brand} – ${home.hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) =>
  readFile(join(process.cwd(), "src/assets/og", file));

export default async function OpenGraphImage() {
  const [outfit, hero] = await Promise.all([
    asset("Outfit-regular.ttf"),
    asset("hero.jpg"),
  ]);
  const action = home.hero.actions[0];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          fontFamily: "Outfit",
          color: "#f3f3f1",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${hero.toString("base64")}`}
          width={1200}
          height={630}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
          }}
        />
        {/* Same shading as the hero: darker at the top and bottom. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(18,18,18,0.42) 0%, rgba(18,18,18,0.08) 45%, rgba(18,18,18,0.5) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 56,
            display: "flex",
            fontSize: 28,
            letterSpacing: -1,
          }}
        >
          {site.brand}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 90px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: 860,
              fontSize: 60,
              lineHeight: 1.08,
              letterSpacing: -1.8,
              textAlign: "center",
            }}
          >
            {home.hero.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              justifyContent: "center",
              width: 720,
              fontSize: 22,
              lineHeight: 1.45,
              color: "rgba(243,243,241,0.92)",
              textAlign: "center",
              background:
                "radial-gradient(ellipse at center, rgba(12,21,30,0.42) 0%, rgba(12,21,30,0) 74%)",
            }}
          >
            {home.hero.description}
          </div>
          {action && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 34,
                padding: "5px 5px 5px 20px",
                borderRadius: 10,
                background: "#ececea",
                color: "#121212",
                fontSize: 18,
              }}
            >
              {action.label}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 7,
                  background: "#2350d8",
                  color: "#ffffff",
                  fontSize: 20,
                }}
              >
                →
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Outfit", data: outfit, weight: 400, style: "normal" }],
    },
  );
}
