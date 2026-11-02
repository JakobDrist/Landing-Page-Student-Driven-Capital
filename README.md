# Student Capital

Landingpage og informationssider bygget med Next.js App Router, React, TypeScript og Tailwind CSS 4. Appen ligger direkte i repoets rod.

## Kontekst til sidens tekster

De fire dokumenter om DSD Capital / DSD Invest ligger samlet med originaler og læsbare tekstudtræk i [kontekstoversigten](docs/context/dsd-invest/README.md).

## Start

Brug Node.js 22.22 eller nyere:

```bash
npm ci
npm run dev
```

Åbn [localhost:3003](http://localhost:3003).

```bash
npm run check   # lint, formatering, datakontrakter, TypeScript og produktionsbuild
npm run format
npm run build
npm run start
```

## Filstruktur

```text
src/
  app/
    layout.tsx                Skrifttype og globale styles
    portfolio/page.tsx        Blank portfolioside uden header og footer
    (website)/                Fælles header og footer
      page.tsx                Forsiden
      (site)/                 Informationssider med plads til headeren
      portfolio/[slug]/       Virksomhedsprofiler
      team/[slug]/            Personprofiler
      sectors/[slug]/         Sektorsider
      insights/[slug]/        Artikler
      insights/category/      Artikelkategorier
      legal/[slug]/           Juridiske sider
  components/
    site/                     SiteHeader og SiteFooter
    sections/                 HeroSection, StatsSection, CompanySection m.fl.
    cards/                    CompanyCard, PersonCard og ArticleCard
    pages/                    Sidernes sammensætning af komponenter
    ui/                       Knapper, typografi, ikoner, billeder og lyseffekter
  content/
    data/                     Almindelige data: tekster, virksomheder, personer mv.
    data.ts                   Server-only indholdsadgang og udvælgelse af data
    types.ts                  Typede indholdskontrakter
    routes.json               URL'er og eksisterende sidetitler
  features/
    portfolio/                Filtre, søgning og grid/listevisning
    journal/                  Artikelsøgning og indlæs flere
    forms/                    Formularfelter og lokal demo-indsendelse
  lib/                        Lokale skrifttyper og metadata
  styles/globals.css          Tailwind-tokens, keyframes og fælles baseregler
public/
  images/                     Brand, virksomheder, team, artikler og fotografier
  fonts/                      De fem anvendte Outfit-skriftsnit
tests/                       Indholdsrelationer, links og medier
```

## Sådan arbejder vi videre

Forsiden sammensættes i `src/components/pages/home-page.tsx`. En sektion har sin egen React-komponent, som styler sit markup direkte med Tailwind. Fælles kort, knapper og typografi genbruges mellem siderne.

Tekster og billeder ændres i `src/content/data/`. En virksomhed har eksempelvis felter som `name`, `tagline`, `sector`, `founders` og `rounds`; indholdet beskriver ikke et HTML-træ. Artikler bruger struktureret rich text med afsnit, overskrifter, links, citater, lister og tabeller.

Sider, sektioner og statisk indhold er Server Components. Klientkomponenter bruges til mobilmenu, filtre, søgning og formular-state. Artikeltekster, biografier og virksomhedshistorier sendes ikke som data til katalogernes klientkomponenter.

Tilføj nye sider i `app/`, nye indholdssektioner i `components/sections/` og interaktionslogik i den relevante feature. Brug de fælles farve- og skrifttypetokens i `src/styles/globals.css`. Der er ingen generisk JSON/HTML-renderer, Framer-runtime eller genereret template-CSS i appen.

De 71 eksisterende sider og deres demoindhold er videreført. Sitet hedder DSD Invest, men teksterne er fortsat templatens demoindhold og er ikke omskrevet til DSD Invest-tekster. Formularerne validerer lokalt og viser en demo-kvittering. De gemmer ikke data og sender ikke beskeder.

Se [designets oprindelse](docs/template-provenance.md).
