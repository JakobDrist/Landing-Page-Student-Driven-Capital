# Designets oprindelse

Denne app viderefører det Northwood-design, der allerede var installeret i projektet fra Fisher UI-pakken:

```text
http://127.0.0.1:3000/templates/northwood/fisher-ui-install-northwood.tgz
```

Original reference: [Northwood Framer-template](https://northwood-capital.framer.website/).

Pakkens dokumentation angiver, at dens DOM-, CSS-, medie- og interaktionsgrundlag blev inspiceret den 1. november 2026. Den lokale tilpasning bruger native React og kræver ikke Framer-runtime eller iframe.

Design, demoindhold, billeder og skrifttyper stammer fra den oprindelige template. Pakkens dokumentation fastslår, at en offentlig preview ikke dokumenterer rettigheder til viderefordeling, og at tilpasningen ikke giver rettigheder til de oprindelige materialer. Disse oplysninger gælder også efter omstruktureringen.

Student Capital-appen bruger nu selvstændige React-komponenter med Tailwind-styling og almindelige typede indholdsdata. Den generiske JSON/HTML-renderer og de genererede template-stylesheets er fjernet. Designet, teksterne og medierne stammer fortsat fra referencen; den nye kode ændrer ikke materialernes ophav eller rettigheder.

Billeder og skrifttyper er organiseret med beskrivende filnavne i `public/images/` og `public/fonts/`. De anvendte billed- og fontfiler har samme indhold som kildematerialet. Den oprindelige installation findes i repoets Git-historik.

## Stills-redesign (november 2026)

Forsiden, headeren, footeren og den fælles typografi er genopbygget efter [Stills Framer-templaten](https://stills.framer.website/) ([marketplace](https://www.framer.com/community/marketplace/templates/stills/), pris $129), inspiceret den 5. november 2026 i en browser ved 1440, 810 og 390 px. Mål for layout, typografi, afstande, farver, navigationens tilstande og animationer er aflæst fra den offentlige preview og genskabt med egne React-komponenter og Tailwind. Der er ikke kopieret Framer-kode, -klasser, -stylesheets, billeder eller tekster fra Stills.

- **Skrifttyper:** Source Serif 4 (overskrifter, vægt 500, optisk størrelse) og Geist (brødtekst), begge hentet fra Google Fonts via `next/font` under SIL Open Font License.
- **Snit og vægte:** Source Serif 4 indlæses uden optisk størrelses-akse, så overskrifterne får samme kraftige tekstsnit som Stills' statiske font. Knapper, labels og menu bruger Geist 500, og tekst har Stills' OpenType-features (`blwf`, `cv03`, `cv04`, `cv09`, `cv11`).
- **Menu:** som Stills' navigation vokser selve baren fra 80 px til hele skærmhøjden (og tilbage) med en spring på 1 s (bounce 0,1), mens farverne skifter. På desktop falder linkgruppen ind fra −100 px (spring 0,4 s, bounce 0,2); under 810 px glider hvert link op fra 50 px med forsinkelserne 0,1 / 0,2 / 0,3 / 0,35 s, og CTA'en følger efter 0,45 s. Indholdet fjernes straks ved lukning.
- **Hover:** knapper og menuknap dæmpes til 85 %, footerlinks til 70 %, og pilen på tekstlinks drejer 45° med en blød spring-overgang.
- **Farver:** cremehvid `#fbfef9` og sort `#000`, som i referencen.
- **Smooth scroll:** som i Stills (Framers "Smooth Scroll", intensity 12) bruges [Lenis](https://github.com/darkroomengineering/lenis) (MIT) med `duration: 1.2`, blød hjul-scroll og almindelig touch-scroll; se `src/components/ui/smooth-scroll.tsx`.
- **Hero ved scroll:** tekstkolonnen glider 0 → −250 px og toner ud, mens billedet glider 0 → +250 px over Stills' scroll-længde (8.660 px), udglattet med en spring som i Framers "Scroll transform"; nøgletallet ruller op fra 0 med [NumberFlow](https://number-flow.barvian.me/) (`@number-flow/react`, MIT) på ca. 1,1 s, som Stills' optælling. Se `scroll-shift.tsx` og `count-up.tsx`.
- **Animationer:** hero toner ind (2 s, forsinkelse 0,4 s; billedet 3 s), og sektioner glider 50 px op og toner ind, når de kommer i syne, med en kritisk dæmpet spring (ω ≈ 10, 0,8 s, 0,1 s forsinkelse) aflæst fra referencen, via `src/components/ui/reveal-observer.tsx`.
- **Sektioner:** Hero (fastlåst, tekst til venstre og billede til højre), "Track Record" → mission, "Our Approach" → investeringssystemet, "The Partnership" → founding partners, "Get in Touch" → afslutning, samt Stills' navigation og footer.
- **Logobånd:** "Track Record"-sektionens logo-ticker er genskabt som et uendeligt bånd med navnene på danske universiteter, sat som tekst (ingen universitetslogoer), med 80 px mellemrum og samme kantmaske som i referencen.
- **Afslutningens billede:** Stills' fritstående tårn er erstattet af Børsens dragespir, et billede med gennemsigtig baggrund leveret af DSD Invest (`public/images/home/boersen-spir.webp`). Det står i en 528 × 787 px boks på sektionens bundkant som i referencen. I stedet for Stills' korte glid rejser spiret sig op af jorden, mens sektionen scrolles ind: det glider op fra 55 % under sin plads, og et varmt lys, maskeret til spirets silhuet, glider op ad dragerne til spidsen (`src/components/ui/spire-reveal.tsx`).
- **Indhold og medier:** sidens egne tekster og billedet af Storebæltsbroen.

En offentlig preview giver ikke i sig selv ret til at genbruge et betalt designs udtryk. En tæt genskabelse bør derfor dækkes af en købt licens til templaten.

## Overgang fra mission til metode

Overgangen er DSD Invests egen og findes ikke i Stills. Missionsudsagnet er låst i tre skærmhøjder. Ordene tændes i den første halvdel, og i den anden trækker udsagnet sig tilbage: det skaleres til 90 % og glider 48 px op, mens det opløses ord for ord i læseretningen fra lige efter, at sidste ord er tændt (47 %), til ca. 80 % af forløbet. Hvert ord sløres op til 10 px, toner ned til 12 % og driver i sin egen retning, styret af tilfældige tal med fast seed, så server og klient er enige. Samtidig glider metodesektionen op over det som et grafitfarvet kort (`--color-graphite`), der vokser fra 5 % sidemargen og 40 px hjørner til fuld bredde (`src/components/ui/handoff-card.tsx`). Uden animationer (reduced motion) vises sektionerne statisk efter hinanden.

## Ikoner og link-preview

Favicon og app-ikoner (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`) er lavet ud fra DSD Invests eget ikon ("DSD" i navy serif), leveret af organisationen. Link-previewet genereres af `src/app/opengraph-image.tsx` i forsidens stil med Source Serif 4 og Geist som TTF-filer i `src/assets/og/` (begge fra Google Fonts under SIL Open Font License) og et udsnit af Storebælt-billedet.

## Medlemssidens hero

Heroen på `/membership` er inspireret af produkt-heroen i Framer-templaten Verity (https://verrity.framer.website/): en fuldbredde skumringsbaggrund med mørk skygge øverst, der toner ud mod siden under skærmbilledet (maske fra 50 % til 100 %), og et produktskærmbillede, der vippes bagover (rotateX 18° → 0°) og lægges fladt, mens man scroller, og som står helt uigennemsigtigt med skarp kant og blød skygge (ingen udtoning eller sløring). Verity's eget baggrundsfoto og indhold er ikke genbrugt. Baggrunden er forsidens billede af Storebæltsbroen, og skærmbilledet (`public/images/membership/platform-dashboard.webp`) er et skærmbillede af DSD Invests webapp, leveret af organisationen (`src/components/ui/platform-shot.tsx`).
