import { Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, Briefcase } from 'lucide-react';

type ServiceRecord = {
    id: number;
    name: string;
    duration_minutes: number;
    price: number;
};

export default function ServiceForm({
    service,
}: {
    service?: ServiceRecord | null;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: service?.name ?? '',
        duration_minutes: String(service?.duration_minutes ?? 30),
        price: service?.price != null ? service.price.toFixed(2) : '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (service) {
            put(`/admin/services/${service.id}`);
        } else {
            post('/admin/services');
        }
    };

    const handleDurationChange = (value: string) => {
        if (/^\d{0,4}$/.test(value)) {
            setData('duration_minutes', value);
        }
    };

    const handlePriceChange = (value: string) => {
        if (/^\d{0,6}(\.\d{0,2})?$/.test(value)) {
            setData('price', value);
        }
    };

    const inputClass =
        'w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none';
    const labelClass =
        'mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase';

    return (
        <>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6 lg:p-8">
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <Briefcase className="size-6 text-zinc-400" />
                            {service ? 'Editar Servicio' : 'Nuevo Servicio'}
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Los servicios publicados están disponibles para
                            reserva web.
                        </p>
                    </div>

                    <Link
                        href="/admin/services"
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                    >
                        <ChevronLeft className="size-4" />
                        Volver
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="flex flex-col gap-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6"
                >
                    <div className="space-y-1">
                        <label className={labelClass} htmlFor="name">
                            Nombre del servicio
                        </label>
                        <input
                            id="name"
                            className={inputClass}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Ej. Corte Clásico / Degradado"
                        />
                        {errors.name && (
                            <p className="text-xs text-rose-400">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label
                                className={labelClass}
                                htmlFor="duration_minutes"
                            >
                                Duración (minutos)
                            </label>
                            <input
                                id="duration_minutes"
                                type="text"
                                inputMode="numeric"
                                className={inputClass}
                                value={data.duration_minutes}
                                onChange={(e) =>
                                    handleDurationChange(e.target.value)
                                }
                                placeholder="30"
                            />
                            {errors.duration_minutes && (
                                <p className="text-xs text-rose-400">
                                    {errors.duration_minutes}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className={labelClass} htmlFor="price">
                                Precio ($)
                            </label>
                            <input
                                id="price"
                                type="text"
                                inputMode="decimal"
                                className={inputClass}
                                value={data.price}
                                onChange={(e) =>
                                    handlePriceChange(e.target.value)
                                }
                                placeholder="0.00"
                            />
                            {errors.price && (
                                <p className="text-xs text-rose-400">
                                    {errors.price}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-zinc-800/60 pt-5">
                        <Link
                            href="/admin/services"
                            className="rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50"
                        >
                            <Save className="size-4" />
                            {processing
                                ? 'Guardando...'
                                : service
                                  ? 'Guardar cambios'
                                  : 'Crear servicio'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
