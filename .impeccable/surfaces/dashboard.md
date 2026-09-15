---
version: 2
slug: "dashboard"
primary_target: "dashboard"
related_targets: ["admin/dashboard", "app-shell"]
---

# Surface Brief / La Bitácora (staff app)

## Scope and Visitor Mode
- **Target:** dashboard (`/dashboard`, barber) primary, with `admin/dashboard` and the shared staff shell (sidebar, top bar, tokens, StatCard/PageHeader primitives) receiving the same world.
- **Mode:** Operate (the visitor completes a task; scanability and real usage outrank expression).
- **Audience / job:** the barber and the admin during a live shop day. The barber's job = read today's state at a glance, decide pending bookings, know the next client, log productivity. The admin's job = supervise accounts, barbers, services, and the day's flow.
- **Action/Task:** open the sheet → read the day's figures → see the next turn → decide pendings (accept/reject) → glance at activity; admin: read the KPIs and the recent-booking flow.
- **Proof/Content on hand:** real DB rows — `stats`, `trend` (7-day series), `pendingAppointments`, `nextAppointment`, `activity` (barber); `stats`, `trend`, `recentAppointments`, `recentActivity` (admin). Render dynamic, never hard-coded. No new data may be invented; shop hours 9:00–20:00 are disclosed on the site and may be shown.
- **Constraints:** es-VE copy; Inertia React pages on the shared shell; preserve routes, the accept/reject action, the appearance toggle (both themes must work), and accessibility. The world is La Imprenta **as shipped** on the landing: ink + bone sheets, Instrument faces, JetBrains Mono figures, and a single warm accent — the maderoso olive of `--color-landing-success`. The landing brief's "barber-red" never shipped; the app translates that intent to the shipped olive as its one live mark. Hairline rules only; sharp corners; no glow, no pastels, no pill-card dashboard vocabulary.

## Direction Contract
- **THESIS:** The dashboard is the day's bitácora, not a KPI gallery: one ruled sheet carrying today's figures, the next turn, and the pending decisions. Refuses the rounded-stat-card grid, the accent rainbow of status chips, and the teal/grey starter-kit app chrome.
- **OWN-WORLD:** Ink sheets (near-black, `oklch(0.145 0 0)`-family) on the rail and head; bone paper in light mode, ink paper in dark. Hairline keyline rules (steel, `oklch(0.27 0 0)`-family) bounding every unit. JetBrains Mono for every figure, label, timestamp, and index; Instrument Serif for the singular display moment (the greeting and the next turn's name); Instrument Sans for UI copy. One warm mark — the maderoso olive — reserved for the live/current turn and the decision taken; destructive stays a desaturated brick used only as a state.
- **FIRST VIEWPORT:** A bone/ink field under a 16-unit hairline top bar. Top band: mono kicker `BITÁCORA · <fecha>`, a serif greeting welcome, shop hours `9:00 — 20:00` in mono on the east edge, and the primary action as a solid-ink block (NUEVO TURNO). A four-cell keyline strip of the day's figures follows. Center: the PRÓXIMO TURNO ticket — large mono time, serif client name, service, its current turn marked by the page's only warm rule. Below, two columns: a PENDIENTES ledger (hairline rows with mono time · client · service and one-touch ACCEPTAR/RECHAZAR text-chops) and an ACTIVIDAD journal.
- **STORY:** The barber reads a filled-in operations sheet: today's figures in a ruled strip, the next client as a held ticket, pending bookings as a ledger. One touch decides a booking and lights that row's only warm mark; the sheet stays quiet, exact, and trustworthy.
- **FORM:** La Bitácora del Día — surface concept seed `eb034e6a` (assigned; composition; code-led, no comp). Signature interaction: accepting a pending flips its decision cell to the page's single warm mark, echoing the landing's "taking a free turn lights the ticket's only mark."
- **FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Memorable Moment
Accepting a pending booking turns that ledger row's chop to the sheet's single olive mark — the staff-side echo of taking the free turn on the public ticket.

## Unresolved
- Copy at field level (kickers, section titles) may be reconsidered during the build; factual labels (metric names, statuses, actions) stay.
- Both appearance modes are kept; light mode renders the bone sheet with the ink rail, dark mode the full ink sheet.
