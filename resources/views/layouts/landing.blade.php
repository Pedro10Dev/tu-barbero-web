<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="index, follow">

    {{-- SEO - Search --}}
    <title>TuBarbero - Reserva tu Cita y Cortes Profesionales en Venezuela</title>
    <meta name="description" content="Reserva tu cita en línea con los mejores barberos de Venezuela. Cortes de cabello, perfilados de barba y tratamientos profesionales. Agena online, atención impecable y estilo premium.">
    <meta name="keywords" content="barbería, barbero, corte de cabello, perfilado de barba, agendar cita, reserva online, barbería Venezuela, barbershop">

    {{-- Canonical --}}
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- Open Graph --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="TuBarbero">
    <meta property="og:title" content="TuBarbero - Reserva tu Cita y Cortes Profesionales en Venezuela">
    <meta property="og:description" content="Reserva tu cita en línea con los mejores barberos de Venezuela. Cortes, barba y tratamientos profesionales.">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ asset('images/hero-image.jpg') }}">
    <meta property="og:locale" content="es_VE">

    {{-- Twitter Cards --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="TuBarbero - Reserva tu Cita y Cortes Profesionales en Venezuela">
    <meta name="twitter:description" content="Reserva tu cita en línea con los mejores barberos de Venezuela. Cortes, barba y tratamientos profesionales.">
    <meta name="twitter:image" content="{{ asset('images/hero-image.jpg') }}">

    {{-- Favicon --}}
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">

    {{-- Datos estructurados (Schema.org) para negocio local --}}
    <script type="application/ld+json">
        {
            "@@context": "https://schema.org",
            "@type": "BarberShop",
            "name": "TuBarbero",
            "description": "Barbería y plataforma de reserva de citas en línea. Cortes de cabello, perfilado de barba y tratamientos profesionales ofrecidos por barberos maestros.",
            "url": "{{ url('/') }}",
            "logo": "{{ asset('favicon.png') }}",
            "image": "{{ asset('images/hero-image.jpg') }}",
            "priceRange": "$$",
            "telephone": "+58-000-000-0000",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "VE"
            },
            "areaServed": {
                "@type": "Country",
                "name": "Venezuela"
            },
            "openingHours": ["Mo-Su 09:00-20:00"],
            "sameAs": [
                "https://instagram.com/tu-usuario",
                "https://tiktok.com/@tu-usuario"
            ]
        }
    </script>

    @fonts

    @vite(['resources/css/app.css'])
</head>

<body class="min-h-screen bg-landing-bg font-sans text-landing-text antialiased">
    @yield('content')
</body>

</html>
