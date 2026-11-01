# Student Capital landingpage

Next.js App Router, React, TypeScript og Tailwind CSS 4 med Northwood-templaten fra Fisher UI.

## Start lokalt

```bash
npm install
npm run dev -- --port 3002
```

Åbn http://localhost:3002. Port 3002 holder appen adskilt fra Fisher UI-serveren på port 3000.

## Kontrol og produktion

```bash
npm run lint
npm run typecheck
npm run build
npm run start -- --port 3002
```

## Tilpasning

- Forsiden og alle 70 undersider genereres som statisk HTML via `src/app/[[...slug]]/page.tsx`.
- Tekster og sidestruktur: `public/templates/northwood/data/`.
- Sidernes oprindelige CSS: `public/templates/northwood/styles/`.
- Lokale billeder og skrifttyper: `public/templates/northwood/assets/`.
- React-interaktioner: `src/components/templates/northwood/northwood-website.tsx`.
- Tailwind og globale tilpasninger: `src/app/globals.css`.
- Installationspakkens oprindelige preview findes også på `/northwood`.

Templatens Northwood-tekster og branding er bevaret. Kontakt-, pitch- og nyhedsbrevsformularer er lokale demoer, der ikke sender eller gemmer oplysninger.

## Oprindelse

Installeret fra `http://127.0.0.1:3000/templates/northwood/fisher-ui-install-northwood.tgz`.
Reference: https://northwood-capital.framer.website/.
Original dokumentation og oplysninger om rettigheder findes i `src/components/templates/northwood/README.md` og `INTEGRATION.md`. Den medfølgende dokumentation fastslår ikke rettigheder til viderefordeling af originalt design, billeder eller skrifttyper.
