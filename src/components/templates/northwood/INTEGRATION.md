# Integrating Northwood

Run the downloaded installer from the root of an existing React project. It adds components/templates/northwood (or src/components/templates/northwood), public/templates/northwood and, for Next.js, app/northwood/[[...slug]]/page.tsx. It installs no dependencies and leaves package.json and the root layout unchanged. Existing destinations or symlinked ancestors are rejected before copying.

For another React router, render NorthwoodTemplate on /northwood and all /northwood/* paths. The basePath prop must match the mount point. At the website root use basePath="". Serve the included public folder unchanged. Configure a static host to rewrite website page routes to your app entry.

The standalone ZIP already includes a Vite host. Run npm install and npm run dev, or npm run build for production.

Page content is stored in data JSON, presentation in per-page CSS, and reusable interactions in northwood-website.tsx. See README.md for provenance and demo limitations. Forms are local previews and need your own submission backend.
