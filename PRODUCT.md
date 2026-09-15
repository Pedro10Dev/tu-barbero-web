# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: the client booking a cut.** A person in Venezuela who wants a professional haircut, beard trim, or treatment at TuBarbero, and books online instead of calling. May book as a guest or as a registered account. Their success: reserve a slot with the right barber and service quickly, without friction, and show up knowing their time is held.
- Secondary: the barber team (admin/barber roles) running the shop's day-to-day agenda, clients, and services inside the app.

## Product Purpose

TuBarbero is the online booking and agenda platform for a single barbershop. It lets clients discover barbers and services and reserve the exact slot they want, and lets the shop coordinate those appointments reliably. Success for the business is a booked chair; for the client, a confident, punctual experience. The client-facing surfaces (landing page + booking flow) are confirmed as the primary driver right now.

## Positioning

A single premium barbershop in Venezuela where "el arte del corte preciso" — master barbers, punctuality, and an impecable experience — converts anonymous demand into a reserved appointment. The mechanism is a real-time availability booking flow: pick a barber, service, and open slot, online, without calling.

## Operating Context

- Spanish audience (es-VE); interface and copy are in Spanish.
- Shop hours disclosed on the site: Monday–Sunday, 9:00 AM – 8:00 PM.
- Services are priced in USD ($).
- Booking supports both registered accounts and walk-in style guests (guest name + phone); barber selection is part of the flow.
- Staff manage appointments through an agenda (calendar/list), manual "nuevo turno" creation, client list, service list, and a productivity view; admins manage barbers, services, users, schedules, and settings.

## Capabilities and Constraints

- Roles: client, barber, admin (Spatie permissions); Google OAuth login; phone + forced password completion gates for staff.
- Services have a name, duration (minutes), and price. Barbers have a display name, photo, bio, and social links.
- Stack: Laravel + Inertia (React), Tailwind CSS v4, shadcn/ui-style components (Radix), Vite. Public landing is a Blade view; app surfaces are React pages.
- Constraints to honor: content is loaded from the database (services, barbers), so surfaces must render dynamic rows, not hard-coded ones. Availability is server-computed.

## Brand Commitments

- Name: **TuBarbero** (displayed as "TuBarbero", wordmark "TU BARBERO" on the landing header/footer).
- Logo: the existing `favicon.png` asset is the only bound visual asset.
- No other tone, palette, or copy is binding. Existing landing copy ("El Arte del Corte Preciso", "los mejores barberos de Venezuela", etc.) is evidence, not a commitment, and may be reconsidered in the surface brief.

## Evidence on Hand

- Real content in the database-backed models: `Service` (name, duration, price), `BarberProfile` (display_name, photo, bio, social links), `Appointment`, `User` with roles.
- Existing landing page: `resources/views/landing.blade.php` with `landing-*` CSS tokens defined in `resources/css/app.css` (incumbent visual truth).
- Placeholder/weak evidence that future work must not fabricate or over-trust: the Instagram/TikTok handles and hard-coded follower URLs (`@tu_barberia`), the "Abierto hoy hasta las 8:00 PM" badge, phone number `+58-000-000-0000`, and Unsplash stock images used as "recent cuts". These are stubs, not commitments.

## Product Principles

1. The client's booking is the moment that matters; make it fast, obvious, and without unnecessary steps.
2. Real data wins: every barber and service shown must come from the database, never from hard-coded lists.
3. Punctuality and precision are the shop's promise; the interface should feel sharp, exact, and trustworthy, never loud or generic.
4. Guest access stays effortless: someone should be able to book without an account.
5. Preserve the TuBarbero name and logo; everything else visual is open to a stronger world.

## Accessibility & Inclusion

No product-specific accessibility requirement was established beyond standard web best practices.