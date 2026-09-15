import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { booking, dashboard, logout } from '@/routes';

export default function LandingNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    const navLinks = [
        { href: '/#inicio', label: 'Inicio' },
        { href: '/#nosotros', label: 'Nosotros' },
        { href: '/#barberos', label: 'Barberos' },
        { href: '/#servicios', label: 'Servicios' },
        { href: '/#trabajos', label: 'Trabajos' },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-landing-border bg-landing-bg/80 backdrop-blur-md">
            <nav
                className="mx-auto flex h-full max-w-7xl items-center justify-between px-6"
                aria-label="Principal"
            >
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex aspect-square size-9 items-center justify-center overflow-hidden rounded-lg border border-landing-border bg-landing-surface">
                        <img
                            src="/favicon.png"
                            alt="Logo TuBarbero"
                            className="size-6 object-contain"
                        />
                    </div>
                    <span className="text-sm font-black tracking-wider uppercase">
                        TuBarbero
                    </span>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href={booking().url}
                        className="rounded-xl bg-landing-accent px-5 py-2.5 text-sm font-semibold text-landing-accent-foreground transition-all hover:bg-landing-accent/80"
                    >
                        Reservar Cita
                    </Link>

                    {auth?.user ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-landing-text transition-colors hover:bg-landing-accent/10"
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
                                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-landing-border bg-landing-surface py-1 shadow-lg">
                                    {auth.user.roles?.includes('client') ? (
                                        <Link
                                            href="/client/profile"
                                            onClick={() =>
                                                setDropdownOpen(false)
                                            }
                                            className="block px-4 py-2.5 text-sm text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                                        >
                                            Información personal
                                        </Link>
                                    ) : (
                                        <Link
                                            href={dashboard().url}
                                            onClick={() =>
                                                setDropdownOpen(false)
                                            }
                                            className="block px-4 py-2.5 text-sm text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                                        >
                                            Administración
                                        </Link>
                                    )}
                                    <Link
                                        href={logout().url}
                                        method="post"
                                        as="button"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block w-full px-4 py-2.5 text-left text-sm text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                                    >
                                        Cerrar sesión
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="text-sm font-medium text-landing-text/80 transition-colors hover:text-landing-text"
                        >
                            Ingresar
                        </Link>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={mobileMenuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-landing-text transition-colors hover:bg-landing-accent/10 md:hidden"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
            </nav>

            {mobileMenuOpen && (
                <div className="border-t border-landing-border bg-landing-bg/95 backdrop-blur-md md:hidden">
                    <div className="flex flex-col gap-1 px-6 py-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-2 flex flex-col gap-2 border-t border-landing-border pt-4">
                            <Link
                                href={booking().url}
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-xl bg-landing-accent px-3 py-2.5 text-center text-sm font-semibold text-landing-accent-foreground transition-all hover:bg-landing-accent/80"
                            >
                                Reservar Cita
                            </Link>

                            {auth?.user ? (
                                <>
                                    <div className="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text">
                                        {auth.user.name}
                                    </div>
                                    {auth.user.roles?.includes('client') ? (
                                        <Link
                                            href="/client/profile"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                                        >
                                            Información personal
                                        </Link>
                                    ) : (
                                        <Link
                                            href={dashboard().url}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                                        >
                                            Administración
                                        </Link>
                                    )}
                                    <Link
                                        href={logout().url}
                                        method="post"
                                        as="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                                    >
                                        Cerrar sesión
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-xl px-3 py-2 text-center text-sm font-medium text-landing-text/80 transition-colors hover:bg-landing-accent/10 hover:text-landing-text"
                                >
                                    Ingresar
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
