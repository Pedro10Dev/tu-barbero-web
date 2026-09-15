import { Head } from '@inertiajs/react';
import { Scissors, Clock } from 'lucide-react';
import { PageHeader } from '@/components/page-header';

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
    const activeCount = services.filter((service) => service.isOffered).length;

    return (
        <>
            <Head title="Mis Servicios" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Catálogo de Especialidades"
                    description="Los servicios ofrecidos en tu estación de trabajo."
                    actions={
                        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                            <div className="flex size-10 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-brand">
                                <Scissors className="size-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Servicios
                                </span>
                                <span className="tabular text-base font-bold text-foreground">
                                    {activeCount}{' '}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        ofrecidos
                                    </span>
                                </span>
                            </div>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/25"
                        >
                            <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand" />

                            <div className="space-y-4 pl-2">
                                <div className="space-y-1.5">
                                    <span className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                                        Tarifa Estándar
                                    </span>
                                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                                        {service.name}
                                    </h3>
                                </div>

                                <p className="text-xs leading-relaxed text-muted-foreground">
                                    Servicio disponible para reserva por la web.
                                </p>

                                <div className="flex items-center gap-4 border-t border-border pt-2.5 text-xs font-medium text-foreground">
                                    <span className="flex items-center gap-2">
                                        <Clock className="size-3.5 text-muted-foreground" />
                                        {service.duration_minutes} min
                                    </span>
                                    <span className="text-muted-foreground">
                                        •
                                    </span>
                                    <span className="tabular font-semibold text-brand">
                                        {formatPrice(service.price)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 pl-2">
                                <span className="text-[11px] font-medium text-muted-foreground">
                                    Visible en agenda
                                </span>
                                <span className="h-1.5 w-1.5 rounded-full bg-success"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
