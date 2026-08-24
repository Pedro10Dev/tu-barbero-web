import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Service {
    id: number;
    name: string;
    price: number;
    duration_minutes: number;
    description?: string;
}

interface BarberProfile {
    id: number;
    display_name: string;
    bio?: string;
}

interface Props {
    services: Service[];
    barbers: BarberProfile[];
    authClient?: {
        name: string;
        email: string;
        phone: string;
    };
}

export default function BookingIndex() {
    const { services, barbers, authClient } = usePage()
        .props as unknown as Props & {
        auth: { user: any };
    };
    const [step, setStep] = useState<number>(1);

    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        barber_profile_id: '',
        date: '',
        time: '',
        client_name: authClient?.name || '', // <--- Verifica que esto esté así
        client_email: authClient?.email || '', // <--- y esto
        client_phone: authClient?.phone || '', // <--- y esto
        notes: '',
    });
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
    const selectedService = services.find(
        (s) => s.id.toString() === data.service_id,
    );
    const selectedBarber = barbers.find(
        (b) => b.id.toString() === data.barber_profile_id,
    );

    useEffect(() => {
        if (data.date && data.service_id && data.barber_profile_id) {
            setLoadingSlots(true);
            setAvailableSlots([]);

            fetch(
                `/api/booking/availability?date=${data.date}&service_id=${data.service_id}&barber_profile_id=${data.barber_profile_id}`,
            )
                .then((res) => res.json())
                .then((resData) => {
                    setAvailableSlots(resData.slots || []);
                })
                .catch((err) =>
                    console.error('Error al cargar la disponibilidad:', err),
                )
                .finally(() => setLoadingSlots(false));
        }
    }, [data.date, data.service_id, data.barber_profile_id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/booking');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-100 sm:px-6 lg:px-8">
                <Head title="Reservar Cita - Barbería" />

                <div className="mx-auto max-w-3xl">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                            Barbería Studio
                        </span>
                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Reserva tu experiencia
                        </h1>
                        <p className="mt-2 text-sm text-zinc-400">
                            Selecciona el servicio, tu barbero de preferencia y
                            el horario ideal.
                        </p>
                    </div>

                    {/* Stepper Header */}
                    <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
                        {[
                            { num: 1, label: 'Servicio' },
                            { num: 2, label: 'Barbero' },
                            { num: 3, label: 'Horario' },
                            { num: 4, label: 'Confirmar' },
                        ].map((s) => (
                            <button
                                key={s.num}
                                type="button"
                                onClick={() => s.num < step && setStep(s.num)}
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                                    step === s.num
                                        ? 'text-white'
                                        : step > s.num
                                          ? 'cursor-pointer text-emerald-400'
                                          : 'cursor-not-allowed text-zinc-600'
                                }`}
                            >
                                <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                                        step === s.num
                                            ? 'bg-zinc-100 text-zinc-950'
                                            : step > s.num
                                              ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                              : 'border border-zinc-800 bg-zinc-900 text-zinc-600'
                                    }`}
                                >
                                    {step > s.num ? '✓' : s.num}
                                </span>
                                <span className="hidden sm:inline">
                                    {s.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* PASO 1: SERVICIOS */}
                        {step === 1 && (
                            <div className="space-y-4">
                                <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
                                    Selecciona un servicio
                                </h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {services.map((service) => {
                                        const isSelected =
                                            data.service_id ===
                                            service.id.toString();
                                        return (
                                            <div
                                                key={service.id}
                                                onClick={() => {
                                                    setData(
                                                        'service_id',
                                                        service.id.toString(),
                                                    );
                                                }}
                                                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all ${
                                                    isSelected
                                                        ? 'border-zinc-100 bg-zinc-900/80 shadow-lg shadow-black/50'
                                                        : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50'
                                                }`}
                                            >
                                                <div>
                                                    <h3 className="text-base font-semibold text-white">
                                                        {service.name}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-zinc-400">
                                                        {
                                                            service.duration_minutes
                                                        }{' '}
                                                        min de sesión
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-lg font-bold text-white">
                                                        ${service.price}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {errors.service_id && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {errors.service_id}
                                    </p>
                                )}

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        disabled={!data.service_id}
                                        onClick={() => setStep(2)}
                                        className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Continuar →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 2: BARBEROS */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <h2 className="mb-4 text-xl font-bold tracking-tight text-white">
                                    Selecciona a tu barbero
                                </h2>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {barbers.map((barber) => {
                                        const isSelected =
                                            data.barber_profile_id ===
                                            barber.id.toString();
                                        return (
                                            <div
                                                key={barber.id}
                                                onClick={() => {
                                                    setData(
                                                        'barber_profile_id',
                                                        barber.id.toString(),
                                                    );
                                                }}
                                                className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                                                    isSelected
                                                        ? 'border-zinc-100 bg-zinc-900/80 shadow-lg shadow-black/50'
                                                        : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50'
                                                }`}
                                            >
                                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-bold text-zinc-300">
                                                    {barber.display_name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                <h3 className="text-base font-semibold text-white">
                                                    {barber.display_name}
                                                </h3>
                                                {barber.bio && (
                                                    <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                                                        {barber.bio}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {errors.barber_profile_id && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {errors.barber_profile_id}
                                    </p>
                                )}

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-900"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!data.barber_profile_id}
                                        onClick={() => setStep(3)}
                                        className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Continuar →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 3: FECHA Y HORA */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold tracking-tight text-white">
                                    Elige fecha y hora
                                </h2>

                                <div>
                                    <label className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                        Fecha
                                    </label>
                                    <input
                                        type="date"
                                        min={
                                            new Date()
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                        value={data.date}
                                        onChange={(e) => {
                                            setData('date', e.target.value);
                                            setData('time', '');
                                        }}
                                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-sm text-white focus:border-zinc-500 focus:outline-none sm:w-1/2"
                                    />
                                    {errors.date && (
                                        <p className="mt-2 text-xs text-red-400">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                {data.date && (
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                            Horarios Disponibles
                                        </label>
                                        {loadingSlots ? (
                                            <div className="py-8 text-center text-sm text-zinc-500">
                                                Buscando turnos disponibles...
                                            </div>
                                        ) : availableSlots.length > 0 ? (
                                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                                                {availableSlots.map((slot) => {
                                                    const isSelected =
                                                        data.time === slot;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={slot}
                                                            onClick={() =>
                                                                setData(
                                                                    'time',
                                                                    slot,
                                                                )
                                                            }
                                                            className={`rounded-xl border p-3 text-center text-sm font-semibold transition-all ${
                                                                isSelected
                                                                    ? 'border-white bg-white text-zinc-950 shadow-md'
                                                                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-700'
                                                            }`}
                                                        >
                                                            {slot}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-amber-500">
                                                No existen turnos libres para
                                                esta fecha. Intenta con otro
                                                día.
                                            </p>
                                        )}
                                        {errors.time && (
                                            <p className="mt-2 text-xs text-red-400">
                                                {errors.time}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-900"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!data.date || !data.time}
                                        onClick={() => setStep(4)}
                                        className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Continuar →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 4: CONFIRMACIÓN Y DATOS DE CONTACTO */}
                        {step === 4 && (
                            <div className="space-y-6">
                                <h2 className="mb-2 text-xl font-bold tracking-tight text-white">
                                    Tus Datos y Confirmación
                                </h2>

                                {/* Resumen de la Cita */}
                                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-sm">
                                    <div>
                                        <span className="block text-xs tracking-wider text-zinc-500 uppercase">
                                            Servicio
                                        </span>
                                        <span className="font-semibold text-white">
                                            {selectedService?.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs tracking-wider text-zinc-500 uppercase">
                                            Barbero
                                        </span>
                                        <span className="font-semibold text-white">
                                            {selectedBarber?.display_name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs tracking-wider text-zinc-500 uppercase">
                                            Fecha y Hora
                                        </span>
                                        <span className="font-semibold text-white">
                                            {data.date} a las {data.time}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs tracking-wider text-zinc-500 uppercase">
                                            Total a pagar
                                        </span>
                                        <span className="font-semibold text-emerald-400">
                                            ${selectedService?.price}
                                        </span>
                                    </div>
                                </div>

                                {/* Campos del Formulario */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                            Nombre Completo
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ej: Pedro Arellano"
                                            value={data.client_name}
                                            onChange={(e) =>
                                                setData(
                                                    'client_name',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={!!authClient}
                                            className={`w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-sm text-white focus:border-zinc-500 focus:outline-none ${
                                                authClient
                                                    ? 'cursor-not-allowed bg-zinc-950/40 opacity-60'
                                                    : ''
                                            }`}
                                        />
                                        {errors.client_name && (
                                            <p className="mt-1 text-xs text-red-400">
                                                {errors.client_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                                Correo Electrónico
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="correo@ejemplo.com"
                                                value={data.client_email}
                                                onChange={(e) =>
                                                    setData(
                                                        'client_email',
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={!!authClient}
                                                className={`w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-sm text-white focus:border-zinc-500 focus:outline-none ${
                                                    authClient
                                                        ? 'cursor-not-allowed bg-zinc-950/40 opacity-60'
                                                        : ''
                                                }`}
                                            />
                                            {errors.client_email && (
                                                <p className="mt-1 text-xs text-red-400">
                                                    {errors.client_email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+58 412 0000000"
                                                value={data.client_phone}
                                                onChange={(e) =>
                                                    setData(
                                                        'client_phone',
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={!!authClient}
                                                className={`w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-sm text-white focus:border-zinc-500 focus:outline-none ${
                                                    authClient
                                                        ? 'cursor-not-allowed bg-zinc-950/40 opacity-60'
                                                        : ''
                                                }`}
                                            />
                                            {errors.client_phone && (
                                                <p className="mt-1 text-xs text-red-400">
                                                    {errors.client_phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                            Notas o Peticiones Especiales
                                            (Opcional)
                                        </label>
                                        <textarea
                                            rows={3}
                                            placeholder="Detalles sobre tu corte o preferencia..."
                                            value={data.notes}
                                            onChange={(e) =>
                                                setData('notes', e.target.value)
                                            }
                                            className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 text-sm text-white focus:border-zinc-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="rounded-xl border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-900"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-white/10 transition-all hover:bg-zinc-200 disabled:opacity-50"
                                    >
                                        {processing
                                            ? 'Procesando...'
                                            : 'Confirmar Reserva'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
