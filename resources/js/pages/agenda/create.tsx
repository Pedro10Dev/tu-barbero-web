import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CalendarPlus, Scissors, Clock } from 'lucide-react';
import { useRef, useState } from 'react';
import { formatTimeAMPM } from '@/lib/utils';

type Service = {
    id: number;
    name: string;
    duration_minutes: number;
    price: number;
};

export default function AgendaCreate({
    services,
    barberProfileId,
}: {
    services: Service[];
    barberProfileId: number | null;
}) {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        date: today,
        time: '',
        client_name: '',
        client_phone: '',
        notes: '',
    });

    const [slots, setSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const requestId = useRef(0);

    const loadSlots = async (serviceId: string, date: string) => {
        const current = ++requestId.current;

        if (serviceId === '' || !date || barberProfileId === null) {
            setSlots([]);
            setLoadingSlots(false);

            return;
        }

        setLoadingSlots(true);
        setSlots([]);

        try {
            const response = await fetch(
                `/api/booking/availability?date=${date}&service_id=${serviceId}&barber_profile_id=${barberProfileId}`,
            );
            const result = await response.json();

            if (current === requestId.current) {
                setSlots(result.slots ?? []);
            }
        } catch {
            if (current === requestId.current) {
                setSlots([]);
            }
        } finally {
            if (current === requestId.current) {
                setLoadingSlots(false);
            }
        }
    };

    const pickService = (value: string) => {
        setData('service_id', value);
        setData('time', '');
        loadSlots(value, data.date);
    };

    const pickDate = (value: string) => {
        setData('date', value);
        setData('time', '');
        loadSlots(data.service_id, value);
    };

    const selectedService = services.find(
        (service) => String(service.id) === String(data.service_id),
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/agenda/appointments', { preserveScroll: true });
    };

    const inputClass =
        'w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none';
    const labelClass =
        'mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase';

    return (
        <>
            <Head title="Nuevo Turno" />

            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6 lg:p-8">
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <CalendarPlus className="size-6 text-zinc-400" />
                            Nuevo Turno en Estación
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Agenda un cliente directamente, sin esperar
                            aprobación web.
                        </p>
                    </div>

                    <Link
                        href="/agenda/calendario"
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                    >
                        <ArrowLeft className="size-4" />
                        Volver a Agenda
                    </Link>
                </div>

                {barberProfileId === null ? (
                    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-8 text-center text-sm text-zinc-500">
                        No tienes un perfil de barbero configurado. Pide al
                        administrador que lo active.
                    </div>
                ) : (
                    <form
                        onSubmit={submit}
                        className="flex flex-col gap-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6"
                    >
                        <div className="space-y-1">
                            <label className={labelClass} htmlFor="service_id">
                                Servicio
                            </label>
                            <select
                                id="service_id"
                                className={inputClass}
                                value={data.service_id}
                                onChange={(e) => pickService(e.target.value)}
                            >
                                <option value="">
                                    Selecciona un servicio...
                                </option>
                                {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.name} (
                                        {service.duration_minutes} min · $
                                        {Number(service.price).toFixed(2)})
                                    </option>
                                ))}
                            </select>
                            {errors.service_id && (
                                <p className="text-xs text-rose-400">
                                    {errors.service_id}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className={labelClass} htmlFor="date">
                                    Fecha
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    min={today}
                                    className={inputClass}
                                    value={data.date}
                                    onChange={(e) => pickDate(e.target.value)}
                                />
                                {errors.date && (
                                    <p className="text-xs text-rose-400">
                                        {errors.date}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <span className="block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                    Hora
                                </span>
                                {loadingSlots ? (
                                    <p className="flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-400">
                                        <Clock className="size-4 animate-spin" />
                                        Cargando disponibilidad...
                                    </p>
                                ) : slots.length === 0 ? (
                                    <p className="flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-400">
                                        Elige servicio y fecha para ver horas.
                                    </p>
                                ) : (
                                    <select
                                        value={data.time}
                                        onChange={(e) =>
                                            setData('time', e.target.value)
                                        }
                                        className={inputClass}
                                    >
                                        <option value="">
                                            Selecciona una hora...
                                        </option>
                                        {slots.map((slot) => (
                                            <option key={slot} value={slot}>
                                                {formatTimeAMPM(slot)}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {errors.time && (
                                    <p className="text-xs text-rose-400">
                                        {errors.time}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 border-t border-zinc-800/60 pt-5 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label
                                    className={labelClass}
                                    htmlFor="client_name"
                                >
                                    Cliente
                                </label>
                                <input
                                    id="client_name"
                                    className={inputClass}
                                    value={data.client_name}
                                    onChange={(e) =>
                                        setData('client_name', e.target.value)
                                    }
                                    placeholder="Nombre del cliente"
                                />
                                {errors.client_name && (
                                    <p className="text-xs text-rose-400">
                                        {errors.client_name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label
                                    className={labelClass}
                                    htmlFor="client_phone"
                                >
                                    Teléfono
                                </label>
                                {(() => {
                                    const currentPhone =
                                        data.client_phone || '';
                                    const validPrefixes = [
                                        '0412',
                                        '0414',
                                        '0424',
                                        '0416',
                                        '0426',
                                    ];
                                    const hasValidPrefix =
                                        validPrefixes.includes(
                                            currentPhone.slice(0, 4),
                                        );
                                    const phonePrefix = hasValidPrefix
                                        ? currentPhone.slice(0, 4)
                                        : '0412';
                                    const phoneNumber = hasValidPrefix
                                        ? currentPhone.slice(4)
                                        : currentPhone;

                                    return (
                                        <div className="flex gap-2">
                                            <select
                                                value={phonePrefix}
                                                onChange={(e) =>
                                                    setData(
                                                        'client_phone',
                                                        `${e.target.value}${phoneNumber}`,
                                                    )
                                                }
                                                className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-100 transition focus:border-zinc-700 focus:outline-none"
                                            >
                                                <option value="0412">
                                                    0412
                                                </option>
                                                <option value="0414">
                                                    0414
                                                </option>
                                                <option value="0424">
                                                    0424
                                                </option>
                                                <option value="0416">
                                                    0416
                                                </option>
                                                <option value="0426">
                                                    0426
                                                </option>
                                            </select>

                                            <input
                                                id="client_phone"
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={7}
                                                value={phoneNumber}
                                                onChange={(e) => {
                                                    const numericValue =
                                                        e.currentTarget.value.replace(
                                                            /\D/g,
                                                            '',
                                                        );
                                                    setData(
                                                        'client_phone',
                                                        `${phonePrefix}${numericValue}`,
                                                    );
                                                }}
                                                placeholder="1234567"
                                                className={inputClass}
                                            />
                                        </div>
                                    );
                                })()}
                                {errors.client_phone && (
                                    <p className="text-xs text-rose-400">
                                        {errors.client_phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClass} htmlFor="notes">
                                Notas (opcional)
                            </label>
                            <textarea
                                id="notes"
                                rows={2}
                                className={`${inputClass} resize-none`}
                                value={data.notes}
                                onChange={(e) =>
                                    setData('notes', e.target.value)
                                }
                                placeholder="Preferencias, recordatorios, etc."
                            />
                        </div>

                        <div className="flex items-center justify-between gap-3 border-t border-zinc-800/60 pt-5">
                            <p className="text-xs text-zinc-500">
                                {selectedService ? (
                                    <>
                                        <Scissors className="mr-1 inline size-3.5" />
                                        Estima{' '}
                                        {selectedService.duration_minutes} min
                                    </>
                                ) : (
                                    'El turno quedará confirmado al guardar.'
                                )}
                            </p>
                            <div className="flex gap-3">
                                <Link
                                    href="/agenda/calendario"
                                    className="rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50"
                                >
                                    <CalendarPlus className="size-4" />
                                    {processing
                                        ? 'Guardando...'
                                        : 'Confirmar turno'}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
