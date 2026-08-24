import { Link, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { dashboard, logout, booking } from '@/routes';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Obtenemos el usuario autenticado desde las props compartidas de Inertia por seguridad
    const { auth } = usePage().props as { auth?: { user?: any } };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () =>
            document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
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
                <div className="flex items-center gap-4">
                    <Link
                        href={booking().url}
                        className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200 sm:px-4"
                    >
                        <span className="sm:hidden">Agendar</span>
                        <span className="hidden sm:inline">Agendar cita</span>
                    </Link>

                    {auth?.user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-900 focus:outline-none sm:flex"
                            >
                                <span>{auth.user.name}</span>
                                <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="ring-opacity-5 absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-white/10 bg-zinc-900 py-1 shadow-2xl ring-1 ring-black focus:outline-none">
                                    {auth.user?.role === 'client' && (
                                        <Link
                                            href="/client/profile"
                                            className="block px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                                        >
                                            Información personal
                                        </Link>
                                    )}

                                    {auth.user.role &&
                                        auth.user.role !== 'client' &&
                                        auth.user.role?.value !== 'client' && (
                                            <Link
                                                href={dashboard().url}
                                                className="block px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                                                onClick={() =>
                                                    setDropdownOpen(false)
                                                }
                                            >
                                                Administración
                                            </Link>
                                        )}

                                    <Link
                                        href={logout.url()}
                                        method="post"
                                        as="button"
                                        className="block w-full px-4 py-2.5 text-left text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Cerrar sesión
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                        >
                            Acceder
                        </Link>
                    )}
                </div>
            </div>

            {/* Menú Desplegable Móvil (Opcional pero recomendado para que el botón hamburguesa funcione) */}
            {mobileMenuOpen && (
                <div className="space-y-3 border-b border-white/5 bg-zinc-950 px-6 py-4 md:hidden">
                    <a
                        href="/#nosotros"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                    >
                        Nosotros
                    </a>
                    <a
                        href="/#barberos"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                    >
                        Equipo
                    </a>
                    <a
                        href="/#servicios"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                    >
                        Servicios
                    </a>
                    <a
                        href="/#trabajos"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1 text-sm text-zinc-400 hover:text-white"
                    >
                        Trabajos
                    </a>
                    <div className="space-y-2 border-t border-white/5 pt-3">
                        {auth?.user ? (
                            <>
                                {/* Mostrar Mi Panel solo si NO es cliente */}
                                <div className="inline-block rounded-lg border border-white/5 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200">
                                    {auth.user.name}
                                </div>
                                {auth.user?.role === 'client' && (
                                    <Link
                                        href="/client/profile"
                                        className="block py-1 text-sm text-zinc-300 hover:text-white"
                                    >
                                       Información personal
                                    </Link>
                                )}

                                {auth.user.role &&
                                    auth.user.role !== 'client' &&
                                    auth.user.role?.value !== 'client' && (
                                        <Link
                                            href={dashboard().url}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="block py-1 text-sm text-zinc-300 hover:text-white"
                                        >
                                            Administración
                                        </Link>
                                    )}

                                {/* Botón de Cerrar sesión visible para cualquier usuario autenticado */}

                                <Link
                                    href={logout().url}
                                    method="post"
                                    as="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full py-1 text-left text-sm text-zinc-300 hover:text-white"
                                >
                                    Cerrar sesión
                                </Link>
                            </>
                        ) : null}
                    </div>
                </div>
            )}
        </header>
    );
}
