import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function Landing({ services = [] }: { services: any[] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen overflow-x-hidden bg-zinc-950 text-white">
            <Head title="Tu Barbero - Reserva tu Cita" />

            {/* Header / Navbar con Menú Hamburguesa Funcional */}
            <Navbar />

            {/* Hero Section */}
            <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-12">
                <div className="flex w-full flex-col-reverse items-center gap-12 md:grid md:grid-cols-12">
                    {/* Texto Principal */}
                    <div className="space-y-8 text-center md:col-span-7 md:text-left">
                        <h1 className="font-serif text-5xl leading-[0.95] font-extrabold tracking-tight text-white md:text-8xl">
                            El Arte del <br />
                            <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                                Corte Preciso.
                            </span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-zinc-400 md:mx-0 md:text-xl">
                            Domina tu imagen con nuestros maestros barberos. En
                            Barbería Studio, cada detalle cuenta para ofrecerte
                            un estilo impecable y una experiencia de relajación
                            inigualable.
                        </p>

                        <div className="pt-4">
                            <Link
                                href="/booking"
                                className="inline-flex w-full items-center justify-center rounded-xl bg-white px-10 py-5 text-lg font-semibold text-zinc-950 shadow-xl shadow-white/5 transition-all hover:bg-zinc-200 md:w-auto"
                            >
                                Reservar Cita Ahora
                            </Link>
                        </div>
                    </div>

                    {/* Imagen Destacada */}
                    <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:col-span-5 md:h-[500px]">
                        {/* Nota: En React/Vite/Laravel es común usar rutas públicas directas o assets */}
                        <img
                            src="/images/hero-image.jpg"
                            alt="Barbería"
                            className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-40"></div>

                        <div className="absolute right-6 bottom-6 left-6 md:right-8 md:bottom-8 md:left-8">
                            <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/80 px-5 py-3.5 backdrop-blur-md">
                                <div className="relative flex h-2.5 w-2.5">
                                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                                </div>
                                <span className="text-sm font-medium text-white">
                                    Abierto hoy hasta las 8:00 PM
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Sección Nosotros */}
            <section
                id="nosotros"
                className="relative flex min-h-screen items-center border-y border-white/5 bg-zinc-950 py-24"
            >
                <div className="mx-auto w-full max-w-7xl px-6">
                    <div className="grid items-center gap-16 md:grid-cols-5">
                        <div className="space-y-5 text-center md:col-span-2 md:text-left">
                            <span className="text-sm font-bold tracking-wider text-white/80 uppercase">
                                Excelencia y Detalle
                            </span>
                            <h2 className="font-serif text-4xl leading-tight font-bold text-white md:text-5xl">
                                Más que un corte, una experiencia.
                            </h2>
                            <p className="leading-relaxed font-light text-zinc-400">
                                No solo nos dedicamos a cortar el cabello; nos
                                aseguramos de que salgas renovado, con confianza
                                y estilo. Utilizamos productos de primera
                                calidad.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 md:col-span-3">
                            {/* Tarjeta 1 */}
                            <div className="group rounded-3xl border border-white/10 bg-[#09090b] p-8 transition-colors hover:border-white/20">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform group-hover:scale-105">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.2.14m7.6 1.46a1.125 1.125 0 011.125 1.125M12.75 9a1.125 1.125 0 11-2.25 0 11.125 1.125 0 012.25 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-xl font-semibold text-white">
                                    Agenda 100% Online
                                </h4>
                                <p className="text-sm leading-relaxed font-light text-zinc-400">
                                    Reserva, reprograma o cancela tu cita desde
                                    cualquier dispositivo y en cualquier
                                    momento.
                                </p>
                            </div>

                            {/* Tarjeta 2 */}
                            <div className="group rounded-3xl border border-white/10 bg-[#09090b] p-8 transition-colors hover:border-white/20">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform group-hover:scale-105">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0121 12a8.966 8.966 0 01-3.018 6.725zM12 9a3 3 0 100-6 3 3 0 000 6z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-xl font-semibold text-white">
                                    Barberos Maestros
                                </h4>
                                <p className="text-sm leading-relaxed font-light text-zinc-400">
                                    Nuestro equipo está formado por
                                    profesionales con años de experiencia en
                                    tendencias actuales.
                                </p>
                            </div>

                            {/* Tarjeta 3 */}
                            <div className="group rounded-3xl border border-white/10 bg-[#09090b] p-8 transition-colors hover:border-white/20">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform group-hover:scale-105">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-xl font-semibold text-white">
                                    Productos Premium
                                </h4>
                                <p className="text-sm leading-relaxed font-light text-zinc-400">
                                    Utilizamos y recomendamos solo las mejores
                                    marcas de cuidado capilar y barba del
                                    mercado.
                                </p>
                            </div>

                            {/* Tarjeta 4 */}
                            <div className="group rounded-3xl border border-white/10 bg-[#09090b] p-8 transition-colors hover:border-white/20">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-transform group-hover:scale-105">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-xl font-semibold text-white">
                                    Puntualidad Exacta
                                </h4>
                                <p className="text-sm leading-relaxed font-light text-zinc-400">
                                    Respetamos tu tiempo. Tu barbero estará
                                    listo exactamente a la hora acordada sin
                                    esperas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Barberos */}
            <section
                id="barberos"
                className="relative border-y border-white/5 bg-zinc-950 py-24"
            >
                <div className="mx-auto max-w-7xl px-6">
                    {/* Cabecera de la sección */}
                    <div className="mx-auto mb-16 max-w-xl text-center">
                        <span className="text-sm font-bold tracking-wider text-white/80 uppercase">
                            Profesionales
                        </span>
                        <h2 className="mt-2 font-serif text-3xl font-bold text-white md:text-4xl">
                            Nuestros Barberos
                        </h2>
                        <p className="mt-3 text-sm font-light text-zinc-400">
                            Conoce al equipo encargado de llevar tu estilo al
                            siguiente nivel.
                        </p>
                    </div>

                    {/* Grid de tarjetas controlado */}
                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        {/* Card de Barbero 1 */}
                        <div className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#09090b] p-5 transition-all hover:border-white/20">
                            <div>
                                {/* Imagen Superior */}
                                <div className="mb-6 h-72 overflow-hidden rounded-2xl border border-white/10">
                                    <img
                                        src={'/images/barbero-1.jpg'}
                                        alt="Carlos M."
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Nombre e Insignia */}
                                <div className="mb-2 flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-white">
                                        Carlos M.
                                    </h3>
                                    <svg
                                        className="h-5 w-5 fill-current text-emerald-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>

                                {/* Bio */}
                                <p className="mb-6 text-sm leading-relaxed font-light text-zinc-400">
                                    Master Barber enfocado en degradados de alta
                                    precisión y estilos modernos.
                                </p>
                            </div>

                            {/* Redes Sociales y Botón */}
                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com/carlos_barber"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 transition-colors hover:text-white"
                                        aria-label="Instagram de Carlos"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm7.83-8.83a1.5 1.5 0 11-2.12-2.12 1.5 1.5 0 012.12 2.12zM18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://tiktok.com/@carlos_barber"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 transition-colors hover:text-white"
                                        aria-label="TikTok de Carlos"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12a4 4 0 104 4V4a5 5 0 005 5"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                                <a
                                    href="/booking"
                                    className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-zinc-950"
                                >
                                    Reservar +
                                </a>
                            </div>
                        </div>

                        {/* Card de Barbero 2 */}
                        <div className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#09090b] p-5 transition-all hover:border-white/20">
                            <div>
                                <div className="mb-6 h-72 overflow-hidden rounded-2xl border border-white/10">
                                    <img
                                        src={'/images/barbero-2.jpg'}
                                        alt="Luis P."
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="mb-2 flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-white">
                                        Luis P.
                                    </h3>
                                    <svg
                                        className="h-5 w-5 fill-current text-emerald-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>

                                <p className="mb-6 text-sm leading-relaxed font-light text-zinc-400">
                                    Experto en diseño de barba y tratamientos
                                    capilares de cuidado integral.
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com/luis_barber"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 transition-colors hover:text-white"
                                        aria-label="Instagram de Luis"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm7.83-8.83a1.5 1.5 0 11-2.12-2.12 1.5 1.5 0 012.12 2.12zM18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://tiktok.com/@luis_barber"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 transition-colors hover:text-white"
                                        aria-label="TikTok de Luis"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12a4 4 0 104 4V4a5 5 0 005 5"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                                <a
                                    href="/booking"
                                    className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-zinc-950"
                                >
                                    Reservar +
                                </a>
                            </div>
                        </div>

                        {/* Card de Barbero 3 */}
                        <div className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-[#09090b] p-5 transition-all hover:border-white/20">
                            <div>
                                <div className="mb-6 h-72 overflow-hidden rounded-2xl border border-white/10">
                                    <img
                                        src={'/images/barbero-3.jpg'}
                                        alt="Andrés G."
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="mb-2 flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-white">
                                        Andrés G.
                                    </h3>
                                    <svg
                                        className="h-5 w-5 fill-current text-emerald-500"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>

                                <p className="mb-6 text-sm leading-relaxed font-light text-zinc-400">
                                    Dominio absoluto del corte clásico a navaja
                                    y perfiles tradicionales.
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com/andres_barber"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 transition-colors hover:text-white"
                                        aria-label="Instagram de Andrés"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm7.83-8.83a1.5 1.5 0 11-2.12-2.12 1.5 1.5 0 012.12 2.12zM18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z"
                                            ></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://tiktok.com/@andres_barber"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-400 transition-colors hover:text-white"
                                        aria-label="TikTok de Andrés"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12a4 4 0 104 4V4a5 5 0 005 5"
                                            ></path>
                                        </svg>
                                    </a>
                                </div>
                                <a
                                    href="/booking"
                                    className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-white hover:text-zinc-950"
                                >
                                    Reservar +
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Servicios */}
            <section
                id="servicios"
                className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24"
            >
                <div className="w-full">
                    <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
                        <span className="text-sm font-bold tracking-wider text-white/80 uppercase">
                            Nuestros Trabajos
                        </span>
                        <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
                            Servicios y Precios
                        </h2>
                        <p className="font-light text-zinc-400">
                            Selección de cortes y rituales de aseo diseñados
                            para cada estilo.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/40 p-8 transition-all hover:border-white/20"
                            >
                                <div>
                                    <div className="mb-2 text-xs font-light text-zinc-400">
                                        {service.duration_minutes} min de sesión
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-white transition-colors group-hover:text-zinc-200">
                                        {service.name}
                                    </h3>
                                    <p className="mb-6 text-sm leading-relaxed font-light text-zinc-400">
                                        Servicio profesional garantizado por
                                        nuestros barberos expertos.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <span className="text-2xl font-bold text-white">
                                        ${Number(service.price).toFixed(2)}
                                    </span>
                                    <a
                                        href="/booking"
                                        className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-all hover:bg-white hover:text-zinc-950"
                                    >
                                        Reservar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección de trabajos */}
            <section
                id="trabajos"
                className="mx-auto max-w-7xl border-t border-white/5 px-6 py-24"
            >
                <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="space-y-4">
                        <span className="text-sm font-bold tracking-wider text-white/80 uppercase">
                            Cortes Recientes
                        </span>
                        <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
                            Síguenos en Instagram
                        </h2>
                        <p className="max-w-xl font-light text-zinc-400">
                            Echa un vistazo a los últimos cortes y estilos
                            ejecutados por nuestros barberos. Únete a nuestra
                            comunidad.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Botón Instagram */}
                        <a
                            href="https://instagram.com/tu-usuario"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                        >
                            <svg
                                className="h-5 w-5 text-zinc-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm7.83-8.83a1.5 1.5 0 11-2.12-2.12 1.5 1.5 0 012.12 2.12zM18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z"
                                ></path>
                            </svg>
                            @tu_barberia
                        </a>

                        {/* Botón TikTok */}
                        <a
                            href="https://tiktok.com/@tu-usuario"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                        >
                            <svg
                                className="h-5 w-5 text-zinc-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12a4 4 0 104 4V4a5 5 0 005 5"
                                ></path>
                            </svg>
                            @tu_barberia
                        </a>
                    </div>
                </div>

                {/* Grid de Fotos Estilo Instagram */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {/* Foto 1 */}
                    <a
                        href="https://instagram.com/tu-usuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-72 overflow-hidden rounded-2xl border border-white/10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
                            alt="Corte de cabello"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2 text-sm font-medium tracking-wide text-white backdrop-blur-md">
                                Ver en Instagram
                            </span>
                        </div>
                    </a>
                    {/* Foto 2 */}
                    <a
                        href="https://instagram.com/tu-usuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-72 overflow-hidden rounded-2xl border border-white/10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop"
                            alt="Perfilado de barba"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2 text-sm font-medium tracking-wide text-white backdrop-blur-md">
                                Ver en Instagram
                            </span>
                        </div>
                    </a>
                    {/* Foto 3 */}
                    <a
                        href="https://instagram.com/tu-usuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-72 overflow-hidden rounded-2xl border border-white/10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop"
                            alt="Degradado moderno"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2 text-sm font-medium tracking-wide text-white backdrop-blur-md">
                                Ver en Instagram
                            </span>
                        </div>
                    </a>
                    {/* Foto 4 */}
                    <a
                        href="https://instagram.com/tu-usuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative h-72 overflow-hidden rounded-2xl border border-white/10"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=800&auto=format&fit=crop"
                            alt="Barbero trabajando en corte"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <span className="rounded-lg border border-white/10 bg-zinc-950/80 px-4 py-2 text-sm font-medium tracking-wide text-white backdrop-blur-md">
                                Ver en Instagram
                            </span>
                        </div>
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
