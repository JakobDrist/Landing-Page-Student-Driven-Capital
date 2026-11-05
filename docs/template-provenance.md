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
