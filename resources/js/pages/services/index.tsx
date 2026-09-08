import { Head } from '@inertiajs/react';
import { Scissors, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

type Service = {
    id: number;
    name: string;
    duration_minutes: number;
    price: number;
    isOffered: boolean;
};

function formatPrice(price: number): string {
    return `$${Number(price).toFixed(2)}`;
}

export default function ServicesIndex({ services }: { services: Service[] }) {
    // Nota: los servicios son genéricos y los realizan todos los barberos.
    // Por el momento isOffered siempre es true desde el backend (sin columna is_active).
    const activeCount = services.filter((s) => s.isOffered).length;

    return (
        <>
            <Head title="Mis Servicios" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera y Resumen Superior */}
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <Scissors className="size-6 text-zinc-400" />
                            Catálogo de Especialidades
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Los servicios ofrecidos en tu estación de trabajo.
                        </p>
                    </div>

                    {/* Tarjeta de Resumen Rápido */}
                    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                            <ShieldCheck className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-zinc-400">
                                Servicios Activos
                            </span>
                            <span className="text-base font-bold text-white">
                                {activeCount}{' '}
                                <span className="text-xs font-normal text-zinc-500">
                                    de {services.length} disponibles
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grid de Servicios */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/40 p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-zinc-600"
                        >
                            {/* Barra indicadora lateral */}
                            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />

                            <div className="space-y-4 pl-2">
                                {/* Cabecera de la tarjeta */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1.5">
                                        <span className="block text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                                            Tarifa Estándar
                                        </span>
                                        <h3 className="text-base font-semibold tracking-tight text-white transition-colors group-hover:text-zinc-100">
                                            {service.name}
                                        </h3>
                                    </div>

                                    {/* Estado Badge */}
                                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                                        <CheckCircle2 className="size-3" />
                                        Ofreciendo
                                    </span>
                                </div>

                                <p className="text-xs leading-relaxed text-zinc-400">
                                    Servicio disponible para reserva por la web.
                                </p>

                                {/* Duración y Precio */}
                                <div className="flex items-center gap-4 border-t border-zinc-800/60 pt-2.5 text-xs font-medium text-zinc-300">
                                    <span className="flex items-center gap-2">
                                        <Clock className="size-3.5 text-zinc-500" />
                                        Duración:{' '}
                                        <strong className="font-semibold text-white">
                                            {service.duration_minutes} min
                                        </strong>
                                    </span>
                                    <span className="text-zinc-500">•</span>
                                    <span>
                                        Precio:{' '}
                                        <strong className="font-semibold text-emerald-400">
                                            {formatPrice(service.price)}
                                        </strong>
                                    </span>
                                </div>
                            </div>

                            {/* Pie de tarjeta */}
                            <div className="mt-6 flex items-center justify-between border-t border-zinc-800/40 pt-4 pl-2">
                                <span className="text-[11px] font-medium text-zinc-500">
                                    Visible en agenda
                                </span>
                                <CheckCircle2 className="size-4 text-emerald-500/80" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
