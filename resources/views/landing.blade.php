@extends('layouts.landing')

@section('content')

<div class="overflow-x-hidden">
    {{-- Header / Navbar con Menú Hamburguesa Funcional --}}
    <header class="fixed inset-x-0 top-0 z-50 h-20 border-b border-landing-border bg-landing-bg/80 backdrop-blur-md">
        <nav class="mx-auto flex h-full max-w-7xl items-center justify-between px-6" aria-label="Principal">
            {{-- Logo --}}
            <a href="#inicio" class="flex items-center gap-1">
                <div class="flex aspect-square size-9 items-center justify-center overflow-hidden rounded-lg border border-landing-border bg-landing-surface">
                    <img src="{{ asset('favicon.png') }}" alt="Logo TuBarbero" class="size-6 object-contain">
                </div>
                <span class="ml-2 text-sm font-black tracking-wider uppercase">TuBarbero</span>
            </a>

            {{-- Links de escritorio --}}
            <div class="hidden items-center gap-8 md:flex">
                <a href="#inicio" class="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Inicio</a>
                <a href="#nosotros" class="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Nosotros</a>
                <a href="#barberos" class="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Barberos</a>
                <a href="#servicios" class="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Servicios</a>
                <a href="#trabajos" class="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Trabajos</a>
            </div>

            <div class="hidden items-center gap-3 md:flex">
                <a href="{{ route('booking') }}" class="rounded-xl bg-landing-accent px-5 py-2.5 text-sm font-semibold text-landing-accent-foreground transition-all hover:bg-landing-accent/80">
                    Reservar Cita
                </a>

                @auth
                    <div id="user-menu" class="relative">
                        <button type="button" id="user-menu-toggle" aria-expanded="false" aria-controls="user-dropdown"
                            class="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-landing-text transition-colors hover:bg-landing-accent/10">
                            <span>{{ Auth::user()->name }}</span>
                            <svg class="h-4 w-4 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-landing-border bg-landing-surface py-1 shadow-2xl">
                            @if (Auth::user()->hasRole('client'))
                                <a href="{{ route('client.profile.edit') }}" class="block px-4 py-2.5 text-sm text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">
                                    Información personal
                                </a>
                            @else
                                <a href="{{ route('dashboard') }}" class="block px-4 py-2.5 text-sm text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">
                                    Administración
                                </a>
                            @endif
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="block w-full px-4 py-2.5 text-left text-sm text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">
                                    Cerrar sesión
                                </button>
                            </form>
                        </div>
                    </div>
                @else
                    <a href="{{ route('login') }}" class="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">
                        Ingresar
                    </a>
                @endauth
            </div>

            {{-- Botón hamburguesa móvil --}}
            <button type="button" id="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu"
                class="flex h-10 w-10 items-center justify-center rounded-lg text-landing-text transition-colors hover:bg-landing-accent/10 md:hidden">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </nav>

        {{-- Menú móvil colapsable --}}
        <div id="mobile-menu" class="hidden border-t border-landing-border bg-landing-bg/95 backdrop-blur-md md:hidden">
            <div class="flex flex-col gap-1 px-6 py-4">
                <a href="#inicio" class="rounded-lg px-3 py-2 text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">Inicio</a>
                <a href="#nosotros" class="rounded-lg px-3 py-2 text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">Nosotros</a>
                <a href="#barberos" class="rounded-lg px-3 py-2 text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">Barberos</a>
                <a href="#servicios" class="rounded-lg px-3 py-2 text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">Servicios</a>
                <a href="#trabajos" class="rounded-lg px-3 py-2 text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">Trabajos</a>
                <div class="mt-2 flex flex-col gap-2 border-t border-landing-border pt-4">
                    <a href="{{ route('booking') }}" class="rounded-xl bg-landing-accent px-3 py-2.5 text-center text-sm font-semibold text-landing-accent-foreground transition-all hover:bg-landing-accent/80">
                        Reservar Cita
                    </a>

                    @auth
                        <div class="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text">
                            {{ Auth::user()->name }}
                        </div>
                        @if (Auth::user()->hasRole('client'))
                            <a href="{{ route('client.profile.edit') }}" class="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">
                                Información personal
                            </a>
                        @else
                            <a href="{{ route('dashboard') }}" class="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">
                                Administración
                            </a>
                        @endif
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">
                                Cerrar sesión
                            </button>
                        </form>
                    @else
                        <a href="{{ route('login') }}" class="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text">
                            Ingresar
                        </a>
                    @endauth
                </div>
            </div>
        </div>
    </header>

    {{-- Hero Section --}}
    <main id="inicio" class="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 pt-28 pb-12">
        <div class="flex w-full flex-col-reverse items-center gap-12 md:grid md:grid-cols-12">
            {{-- Texto Principal --}}
            <div class="space-y-8 text-center md:col-span-7 md:text-left">
                <h1 class="font-serif text-5xl leading-[0.95] font-extrabold tracking-tight text-landing-text md:text-8xl">
                    El Arte del <br>
                    <span class="bg-gradient-to-r from-landing-text to-landing-muted bg-clip-text text-transparent">
                        Corte Preciso.
                    </span>
                </h1>
                <p class="mx-auto max-w-2xl text-lg leading-relaxed font-light text-landing-text-soft md:mx-0 md:text-xl">
                    Domina tu imagen con nuestros maestros barberos. En TuBarbero, cada detalle cuenta para ofrecerte
                    un estilo impecable y una experiencia de relajación inigualable.
                </p>

                <div class="pt-4">
                    <a href="{{ route('booking') }}"
                        class="inline-flex w-full items-center justify-center rounded-xl bg-landing-accent px-10 py-5 text-lg font-semibold text-landing-accent-foreground shadow-xl shadow-landing-accent/5 transition-all hover:bg-landing-accent/80 md:w-auto">
                        Reservar Cita Ahora
                    </a>
                </div>
            </div>

            {{-- Imagen Destacada --}}
            <div class="relative h-[400px] w-full overflow-hidden rounded-3xl border border-landing-border shadow-2xl md:col-span-5 md:h-[500px]">
                <img src="{{ asset('images/hero-image.jpg') }}" alt="Barbería TuBarbero" class="h-full w-full object-cover">

                <div class="absolute inset-0 bg-gradient-to-t from-landing-bg via-transparent to-transparent opacity-40"></div>

                <div class="absolute right-6 bottom-6 left-6 md:right-8 md:bottom-8 md:left-8">
                    <div class="flex w-fit items-center gap-3 rounded-2xl border border-landing-border bg-landing-bg/80 px-5 py-3.5 backdrop-blur-md">
                        <div class="relative flex h-2.5 w-2.5">
                            <span class="absolute h-full w-full animate-ping rounded-full bg-landing-success opacity-75"></span>
                            <span class="relative h-2.5 w-2.5 rounded-full bg-landing-success"></span>
                        </div>
                        <span class="text-sm font-medium text-landing-text">Abierto hoy hasta las 8:00 PM</span>
                    </div>
                </div>
            </div>
        </div>
    </main>

    {{-- Sección Nosotros --}}
    <section id="nosotros" class="relative flex min-h-screen items-center border-y border-landing-border/50 bg-landing-bg py-24">
        <div class="mx-auto w-full max-w-7xl px-6">
            <div class="grid items-center gap-16 md:grid-cols-5">
                <div class="space-y-5 text-center md:col-span-2 md:text-left">
                    <span class="text-sm font-bold tracking-wider text-landing-text/80 uppercase">Excelencia y Detalle</span>
                    <h2 class="font-serif text-4xl leading-tight font-bold text-landing-text md:text-5xl">
                        Más que un corte, una experiencia.
                    </h2>
                    <p class="leading-relaxed font-light text-landing-text-soft">
                        No solo nos dedicamos a cortar el cabello; nos aseguramos de que salgas renovado, con confianza
                        y estilo. Utilizamos productos de primera calidad.
                    </p>
                </div>

                <div class="grid gap-6 sm:grid-cols-2 md:col-span-3">
                    <article class="group rounded-3xl border border-landing-border bg-landing-surface p-8 transition-colors hover:border-landing-border-strong">
                        <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-landing-border bg-landing-accent/5 transition-transform group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-landing-text">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-semibold text-landing-text">Agenda 100% Online</h3>
                        <p class="text-sm leading-relaxed font-light text-landing-text-soft">
                            Reserva, reprograma o cancela tu cita desde cualquier dispositivo y en cualquier momento.
                        </p>
                    </article>

                    <article class="group rounded-3xl border border-landing-border bg-landing-surface p-8 transition-colors hover:border-landing-border-strong">
                        <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-landing-border bg-landing-accent/5 transition-transform group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-landing-text">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0121 12a8.966 8.966 0 01-3.018 6.725zM12 9a3 3 0 100-6 3 3 0 000 6z" />
                            </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-semibold text-landing-text">Barberos Maestros</h3>
                        <p class="text-sm leading-relaxed font-light text-landing-text-soft">
                            Nuestro equipo está formado por profesionales con años de experiencia en tendencias actuales.
                        </p>
                    </article>

                    <article class="group rounded-3xl border border-landing-border bg-landing-surface p-8 transition-colors hover:border-landing-border-strong">
                        <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-landing-border bg-landing-accent/5 transition-transform group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-landing-text">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                            </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-semibold text-landing-text">Productos Premium</h3>
                        <p class="text-sm leading-relaxed font-light text-landing-text-soft">
                            Utilizamos y recomendamos solo las mejores marcas de cuidado capilar y barba del mercado.
                        </p>
                    </article>

                    <article class="group rounded-3xl border border-landing-border bg-landing-surface p-8 transition-colors hover:border-landing-border-strong">
                        <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-landing-border bg-landing-accent/5 transition-transform group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-landing-text">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="mb-2 text-xl font-semibold text-landing-text">Puntualidad Exacta</h3>
                        <p class="text-sm leading-relaxed font-light text-landing-text-soft">
                            Respetamos tu tiempo. Tu barbero estará listo exactamente a la hora acordada sin esperas.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    </section>

    {{-- Sección de Barberos --}}
    <section id="barberos" class="relative border-y border-landing-border/50 bg-landing-bg py-24">
        <div class="mx-auto max-w-7xl px-6">
            <div class="mx-auto mb-16 max-w-xl text-center">
                <span class="text-sm font-bold tracking-wider text-landing-text/80 uppercase">Profesionales</span>
                <h2 class="mt-2 font-serif text-3xl font-bold text-landing-text md:text-4xl">Nuestros Barberos</h2>
                <p class="mt-3 text-sm font-light text-landing-text-soft">
                    Conoce al equipo encargado de llevar tu estilo al siguiente nivel.
                </p>
            </div>

            <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                @foreach ([
                    ['nombre' => 'Carlos M.', 'img' => 'barbero-1.jpg', 'alt' => 'Carlos M., master barber', 'bio' => 'Master Barber enfocado en degradados de alta precisión y estilos modernos.'],
                    ['nombre' => 'Luis P.', 'img' => 'barbero-2.jpg', 'alt' => 'Luis P., barbero experto en barba', 'bio' => 'Experto en diseño de barba y tratamientos capilares de cuidado integral.'],
                    ['nombre' => 'Andrés G.', 'img' => 'barbero-3.jpg', 'alt' => 'Andrés G., barbero clásico', 'bio' => 'Dominio absoluto del corte clásico a navaja y perfiles tradicionales.'],
                ] as $barbero)
                <article class="group flex flex-col justify-between rounded-3xl border border-landing-border bg-landing-surface p-5 transition-all hover:border-landing-border-strong">
                    <div>
                        <div class="mb-6 h-72 overflow-hidden rounded-2xl border border-landing-border">
                            <img src="{{ asset('images/' . $barbero['img']) }}" alt="{{ $barbero['alt'] }}" loading="lazy"
                                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                        </div>

                        <div class="mb-2 flex items-center gap-2">
                            <h3 class="text-xl font-bold text-landing-text">{{ $barbero['nombre'] }}</h3>
                            <svg class="h-5 w-5 fill-current text-landing-success" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>

                        <p class="mb-6 text-sm leading-relaxed font-light text-landing-text-soft">{{ $barbero['bio'] }}</p>
                    </div>

                    <div class="flex items-center justify-between border-t border-landing-border pt-4">
                        <div class="flex items-center gap-3">
                            <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer"
                                class="text-landing-text-soft transition-colors hover:text-landing-text" aria-label="Instagram de {{ $barbero['nombre'] }}">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m3-3a3 3 0 100-6 3 3 0 000 6z" />
                                </svg>
                            </a>
                            <a href="https://tiktok.com/@tu-usuario" target="_blank" rel="noopener noreferrer"
                                class="text-landing-text-soft transition-colors hover:text-landing-text" aria-label="TikTok de {{ $barbero['nombre'] }}">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.525 20.25c5.25 0 8.475-2.025 8.475-5.25 0-5.25-8.475-6.75-8.475-9.75 0-2.1 1.65-3.15 3.375-3.3M12.525 20.25c-2.5 0-4.125-1.9-4.125-4.725 0-5.475 8.475-6.15 8.475-10.875 0-1.275-.45-2.25-1.575-2.25" />
                                </svg>
                            </a>
                        </div>
                        <a href="{{ route('booking') }}" class="rounded-full bg-landing-accent/10 px-4 py-2 text-xs font-medium text-landing-text transition-all hover:bg-landing-accent hover:text-landing-accent-foreground">
                            Reservar +
                        </a>
                    </div>
                </article>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Sección de Servicios --}}
    <section id="servicios" class="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div class="w-full">
            <div class="mx-auto mb-16 max-w-2xl space-y-4 text-center">
                <span class="text-sm font-bold tracking-wider text-landing-text/80 uppercase">Nuestros Trabajos</span>
                <h2 class="font-serif text-4xl font-bold text-landing-text md:text-5xl">Servicios y Precios</h2>
                <p class="font-light text-landing-text-soft">
                    Selección de cortes y rituales de aseo diseñados para cada estilo.
                </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                @forelse ($services as $service)
                <article class="group flex flex-col justify-between rounded-3xl border border-landing-border bg-landing-surface/40 p-8 transition-all hover:border-landing-border-strong">
                    <div>
                        <div class="mb-2 text-xs font-light text-landing-text-soft">{{ $service->duration_minutes }} min de sesión</div>
                        <h3 class="mb-3 text-xl font-semibold text-landing-text transition-colors group-hover:text-landing-text/90">{{ $service->name }}</h3>
                        <p class="mb-6 text-sm leading-relaxed font-light text-landing-text-soft">
                            Servicio profesional garantizado por nuestros barberos expertos.
                        </p>
                    </div>
                    <div class="flex items-center justify-between border-t border-landing-border/50 pt-4">
                        <span class="text-2xl font-bold text-landing-text">${{ number_format((float) $service->price, 2) }}</span>
                        <a href="{{ route('booking') }}" class="rounded-xl bg-landing-accent/10 px-4 py-2.5 text-xs font-semibold tracking-wider text-landing-text uppercase transition-all hover:bg-landing-accent hover:text-landing-accent-foreground">
                            Reservar
                        </a>
                    </div>
                </article>
                @empty
                <p class="col-span-full text-center font-light text-landing-text-soft">Próximamente podrás conocer nuestros servicios.</p>
                @endforelse
            </div>
        </div>
    </section>

    {{-- Sección de trabajos --}}
    <section id="trabajos" class="mx-auto max-w-7xl border-t border-landing-border/50 px-6 py-24">
        <div class="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div class="space-y-4">
                <span class="text-sm font-bold tracking-wider text-landing-text/80 uppercase">Cortes Recientes</span>
                <h2 class="font-serif text-4xl font-bold text-landing-text md:text-5xl">Síguenos en Instagram</h2>
                <p class="max-w-xl font-light text-landing-text-soft">
                    Echa un vistazo a los últimos cortes y estilos ejecutados por nuestros barberos. Únete a nuestra comunidad.
                </p>
            </div>
            <div class="flex items-center gap-3">
                <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-xl border border-landing-border bg-landing-accent/5 px-6 py-3 text-sm font-medium text-landing-text transition-all hover:bg-landing-accent/10">
                    <svg class="h-5 w-5 text-landing-text/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m3-3a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                    @tu_barberia
                </a>
                <a href="https://tiktok.com/@tu-usuario" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-xl border border-landing-border bg-landing-accent/5 px-6 py-3 text-sm font-medium text-landing-text transition-all hover:bg-landing-accent/10">
                    <svg class="h-5 w-5 text-landing-text/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12.525 20.25c5.25 0 8.475-2.025 8.475-5.25 0-5.25-8.475-6.75-8.475-9.75 0-2.1 1.65-3.15 3.375-3.3M12.525 20.25c-2.5 0-4.125-1.9-4.125-4.725 0-5.475 8.475-6.15 8.475-10.875 0-1.275-.45-2.25-1.575-2.25" />
                    </svg>
                    @tu_barberia
                </a>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            @foreach ([
                'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop' => 'Corte de cabello',
                'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop' => 'Perfilado de barba',
                'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop' => 'Degradado moderno',
                'https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=800&auto=format&fit=crop' => 'Barbero trabajando en corte',
            ] as $url => $alt)
            <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer"
                class="group relative h-72 overflow-hidden rounded-2xl border border-landing-border">
                <img src="{{ $url }}" alt="{{ $alt }}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                <div class="absolute inset-0 flex items-center justify-center bg-landing-bg/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <span class="rounded-lg border border-landing-border bg-landing-bg/80 px-4 py-2 text-sm font-medium tracking-wide text-landing-text backdrop-blur-md">
                        Ver en Instagram
                    </span>
                </div>
            </a>
            @endforeach
        </div>
    </section>

    {{-- Footer --}}
    <footer class="border-t border-landing-border bg-landing-bg">
        <div class="mx-auto max-w-7xl px-6 py-16">
            <div class="grid gap-12 md:grid-cols-4">
                <div class="space-y-4 md:col-span-2">
                    <div class="flex items-center gap-2">
                        <div class="flex aspect-square size-9 items-center justify-center overflow-hidden rounded-lg border border-landing-border bg-landing-surface">
                            <img src="{{ asset('favicon.png') }}" alt="Logo TuBarbero" class="size-6 object-contain">
                        </div>
                        <span class="text-sm font-black tracking-wider uppercase">TuBarbero</span>
                    </div>
                    <p class="max-w-sm text-sm leading-relaxed font-light text-landing-text-soft">
                        Plataforma de reserva de citas para los mejores barberos de Venezuela. Cortes, barba y tratamientos profesionales al alcance de un clic.
                    </p>
                </div>

                <div>
                    <h3 class="mb-4 text-sm font-semibold text-landing-text">Enlaces</h3>
                    <ul class="space-y-3 text-sm text-landing-text-soft">
                        <li><a href="#nosotros" class="transition-colors hover:text-landing-text">Nosotros</a></li>
                        <li><a href="#barberos" class="transition-colors hover:text-landing-text">Barberos</a></li>
                        <li><a href="#servicios" class="transition-colors hover:text-landing-text">Servicios</a></li>
                        <li><a href="{{ route('booking') }}" class="transition-colors hover:text-landing-text">Reservar cita</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="mb-4 text-sm font-semibold text-landing-text">Horario</h3>
                    <ul class="space-y-3 text-sm text-landing-text-soft">
                        <li>Lunes a Domingo</li>
                        <li>9:00 AM - 8:00 PM</li>
                        <li class="pt-2"><a href="{{ route('login') }}" class="text-landing-text underline underline-offset-4 transition-colors hover:text-landing-text/80">Iniciar sesión</a></li>
                        <li><a href="{{ route('register') }}" class="text-landing-text underline underline-offset-4 transition-colors hover:text-landing-text/80">Regístrate</a></li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-landing-border pt-6 sm:flex-row">
                <p class="text-xs font-light text-landing-muted">© {{ date('Y') }} TuBarbero. Todos los derechos reservados.</p>
                <p class="text-xs font-light text-landing-muted">Hecho con dedicación en Venezuela.</p>
            </div>
        </div>
    </footer>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const toggle = document.getElementById('menu-toggle');
        const menu = document.getElementById('mobile-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', function () {
                const isHidden = menu.classList.toggle('hidden');
                toggle.setAttribute('aria-expanded', String(!isHidden));
            });
        }

        const userToggle = document.getElementById('user-menu-toggle');
        const userDropdown = document.getElementById('user-dropdown');

        if (userToggle && userDropdown) {
            userToggle.addEventListener('click', function (event) {
                event.stopPropagation();
                const isHidden = userDropdown.classList.toggle('hidden');
                userToggle.setAttribute('aria-expanded', String(!isHidden));
            });

            document.addEventListener('click', function (event) {
                if (!userToggle.contains(event.target) && !userDropdown.contains(event.target)) {
                    userDropdown.classList.add('hidden');
                    userToggle.setAttribute('aria-expanded', 'false');
                }
            });

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    userDropdown.classList.add('hidden');
                    userToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
</script>
@endsection
