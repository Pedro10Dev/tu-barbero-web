import { Link } from '@inertiajs/react';

export default function LandingFooter() {
    return (
        <footer className="border-t border-landing-border bg-landing-bg">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="space-y-4 md:col-span-2">
                        <div className="flex items-center gap-2">
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
                        </div>
                        <p className="max-w-sm text-sm leading-relaxed font-light text-landing-text-soft">
                            Plataforma de reserva de citas para los mejores
                            barberos de Venezuela. Cortes, barba y tratamientos
                            profesionales al alcance de un clic.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 font-mono text-xs tracking-[0.25em] text-landing-text uppercase">
                            Enlaces
                        </h3>
                        <ul className="space-y-3 text-sm text-landing-text-soft">
                            <li>
                                <a
                                    href="/#nosotros"
                                    className="transition-colors hover:text-landing-text"
                                >
                                    Nosotros
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#barberos"
                                    className="transition-colors hover:text-landing-text"
                                >
                                    Barberos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/#servicios"
                                    className="transition-colors hover:text-landing-text"
                                >
                                    Servicios
                                </a>
                            </li>
                            <li>
                                <Link
                                    href="/booking"
                                    className="transition-colors hover:text-landing-text"
                                >
                                    Reservar cita
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-mono text-xs tracking-[0.25em] text-landing-text uppercase">
                            Horario
                        </h3>
                        <ul className="space-y-3 text-sm text-landing-text-soft">
                            <li>Lunes a Domingo</li>
                            <li className="tabular font-mono text-xs tracking-widest text-landing-muted">
                                9:00 AM — 8:00 PM
                            </li>
                            <li className="pt-2">
                                <Link
                                    href="/login"
                                    className="text-landing-text underline underline-offset-4 transition-colors hover:text-landing-text/80"
                                >
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="text-landing-text underline underline-offset-4 transition-colors hover:text-landing-text/80"
                                >
                                    Regístrate
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-landing-border pt-6 sm:flex-row">
                    <p className="font-mono text-xs text-landing-muted">
                        © {new Date().getFullYear()} TuBarbero · Todos los
                        derechos reservados.
                    </p>
                    <p className="font-mono text-xs tracking-[0.2em] text-landing-muted uppercase">
                        Hecho con dedicación en Venezuela
                    </p>
                </div>
            </div>
        </footer>
    );
}
