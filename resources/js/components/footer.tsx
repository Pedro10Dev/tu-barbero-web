import React from 'react';

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-zinc-950 py-16 text-sm text-zinc-400">
            <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
                {/* Columna de Marca */}
                <div className="space-y-4 md:col-span-1">
                    <h3 className="font-serif text-xl font-bold tracking-wide text-white">
                        Tubarber
                    </h3>
                    <p className="leading-relaxed font-light text-zinc-400">
                        Elevando el estándar del cuidado personal y el estilo
                        clásico con un enfoque moderno.
                    </p>
                    {/* Indicador de estatus para UX/Conversión */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                        <span>Abierto ahora • Citas disponibles</span>
                    </div>
                </div>

                {/* Enlaces Rápidos */}
                <div className="space-y-4">
                    <h4 className="text-xs font-semibold tracking-wider text-white uppercase">
                        Navegación
                    </h4>
                    <ul className="space-y-2.5 font-light">
                        <li>
                            <a
                                href="#servicios"
                                className="rounded transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                            >
                                Servicios
                            </a>
                        </li>
                        <li>
                            <a
                                href="#barberos"
                                className="rounded transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                            >
                                Barberos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#galeria"
                                className="rounded transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                            >
                                Galería
                            </a>
                        </li>
                        <li>
                            <a
                                href="/booking"
                                className="rounded transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                            >
                                Reservar Cita
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Horarios */}
                <div className="space-y-4">
                    <h4 className="text-xs font-semibold tracking-wider text-white uppercase">
                        Horarios
                    </h4>
                    <ul className="space-y-2.5 font-light">
                        <li className="flex items-center justify-between">
                            <span className="text-zinc-400">
                                Lunes - Sábado:
                            </span>
                            <span className="font-medium text-white">
                                9:00 AM - 8:00 PM
                            </span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-zinc-400">Domingo:</span>
                            <span className="font-medium text-white">
                                10:00 AM - 4:00 PM
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Contacto / Redes */}
                <div className="space-y-4">
                    <h4 className="text-xs font-semibold tracking-wider text-white uppercase">
                        Contacto
                    </h4>
                    <p className="font-light text-zinc-400">
                        Naguanagua, Valencia, Venezuela
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href="https://instagram.com/tu-usuario"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                            aria-label="Instagram de la barbería"
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
                            href="https://tiktok.com/@tu-usuario"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition-all hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                            aria-label="TikTok de la barbería"
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
                </div>
            </div>

            {/* Copyright */}
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 px-6 pt-8 text-xs font-light text-zinc-500 md:flex-row">
                <p>
                    © {new Date().getFullYear()} Tubarber. Todos los derechos
                    reservados.
                </p>
                <div className="flex gap-6">
                    <a
                        href="/privacy"
                        className="rounded transition-colors hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                    >
                        Política de Privacidad
                    </a>
                    <a
                        href="/terms"
                        className="rounded transition-colors hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                    >
                        Términos de Servicio
                    </a>
                </div>
            </div>
        </footer>
    );
}
