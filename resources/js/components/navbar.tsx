import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Obtenemos el usuario autenticado desde las props compartidas de Inertia por seguridad
    const { auth } = usePage().props as { auth?: { user?: any } };

    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/95 backdrop-blur-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                {/* Izquierda: Botón Menú Móvil + Logo y Nombre */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-1 text-zinc-300 hover:text-white focus:outline-none md:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center gap-3">
                        <span className="rounded-md bg-white px-2.5 py-1 text-sm font-bold text-zinc-950">
                            B
                        </span>
                        <span className="font-serif text-lg tracking-wider text-white">
                            BARBERÍA STUDIO
                        </span>
                    </Link>
                </div>

                {/* Navegación de Escritorio */}
                <nav className="hidden items-center gap-8 md:flex">
                    <a
                        href="/#nosotros"
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                        Nosotros
                    </a>
                    <a
                        href="/#barberos"
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                        Equipo
                    </a>
                    <a
                        href="/#servicios"
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                        Servicios
                    </a>
                    <a
                        href="/#trabajos"
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                        Trabajos
                    </a>
                </nav>

                {/* Derecha: Acciones */}
                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-4 md:flex">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="text-sm text-zinc-300 transition-colors hover:text-white"
                            >
                                Mi Panel
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="text-sm text-zinc-300 transition-colors hover:text-white"
                            >
                                Acceder
                            </Link>
                        )}
                    </div>

                    <Link
                        href="/booking"
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-950 transition duration-300 hover:bg-zinc-200 md:px-5 md:py-2.5 md:text-sm"
                    >
                        <span className="relative z-10">Reservar</span>
                    </Link>
                </div>
            </div>

            {/* Menú Desplegable Móvil (Opcional pero recomendado para que el botón hamburguesa funcione) */}
            {mobileMenuOpen && (
                <div className="space-y-3 border-b border-white/5 bg-zinc-950 px-6 py-4 md:hidden">
                    <a
                        href="/#servicios"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                    >
                        Servicios
                    </a>
                    <a
                        href="/#barberos"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                    >
                        Equipo
                    </a>
                    <a
                        href="/#trabajos"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                    >
                        Trabajos
                    </a>
                    <div className="border-t border-white/5 pt-3">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="block py-1 text-sm text-zinc-300 hover:text-white"
                            >
                                Mi Panel
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="block py-1 text-sm text-zinc-300 hover:text-white"
                            >
                                Acceder
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
