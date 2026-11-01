# Northwood — React website template

Reference: https://northwood-capital.framer.website/

71 complete local pages: homepage, 24 companies and portfolio, six sectors and index, fourteen team profiles and index, eleven articles, four article categories, journal index, funds, about, pitch, contact and three legal pages.

The public rendered DOM, CSS, images, fonts and observable interactions were inspected on 1 November 2026. This is a native React + TypeScript adaptation, with scoped CSS and local media. No remote iframe or Framer runtime is required. The design and demo content remain attributable to the original Northwood Framer template. The public preview does not establish a redistribution license; this adaptation does not grant rights to the original design, images or fonts.

## Standalone

npm install
npm run dev
npm run build

The ZIP contains a Vite project. For static production hosting, rewrite extensionless page routes to index.html. Edit page content in public/templates/northwood/data; interactions in src/northwood/northwood-website.tsx; styles in public/templates/northwood/styles.

## Existing React / Next.js app

Use the provided installer from your project's root. It checks collisions and symlinked destinations before copying. It adds no dependencies and does not overwrite your app entry, layout or package.json. For Next.js it adds /northwood and nested pages. Other hosts can render NorthwoodTemplate at /northwood/*, or use basePath="" at the root. A non-root basePath must match your mount route.

## Interactions

Portfolio sector/stage/status/search filters, linked active/exited states, result counts, persistent grid/list view, article search and slash shortcut, mobile navigation with Escape, scroll-aware header, source hover treatments, landscape settling animation and local form validation are implemented in React/CSS. Reduced-motion preferences are respected.

Pitch, contact and newsletter forms are local demos. They do not store data or send messages. Connect a real backend and replace fictional firm, performance, legal, contact and external-link content before real use. Source promotional purchase and Framer branding controls are intentionally excluded from the website preview.
