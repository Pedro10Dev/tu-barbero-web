# Surface Brief / El Salón de Azulejo (client journey)

## Scope and Visitor Mode
- **Target:** landing (primary) + booking + booking.success, as one designed client journey.
- **Mode:** Persuade (landing leads; booking inherits the world, Operate discipline).
- **Audience / job:** a Venezuelan client deciding where to get a professional cut; job = pick a barber + service, claim a real free slot, walk in confident their time is held.
- **Action/Task:** land → meet barbers → choose service → pick free turn → confirm (guest or account) → success reassurance.
- **Proof/Content on hand:** real `Service` and `BarberProfile` rows from the DB (render dynamic, never hard-coded); provider says only the name TuBarbero + favicon.png logo are binding. Social handles (`@tu_barberia`), the `+58-000-000-0000` phone, and the "abierto hasta las 8PM" badge are stubs — do not fabricate better ones; do not invent prices, clients, or claims.
- **Constraints:** es-VE copy; Blade landing view + Inertia React booking; preserve routes, behavior, guest booking, and accessibility; two-ink-plus-overlap discipline; everything off the azulejo grid is a defect.

## Direction Contract
- **THESIS:** The whole journey happens inside a tiled barbershop hall. Day by day the salon's wall fills as appointments are claimed: the visitor's act is taking a real empty ceramic slot. Refuses the category default (dark-gold serif booking funnel) and its neon-street opposite.
- **OWN-WORLD:** A field of glazed ceramic azulejos (true tile grid with grout) in deep tile teal on cream glaze, barber red only for the taken chair and the single action, near-black ink; chrome for controls and edges, vinyl/leather for seats; one neon arc. Display in heavy condensed industrial caps (Anton) re-set as tiled mosaic letters; hand-painted signage color (Permanent Marker) for labels and mirror-pricing; Instrument Sans (existing app face) for body.
- **FIRST VIEWPORT:** The salon hall full-front at viewport height: the name as tiled mosaic wall lettering (not a nav logo), center one chrome barber chair on a cream tile rosette (the reservation action sits on the chair), an open row of empty cream tiles showing "hoy" free turns, one neon arc "TU BARBERO". One look says: a real salon, and the chair is free.
- **STORY:** The visitor walks in, recognizes wall after wall of the tiled salon, meets the barbers as mounted tile portraits, reads services priced like the mirror, sees the day's empty tiles, and takes one: the tile fills, the chair turns red, one unrepeatable confirmation reveals like a photograph print. They leave believing their slot is held and no walk-in will take it.
- **FORM:** El Salón de Azulejo — ordered position 7 of 7 on the grounded list; roll seed `6ff9334a` (assigned, code-led, no comp). Signature interaction: claiming a slot fills its tile and fires the single REVELADO confirmation (slow, one-shot). RAISED: TRAZA (a visible thread joins the day's turns), LUMINARIA (interior glow at night), TINTA (two-ink + true overlap), CUADRÍCULA (everything rides the tile grid), REVELADO (ticket reveals once), ELEVADO (confirm is one irreversible gesture).
- **FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable Moment
Claiming a free turn: the empty cream tile flips to a filled barber-red tile and the ticket "reveals" itself once, like a photo surfacing in the bath.

## Unresolved
- Line-level copy for hero and sections may be reconsidered during the build (copy is evidence, not binding); anything purchased takes a stated decision.
- Whether the succeful booking keeps the guest-login split of today (yes unless a blocker appears).