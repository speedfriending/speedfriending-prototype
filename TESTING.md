# TESTING — Speedfriending-prototype

*Sist oppdatert: 2026-04-19*

Dette er sjekklisten for å teste prototypen. Alle tester skal kunne utføres i nettleser — ingen installasjon, ingen build.

**Live URL:** https://vagabonds-as.github.io/speedfriending-prototype/
(Blir flyttet til `https://vagabonds-as.github.io/speedfriending-prototype/` når transfer er godkjent.)

**Lokalt:** `python3 -m http.server 8000` i repo-rot, deretter `http://localhost:8000/Prototype.html`.

---

## 1. Meny / landingssiden

- [ ] Side laster uten feil (åpne DevTools → Console → ingen røde feilmeldinger)
- [ ] Masthead viser "Speedfriending." med stor Fraunces-font
- [ ] 3 seksjoner synlig i rekkefølge: **Live App**, **6 Storylines**, **Quick Flows**
- [ ] Live App-kortet er grønt-kantet, "Start →"-knapp til høyre
- [ ] Storylines-kortene har farget topplinje (coral, plum, grønn, amber, rose, lys coral)
- [ ] Hver storyline viser skjerm-antall, persona, beskrivelse
- [ ] Hover på storyline-kort løfter det 2px opp (mikro-interaksjon)
- [ ] Footer-lenker: "Galleri med alle skjermer", "FEEDBACK.md", "APP_MAP.md"

## 2. Live App — grunnleggende

- [ ] Klikk **Start Live App** → åpner Home-skjermen med Home-tab aktiv
- [ ] Bunn-tab-bar viser 5 ikoner: Hjem, Events, Crew, Chat, Du
- [ ] Home-tab er markert med plum-farge (aktiv)
- [ ] "Du er på: Hjem" synlig øverst
- [ ] "Live App · ekte klikkbar simulering" synlig i topp-høyre
- [ ] Under telefonen: "Hva vil du gjøre nå?" + 3 handlingsknapper

## 3. Live App — Tab-bytting (KRITISK)

- [ ] Klikk **Events** i tab-baren → bytter til Events-skjerm
- [ ] Breadcrumb oppdateres: "Du er på: Events"
- [ ] Handlingsknappene under telefonen endres (ikke samme som Home)
- [ ] Klikk **Crew** i tab-baren → bytter til Crew-skjerm
- [ ] Klikk **Chat** i tab-baren → bytter til Chat-skjerm
- [ ] Klikk **Du** i tab-baren → bytter til profil-skjerm
- [ ] Klikk **Hjem** → kommer tilbake til Home
- [ ] Tab-baren oppdaterer visuelt hvilken som er aktiv (plum-farge)

## 4. Live App — Stack-navigasjon

Start fra Home-tab:

- [ ] Klikk knappen **"Åpne kveldens event →"** under telefonen
- [ ] Bekreftelse-skjermen åpnes
- [ ] Breadcrumb viser: "Hjem › Event-detalj"
- [ ] Tilbake-knapp (sirkel med pil) synlig øverst til venstre i telefonen
- [ ] Klikk tilbake-knappen → tilbake til Home
- [ ] Breadcrumb tilbake til "Hjem"

Stack-persistens ved tab-bytte:

- [ ] Stå på Home → klikk "Åpne kveldens event" → du er nå på Event-detalj
- [ ] Klikk **Events** i tab-bar → bytter til Events
- [ ] Breadcrumb: "Du er på: Events"
- [ ] Klikk **Hjem** i tab-bar → **går tilbake til Event-detalj** (stack huskes!)
- [ ] Klikk tilbake → til Home

Dypt stacket navigasjon:

- [ ] Fra Home: klikk "Åpne kveldens event"
- [ ] På Event-detalj: klikk "Legg i kalender"
- [ ] Breadcrumb: "Hjem › Event-detalj › Kalender-invitasjon"
- [ ] Klikk tilbake én gang → på Event-detalj
- [ ] Klikk tilbake igjen → på Home

## 5. Live App — alle tab-flows

### Events-tab
- [ ] "Vinsmaking med Martine" → Event-detalj
- [ ] "Søk events" → Søk-skjerm (med tilbake-knapp)
- [ ] "Filter" → Filter-skjerm (med "Bruk filter" for tilbake)

### Crew-tab
- [ ] "Åpne Onsdag-crew" → Crew-detalj
- [ ] "Crew-chat" → Crew-chat
- [ ] Fra Crew-detalj: "Åpne crew-chat" → Crew-chat

### Chat-tab
- [ ] "Chat med Kari" → Chat-detalj
- [ ] "Snakk med Frida" → Frida-chat

### Du-tab
- [ ] "Din portefølje" → kontakter-skjerm
- [ ] "Min sosiale helse" → helse-skjerm
- [ ] "Innstillinger" → innstillinger
- [ ] "Bli vertinne" → web-ambassadør-side (annen ramme, uten tab-bar)
- [ ] "Vis Wrapped 2026" → Wrapped-skjerm

## 6. Storylines — auto-play

- [ ] Klikk "Karins år" fra hovedmenyen
- [ ] Progresjonsbar synlig (1 av 14)
- [ ] Klikk **Spill av** → auto-advance hver 5. sekund
- [ ] Knappen viser "Spiller" med pulserende prikk når aktiv
- [ ] Klikk **Spill av** igjen → pause (tilbake til "Spill av"-tekst)
- [ ] Klikk ← under telefonen → går ett steg tilbake
- [ ] Klikk → under telefonen → går ett steg frem
- [ ] Klikk skjerm-prikker øverst → hopper direkte dit
- [ ] "Alle storylines" øverst til venstre → tilbake til meny

Test alle 6 storylines:
- [ ] Karins år (14 skjermer)
- [ ] Bli ambassadør (10 skjermer)
- [ ] HR-Ingrid (9 skjermer)
- [ ] Aperol sponsor (8 skjermer)
- [ ] Dating-oppdagelsen (10 skjermer)
- [ ] Viral-loop (7 skjermer)

## 7. Quick Flows — fri utforsking

- [ ] Klikk "Utforsk 100+ skjermer fritt" fra hovedmenyen
- [ ] 10 flow-knapper synlig: Social, Business, Dating, B2B, Sponsor, Ambassadør, Avanserte, Wrapped, Nettside
- [ ] Klikk en flow → åpner startskjermen for den
- [ ] Oransje-lilla gradient-knapper under telefonen → naviger flow-en
- [ ] "Tilbake"-knapp vises når du har gått minst ett steg
- [ ] Bytte flow → nullstiller historikken

## 8. Skjermer (rendering)

Åpne `Hjem.html` via footer-lenke og bla gjennom galleriet:

- [ ] Alle telefonrammer rendrer med riktig 402×874-størrelse
- [ ] Dynamic Island synlig øverst
- [ ] Home indicator synlig i bunn
- [ ] Ingen tab-bar for web-skjermer (speedfriending.no-sidene)
- [ ] Tab-bar synlig for app-skjermer
- [ ] Fraunces-fonten lastet for overskrifter
- [ ] SF Pro / system-fonten for body-tekst
- [ ] Fargepalett: plum (#7F4D95), coral (#F0826B), krem-bakgrunn (#F4EDE7)

## 9. Responsivt / nettleser-støtte

- [ ] Fungerer i Chrome (prod-mål)
- [ ] Fungerer i Safari
- [ ] Fungerer i Firefox
- [ ] Mobil-nettleser (iPhone Safari): telefonrammen er stor, men innhold leselig
- [ ] Desktop 1280px+: full layout
- [ ] Desktop 1920px: sentrert, ikke for bred

## 10. Ytelse / konsoll

- [ ] Side laster på under 2 sek på god nett
- [ ] Ingen feil i Console (DevTools)
- [ ] Ingen røde 404-er i Network-fanen
- [ ] Fonts (Fraunces, Caveat) laster fra Google Fonts
- [ ] React + Babel laster fra unpkg CDN

## 11. Kjente begrensninger (IKKE bugs)

Disse er bevisst ikke implementert ennå:

- Knapper inne i skjermene (som "Se detaljer" på event-kortet i Home) er dekorative — bruk handlingsknappene under telefonen i stedet
- Tekst-input i søk/filter/chat er ikke interaktiv
- Ingen ekte data-lagring (refresh = reset)
- Vipps-flow er mocket (ingen ekte betaling)
- Tab-bar på web-skjermer (ambassadør-landing etc) er bevisst skjult

---

## Rapportering av bugs

Rapporter bugs som GitHub-issues i `vagabonds-as/speedfriending-prototype` med:
- Skjermbilde
- Nettleser + versjon
- Steg for å reprodusere
- Forventet vs faktisk oppførsel

## Neste skritt etter testing

Når testing er fullført og vi har en god forståelse av hva som funker / ikke:
1. Prioriter hva som må fikses før prototype → ekte app
2. Koble på Firebase for ekte data (events, brukere, chat)
3. Portere til React Native (koden ligger i `speedfriending/app-reactnative`)
4. Vipps-integrasjon med ekte test-miljø

---

**Tester utført av:** _________________ **Dato:** _________________
