---
version: 2
slug: "landing"
primary_target: "landing"
related_targets: ["booking","booking.success"]
---

# Surface Brief / La Imprenta (client journey)

## Scope and Visitor Mode
- **Target:** landing (primary) + booking + booking.success, as one designed client journey.
- **Mode:** Persuade (landing leads; booking inherits the world, Operate discipline).
- **Audience / job:** a Venezuelan client deciding where to get a professional cut; job = pick a barber + service, claim a real free slot, walk in confident their time is held.
- **Action/Task:** land → meet barbers → choose service → pick free turn → confirm (guest or account) → success reassurance.
- **Proof/Content on hand:** real `Service` and `BarberProfile` rows from the DB (render dynamic, never hard-coded); provider says only the name TuBarbero + favicon.png logo are binding. Social handles (`@tu_barberia`), the `+58-000-000-0000` phone, and the "abierto hasta las 8PM" badge are stubs — do not fabricate better ones; do not invent prices, clients, or claims.
- **Constraints:** es-VE copy; Blade landing view + Inertia React booking; preserve routes, behavior, guest booking, and accessibility; sober minimal and modern: exactly one red accent (signal), hairline rules only, no pastels, no tiles/ceramic vocabulary anywhere (no "baldosa", no "azulejo"), no glow, no neon, no hand-lettering.

## Direction Contract
- **THESIS:** The booking page is a sober print: ink on paper, a strict hairline grid, and a single barber-red colour. Refuses the dark-gold serif funnel, the neon-street opposite, and the abandoned pastel tile hall.
- **OWN-WORLD:** Two sheets alternating — near-black ink (`oklch(0.16 0.012 258)`) and bone paper (`oklch(0.975 0.006 88)`), hairlines in steel, and exactly one signal red (`oklch(0.52 0.185 27)`) reserved for the reservation and the taken turn. Heavy grotesk caps (Archivo Black) for display, neutral grotesk (Hanken Grotesk) for body, mono (JetBrains Mono) for every figure: times, prices, indexes. Everything rides the keyline grid; sharp corners; generous air.
- **FIRST VIEWPORT:** A full ink sheet at viewport height: wordmark small at top-left, a single massive "TU BARBERO" set in Archivo Black, kicker in mono, and clamped on the east edge a ruled **day-ticket** — today's agenda as a mono table with taken/free rows and the "tú" row marked in the only red on the page. The reservation is a solid red block on the ticket. One look says: a real time is held, and this one is free.
- **STORY:** The visitor reads a precise, quiet sheet, meets the barbers as ruled mono plates, reads services as a price list in type, sees the day's ticket, and takes a free turn: the row flips to the page's single red mark, and the confirmation is a sober black sheet "CONFIRMADO". They leave believing their slot is held and no walk-in will take it.
- **FORM:** La Imprenta — ordered position 7 of 7 on the grounded list; roll seed `0fa79bd2` (assigned, code-led, no comp). Signature interaction: taking a free turn lights the day-ticket's only red mark; the confirm is one irreversible gesture. RAISED: EN CLAVE (every unit bounded by a hairline keyline; a single madder-red accent — from Ornamento Impreso), LUZ ÚNICA (the taken turn is the page's only red/warm mark — from Ciudad Nocturna).
- **FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable Moment
Taking the free turn: the mono row on the ruled day-ticket becomes the page's single red mark, and CONFIRMADO lands as one quiet black sheet.

## Unresolved
- Line-level copy for hero and sections may be reconsidered during the build (copy is evidence, not binding); anything purchased takes a stated decision.
- Whether the successful booking keeps the guest-login split of today (yes unless a blocker appears).