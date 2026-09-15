@extends('layouts.landing')

@section('content')

<div class="overflow-x-hidden">
    <div class="grain-overlay" aria-hidden="true"></div>

    {{-- Header / Navbar con Menú Hamburguesa Funcional --}}
    <header class="js-header fixed inset-x-0 top-0 z-50 h-20 border-b border-landing-border bg-landing-bg/80 backdrop-blur-md">
        <div class="js-progress-bar" aria-hidden="true"></div>
        <nav class="mx-auto flex h-full max-w-7xl items-center justify-between px-6" aria-label="Principal">
            {{-- Logo --}}
            <a href="#inicio" class="flex items-center gap-2">
                <div class="flex aspect-square size-9 items-center justify-center overflow-hidden rounded-lg border border-landing-border bg-landing-surface">
                    <img src="{{ asset('favicon.png') }}" alt="Logo TuBarbero" class="size-6 object-contain">
                </div>
                <span class="text-sm font-black tracking-wider uppercase">TuBarbero</span>
            </a>

            {{-- Links de escritorio --}}
            <div id="nav-links" class="hidden items-center gap-8 md:flex">
                <a href="#inicio" class="relative text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Inicio</a>
                <a href="#nosotros" class="relative text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Nosotros</a>
                <a href="#barberos" class="relative text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Barberos</a>
                <a href="#servicios" class="relative text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Servicios</a>
                <a href="#trabajos" class="relative text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text">Trabajos</a>
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

                        <div id="user-dropdown" class="hidden absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-landing-border bg-landing-surface py-1 shadow-lg">
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
                <h1 class="js-hero-rise font-serif text-5xl leading-[0.95] tracking-tight text-landing-text md:text-7xl" style="--hero-delay:0ms">
                    El Arte del
                    <br>
                    <span class="relative inline-block">
                        Corte Preciso.
                        <span class="absolute -bottom-4 left-0 hidden h-[2px] w-24 bg-landing-success md:block"></span>
                    </span>
                </h1>

                <p class="js-hero-rise mx-auto max-w-2xl text-lg leading-relaxed font-light text-landing-text-soft md:mx-0 md:text-xl" style="--hero-delay:120ms">
                    Domina tu imagen con nuestros maestros barberos. En TuBarbero, cada detalle cuenta para ofrecerte
                    un estilo impecable y una experiencia de relajación inigualable.
                </p>

                <div class="js-hero-rise flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-center md:justify-start" style="--hero-delay:240ms">
                    <a href="{{ route('booking') }}"
                        class="inline-flex w-full items-center justify-center rounded-xl bg-landing-accent px-10 py-5 text-lg font-semibold text-landing-accent-foreground shadow-lg shadow-black/15 transition-all hover:-translate-y-0.5 hover:bg-landing-accent/80 md:w-auto">
                        Reservar Cita Ahora
                    </a>
                    <a href="#barberos"
                        class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-landing-border px-10 py-5 text-base font-medium text-landing-text/80 transition-colors hover:border-landing-border-strong hover:text-landing-text md:w-auto">
                        Conocer a los barberos
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                </div>

                <div class="js-hero-rise flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-landing-border/60 pt-6 font-mono text-xs uppercase tracking-[0.2em] text-landing-muted md:justify-start" style="--hero-delay:360ms">
                    <span class="relative flex items-center gap-2">
                        <span class="relative flex h-2 w-2">
                            <span class="absolute h-full w-full animate-ping rounded-full bg-landing-success opacity-75"></span>
                            <span class="relative h-2 w-2 rounded-full bg-landing-success"></span>
                        </span>
Abierto hoy · 9:00 AM — 8:00 PM
                    </span>
                    <span aria-hidden="true" class="hidden h-px w-6 bg-landing-border-strong sm:block"></span>
                    <span>Naguanagua · Valencia</span>
                </div>
            </div>

            {{-- Imagen Destacada --}}
            <div class="js-hero-image relative h-[400px] w-full overflow-hidden rounded-3xl border border-landing-border shadow-xl md:col-span-5 md:h-[520px]">
                <img src="{{ asset('images/hero-image.jpg') }}" alt="Barbería TuBarbero" class="h-full w-full object-cover">

                <div class="absolute inset-0 bg-gradient-to-t from-landing-bg/70 via-transparent to-transparent"></div>

                <div class="absolute right-5 bottom-5 left-5 md:right-7 md:bottom-7 md:left-7">
                    <div class="flex w-fit items-center gap-3 rounded-xl border border-landing-border bg-landing-bg/80 px-5 py-3 font-mono text-xs uppercase tracking-wider text-landing-text backdrop-blur-md">
                        <span class="relative flex h-2 w-2">
                            <span class="absolute h-full w-full animate-ping rounded-full bg-landing-success opacity-75"></span>
                            <span class="relative h-2 w-2 rounded-full bg-landing-success"></span>
                        </span>
                        Cita asegurada
                    </div>
                </div>
            </div>
        </div>
    </main>

    {{-- Marquee editorial --}}
    <div class="marquee-mask border-y border-landing-border bg-landing-surface/40 py-5" aria-hidden="true">
        <div class="marquee-track font-mono text-xs uppercase tracking-[0.3em] text-landing-muted">
            @php
                $marqueeItems = [
                    'El arte del corte preciso',
                    'Reserva online',
                    'Abierto hoy · 9:00 AM — 8:00 PM',
                    'Naguanagua · Valencia',
                    'Barberos maestros',
                    'Puntualidad exacta',
                ];
            @endphp
            @for ($g = 0; $g < 2; $g++)
                <div class="flex shrink-0 items-center gap-10 pr-10">
                    @foreach ($marqueeItems as $item)
                        <span class="shrink-0">{{ $item }}</span>
                        <span class="h-px w-6 shrink-0 bg-landing-border-strong"></span>
                    @endforeach
                    <span class="bg-landing-success/80 text-landing-bg px-2 py-1">TuBarbero</span>
                </div>
            @endfor
        </div>
    </div>

    {{-- Sección Nosotros --}}
    <section id="nosotros" class="relative flex min-h-screen items-center border-b border-landing-border/50 bg-landing-bg py-24">
        <div class="mx-auto w-full max-w-7xl px-6">
            <div class="grid items-start gap-16 md:grid-cols-5">
                <div class="js-reveal space-y-5 text-center md:col-span-2 md:text-left">
                    <span class="inline-flex items-baseline gap-3">
                        <span class="h-px w-8 bg-landing-border-strong"></span>
                        <span class="font-mono text-xs uppercase tracking-[0.3em] text-landing-muted">Nosotros</span>
                    </span>
                    <h2 class="font-serif text-4xl leading-tight tracking-tight text-landing-text md:text-5xl">
                        Más que un corte, una experiencia.
                    </h2>
                    <p class="leading-relaxed font-light text-landing-text-soft">
                        No solo nos dedicamos a cortar el cabello; nos aseguramos de que salgas renovado, con confianza
                        y estilo. Utilizamos productos de primera calidad.
                    </p>
                </div>

                <div class="border-t border-landing-border md:col-span-3">
                    @php
                        $pilares = [
                            [
                                'titulo' => 'Agenda 100% Online',
                                'texto' => 'Reserva, reprograma o cancela tu cita desde cualquier dispositivo y en cualquier momento.',
                                'icono' => '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />',
                            ],
                            [
                                'titulo' => 'Barberos Maestros',
                                'texto' => 'Nuestro equipo está formado por profesionales con años de experiencia en tendencias actuales.',
                                'icono' => '<path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0121 12a8.966 8.966 0 01-3.018 6.725zM12 9a3 3 0 100-6 3 3 0 000 6z" />',
                            ],
                            [
                                'titulo' => 'Productos Premium',
                                'texto' => 'Utilizamos y recomendamos solo las mejores marcas de cuidado capilar y barba del mercado.',
                                'icono' => '<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />',
                            ],
                            [
                                'titulo' => 'Puntualidad Exacta',
                                'texto' => 'Respetamos tu tiempo. Tu barbero estará listo exactamente a la hora acordada sin esperas.',
                                'icono' => '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />',
                            ],
                        ];
                    @endphp
                    @foreach ($pilares as $index => $pilar)
                        <div class="js-reveal group flex items-start gap-4 border-b border-landing-border py-7 first:border-t-0 sm:gap-6"
                            style="--reveal-delay:{{ 60 + $index * 80 }}ms">
                            <div class="flex size-12 shrink-0 items-center justify-center rounded-xl border border-landing-border bg-landing-accent/5 text-landing-text transition-colors group-hover:border-landing-border-strong">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    {!! $pilar['icono'] !!}
                                </svg>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-serif text-2xl tracking-tight text-landing-text">{{ $pilar['titulo'] }}</h3>
                                <p class="mt-2 text-sm leading-relaxed font-light text-landing-text-soft">
                                    {{ $pilar['texto'] }}
                                </p>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    {{-- Sección de Barberos --}}
    <section id="barberos" class="relative border-b border-landing-border/50 bg-landing-bg py-24">
        <div class="mx-auto max-w-7xl px-6">
            <div class="js-reveal mx-auto mb-16 max-w-xl text-center">
                <span class="inline-flex items-baseline gap-3">
                    <span class="h-px w-8 bg-landing-border-strong"></span>
                    <span class="font-mono text-xs uppercase tracking-[0.3em] text-landing-muted">Profesionales</span>
                </span>
                <h2 class="mt-3 font-serif text-4xl tracking-tight text-landing-text md:text-5xl">Nuestros Barberos</h2>
                <p class="mt-3 text-sm font-light text-landing-text-soft">
                    Conoce al equipo encargado de llevar tu estilo al siguiente nivel.
                </p>
            </div>

            <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                @php
                    $socialIcons = [
                        'instagram' => ['<path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>'],
                        'tiktok' => ['<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>'],
                        'facebook' => ['<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>'],
                        'whatsapp' => ['<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>'],
                        'youtube' => ['<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>'],
                        'x' => ['<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>'],
                    ];
                @endphp

                @forelse ($barbers as $barbero)
                <article class="js-reveal group flex flex-col justify-between rounded-3xl border border-landing-border bg-landing-surface p-5 transition-all hover:border-landing-border-strong"
                    style="--reveal-delay:{{ $loop->iteration * 90 }}ms">
                    <div>
                        <div class="mb-6 h-72 overflow-hidden rounded-2xl border border-landing-border bg-landing-surface-strong">
                            <img src="{{ $barbero->photo_url }}" alt="Foto de {{ $barbero->display_name }}" loading="lazy"
                                class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110">
                        </div>

                        <div class="mb-1 flex items-center justify-between">
                            <span class="font-mono text-xs uppercase tracking-widest text-landing-muted">B.{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
                            <svg class="h-5 w-5 fill-current text-landing-success" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>

                        <h3 class="font-serif text-2xl tracking-tight text-landing-text">{{ $barbero->display_name }}</h3>
                        <p class="mb-6 mt-2 text-sm leading-relaxed font-light text-landing-text-soft">{{ $barbero->bio }}</p>
                    </div>

                    <div class="flex items-center justify-between border-t border-landing-border pt-4">
                        <div class="flex items-center gap-3">
                            @forelse ($barbero->social_links ?? [] as $social)
                                @if (isset($socialIcons[$social['platform']]))
                                    <a href="{{ $social['url'] }}" target="_blank" rel="noopener noreferrer"
                                        class="text-landing-text-soft transition-colors hover:text-landing-text" aria-label="{{ $social['platform'] }} de {{ $barbero->display_name }}">
<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            {!! $socialIcons[$social['platform']][0] !!}
                                        </svg>
                                    </a>
                                @endif
                            @empty
                                <span class="text-xs font-light text-landing-text-soft">Sin redes aún</span>
                            @endforelse
                        </div>
                        <a href="{{ route('booking') }}" class="rounded-lg bg-landing-accent/10 px-4 py-2 text-xs font-medium text-landing-text transition-all hover:bg-landing-accent hover:text-landing-accent-foreground">
                        Reservar
                        </a>
                    </div>
                </article>
                @empty
                <div class="rounded-3xl border border-landing-border bg-landing-surface py-16 text-center text-sm font-light text-landing-text-soft md:col-span-3">
                    Próximamente conocerás a nuestro equipo de barberos.
                </div>
                @endforelse
            </div>
        </div>
    </section>

    {{-- Sección de Servicios (lista-preciario editorial) --}}
    <section id="servicios" class="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
        <div class="w-full">
            <div class="js-reveal mx-auto mb-14 max-w-2xl space-y-4 text-center">
                <span class="inline-flex items-baseline gap-3">
                    <span class="h-px w-8 bg-landing-border-strong"></span>
                    <span class="font-mono text-xs uppercase tracking-[0.3em] text-landing-muted">Servicios</span>
                </span>
                <h2 class="font-serif text-4xl tracking-tight text-landing-text md:text-5xl">Servicios y Precios</h2>
                <p class="font-light text-landing-text-soft">
                    Selección de cortes y rituales de aseo diseñados para cada estilo.
                </p>
            </div>

            <div class="js-reveal overflow-hidden rounded-3xl border border-landing-border bg-landing-surface/40">
                @forelse ($services as $service)
                <a href="{{ route('booking') }}" class="group flex items-center gap-4 border-b border-landing-border px-6 py-6 transition-all hover:bg-landing-surface sm:gap-6 sm:px-8"
                    style="--reveal-delay:{{ 60 + $loop->iteration * 70 }}ms">
                    <span class="font-mono text-xs text-landing-muted tabular">{{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}</span>
                    <div class="min-w-0 flex-1">
                        <h3 class="font-serif text-2xl tracking-tight text-landing-text sm:text-3xl">{{ $service->name }}</h3>
                        <span class="mt-1 block font-mono text-xs uppercase tracking-widest text-landing-muted tabular">{{ $service->duration_minutes }} MIN DE SESIÓN</span>
                    </div>
                    <div class="hidden items-baseline gap-6 sm:flex">
                        <span class="font-mono text-xl text-landing-text tabular">${{ number_format((float) $service->price, 2) }}</span>
                        <svg class="h-5 w-5 text-landing-muted transition-all group-hover:translate-x-1 group-hover:text-landing-text" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                    <span class="font-mono text-lg text-landing-text tabular sm:hidden">${{ number_format((float) $service->price, 2) }}</span>
                </a>
                @empty
                <p class="py-16 text-center font-light text-landing-text-soft">Próximamente podrás conocer nuestros servicios.</p>
                @endforelse

                <div class="js-reveal flex flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8">
                    <p class="font-mono text-xs uppercase tracking-[0.2em] text-landing-muted">
                        Tu barbero te atenderá sin esperas
                    </p>
                    <a href="{{ route('booking') }}" class="inline-flex w-full items-center justify-center rounded-xl bg-landing-accent px-8 py-4 text-base font-semibold text-landing-accent-foreground transition-all hover:bg-landing-accent/80 sm:w-auto">
                        Reservar mi cita
                    </a>
                </div>
            </div>
        </div>
    </section>

    {{-- Sección de trabajos --}}
    <section id="trabajos" class="mx-auto max-w-7xl border-t border-landing-border/50 px-6 py-24">
        <div class="js-reveal mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div class="space-y-4">
                <span class="inline-flex items-baseline gap-3">
                    <span class="h-px w-8 bg-landing-border-strong"></span>
                    <span class="font-mono text-xs uppercase tracking-[0.3em] text-landing-muted">Cortes recientes</span>
                </span>
                <h2 class="font-serif text-4xl tracking-tight text-landing-text md:text-5xl">Síguenos en Instagram</h2>
                <p class="max-w-xl font-light text-landing-text-soft">
                    Echa un vistazo a los últimos cortes y estilos ejecutados por nuestros barberos. Únete a nuestra comunidad.
                </p>
            </div>
            <div class="flex items-center gap-3">
                <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-xl border border-landing-border bg-landing-accent/5 px-6 py-3 text-sm font-medium text-landing-text transition-all hover:bg-landing-accent/10">
                    <svg class="h-5 w-5 text-landing-text/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                    @tu_barberia
                </a>
                <a href="https://tiktok.com/@tu-usuario" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 rounded-xl border border-landing-border bg-landing-accent/5 px-6 py-3 text-sm font-medium text-landing-text transition-all hover:bg-landing-accent/10">
                    <svg class="h-5 w-5 text-landing-text/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                    @tu_barberia
                </a>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            @php
                $works = [
                    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop' => 'Corte de cabello',
                    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop' => 'Perfilado de barba',
                    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop' => 'Degradado moderno',
                    'https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=800&auto=format&fit=crop' => 'Barbero trabajando en corte',
                ];
            @endphp
            @foreach ($works as $url => $alt)
            <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer"
                class="js-reveal group relative h-72 overflow-hidden rounded-2xl border border-landing-border"
                style="--reveal-delay:{{ $loop->iteration * 80 }}ms">
                <img src="{{ $url }}" alt="{{ $alt }}" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110">
                <div class="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-landing-bg/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span class="text-sm font-medium tracking-wide text-landing-text">{{ $alt }}</span>
                    <span class="rounded-lg border border-landing-border bg-landing-bg/80 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-landing-text backdrop-blur-md">
                        Instagram
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
                    <h3 class="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-landing-text">Enlaces</h3>
                    <ul class="space-y-3 text-sm text-landing-text-soft">
                        <li><a href="#nosotros" class="transition-colors hover:text-landing-text">Nosotros</a></li>
                        <li><a href="#barberos" class="transition-colors hover:text-landing-text">Barberos</a></li>
                        <li><a href="#servicios" class="transition-colors hover:text-landing-text">Servicios</a></li>
                        <li><a href="{{ route('booking') }}" class="transition-colors hover:text-landing-text">Reservar cita</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-landing-text">Horario</h3>
                    <ul class="space-y-3 text-sm text-landing-text-soft">
                        <li>Lunes a Domingo</li>
                        <li class="font-mono text-xs tracking-widest text-landing-muted tabular">9:00 AM — 8:00 PM</li>
                        <li class="pt-2"><a href="{{ route('login') }}" class="text-landing-text underline underline-offset-4 transition-colors hover:text-landing-text/80">Iniciar sesión</a></li>
                        <li><a href="{{ route('register') }}" class="text-landing-text underline underline-offset-4 transition-colors hover:text-landing-text/80">Regístrate</a></li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-landing-border pt-6 sm:flex-row">
                <p class="font-mono text-xs text-landing-muted">© {{ date('Y') }} TuBarbero · Todos los derechos reservados.</p>
                <p class="font-mono text-xs uppercase tracking-[0.2em] text-landing-muted">Hecho con dedicación en Venezuela</p>
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