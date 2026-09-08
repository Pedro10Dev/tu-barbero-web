import { Head, Link, router } from '@inertiajs/react';
import { Briefcase, Plus, Clock, Trash2, Pencil } from 'lucide-react';

type Service = {
    id: number;
    name: string;
    duration_minutes: number;
    price: number;
    appointmentCount: number;
};

function formatPrice(price: number): string {
    return `$${Number(price).toFixed(2)}`;
}

export default function AdminServices({ services }: { services: Service[] }) {
    const destroy = (id: number, name: string) => {
        if (window.confirm(`¿Eliminar el servicio "${name}"?`)) {
            router.delete(`/admin/services/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Servicios" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera */}
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <Briefcase className="size-6 text-zinc-400" />
                            Catálogo de Servicios
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Servicios ofrecidos en todas las estaciones.
                        </p>
                    </div>

                    <Link
                        href="/admin/services/create"
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-200"
                    >
                        <Plus className="size-4" />
                        Nuevo Servicio
                    </Link>
                </div>

                {/* Grid de servicios */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.length === 0 ? (
                        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500 md:col-span-2 lg:col-span-3">
                            Aún no hay servicios registrados.
                        </div>
                    ) : (
                        services.map((service) => (
                            <div
                                key={service.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-zinc-700"
                            >
                                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]" />

                                <div className="space-y-3 pl-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                                            <Briefcase className="size-5" />
                                        </div>
                                        <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-400">
                                            En catálogo
                                        </span>
                                    </div>

                                    <h3 className="text-base font-semibold text-white">
                                        {service.name}
                                    </h3>

                                    <div className="flex items-center gap-4 border-t border-zinc-800/60 pt-3 text-xs font-medium text-zinc-300">
                                        <span className="flex items-center gap-2">
                                            <Clock className="size-3.5 text-zinc-500" />
                                            {service.duration_minutes} min
                                        </span>
                                        <span className="text-zinc-500">•</span>
                                        <span className="font-semibold text-emerald-400">
                                            {formatPrice(service.price)}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-4 pl-2">
                                    <span className="text-[11px] text-zinc-500">
                                        {service.appointmentCount} citas
                                        asociadas
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/services/${service.id}/edit`}
                                            className="flex items-center gap-1.5 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                                        >
                                            <Pencil className="size-3.5" />
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() =>
                                                destroy(
                                                    service.id,
                                                    service.name,
                                                )
                                            }
                                            className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                                        >
                                            <Trash2 className="size-3.5" />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
