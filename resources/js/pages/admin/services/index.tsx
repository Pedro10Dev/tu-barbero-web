import { Head, Link, router } from '@inertiajs/react';
import { Briefcase, Plus, Clock, Trash2, Pencil } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

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

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Catálogo de Servicios"
                    description="Servicios ofrecidos en todas las estaciones."
                    actions={
                        <Link
                            href="/admin/services/create"
                            className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90"
                        >
                            <Plus className="size-4" />
                            Nuevo Servicio
                        </Link>
                    }
                />

                {/* Grid de servicios */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
                            Aún no hay servicios registrados.
                        </div>
                    ) : (
                        services.map((service) => (
                            <div
                                key={service.id}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/40"
                            >
                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand" />

                                <div className="space-y-3 pl-2">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                                            <Briefcase className="size-5" />
                                        </div>
                                        <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground">
                                            En catálogo
                                        </span>
                                    </div>

                                    <h3 className="text-base font-semibold text-foreground">
                                        {service.name}
                                    </h3>

                                    <div className="flex items-center gap-4 border-t border-border pt-3 text-xs font-medium text-foreground">
                                        <span className="flex items-center gap-2">
                                            <Clock className="size-3.5 text-muted-foreground" />
                                            {service.duration_minutes} min
                                        </span>
                                        <span className="text-muted-foreground">
                                            •
                                        </span>
                                        <span className="tabular font-semibold text-success">
                                            {formatPrice(service.price)}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 pl-2">
                                    <span className="text-[11px] text-muted-foreground">
                                        {service.appointmentCount} citas
                                        asociadas
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/services/${service.id}/edit`}
                                            className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent"
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
                                            className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/20"
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
