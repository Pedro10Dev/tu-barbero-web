import { Head, useForm, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatTimeAMPM } from '@/lib/utils';

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
        let isActive = true;

        if (data.date && data.service_id && data.barber_profile_id) {
            fetch(
                `/api/booking/availability?date=${data.date}&service_id=${data.service_id}&barber_profile_id=${data.barber_profile_id}`,
            )
                .then((res) => res.json())
                .then((resData) => {
                    if (isActive) {
                        setAvailableSlots(resData.slots || []);
                    }
                })
                .catch((err) => {
                    if (isActive) {
                        console.error(
                            'Error al cargar la disponibilidad:',
                            err,
                        );
                    }
                })
                .finally(() => {
                    if (isActive) {
                        setLoadingSlots(false);
                    }
                });
        }

        return () => {
            isActive = false;
        };
    }, [data.date, data.service_id, data.barber_profile_id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/booking');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
                <Head title="Reservar Cita - Barbería" />

                <div className="mx-auto max-w-3xl">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                            Barbería Studio
                        </span>
                        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                            Reserva tu experiencia
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Selecciona el servicio, tu barbero de preferencia y
                            el horario ideal.
                        </p>
                    </div>

                    {/* Stepper Header */}
                    <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
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
                                        ? 'text-foreground'
                                        : step > s.num
                                          ? 'cursor-pointer text-emerald-400'
                                          : 'cursor-not-allowed text-muted-foreground'
                                }`}
                            >
                                <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                                        step === s.num
                                            ? 'bg-primary text-primary-foreground'
                                            : step > s.num
                                              ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                              : 'border border-border bg-card text-muted-foreground'
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
                                <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">
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
                                                    setLoadingSlots(true);
                                                    setAvailableSlots([]);
                                                    setData(
                                                        'service_id',
                                                        service.id.toString(),
                                                    );
                                                }}
                                                className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all ${
                                                    isSelected
                                                        ? 'border-primary bg-accent shadow-lg shadow-foreground/10'
                                                        : 'border-border bg-card hover:border-foreground/40 hover:bg-card'
                                                }`}
                                            >
                                                <div>
                                                    <h3 className="text-base font-semibold text-foreground">
                                                        {service.name}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {
                                                            service.duration_minutes
                                                        }{' '}
                                                        min de sesión
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-lg font-bold text-foreground">
                                                        ${service.price}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {errors.service_id && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.service_id}
                                    </p>
                                )}

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        disabled={!data.service_id}
                                        onClick={() => setStep(2)}
                                        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Continuar →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 2: BARBEROS */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">
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
                                                    setLoadingSlots(true);
                                                    setAvailableSlots([]);
                                                    setData(
                                                        'barber_profile_id',
                                                        barber.id.toString(),
                                                    );
                                                }}
                                                className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                                                    isSelected
                                                        ? 'border-primary bg-accent shadow-lg shadow-foreground/10'
                                                        : 'border-border bg-card hover:border-foreground/40 hover:bg-card'
                                                }`}
                                            >
                                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted text-sm font-bold text-muted-foreground">
                                                    {barber.display_name
                                                        .substring(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                <h3 className="text-base font-semibold text-foreground">
                                                    {barber.display_name}
                                                </h3>
                                                {barber.bio && (
                                                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                        {barber.bio}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {errors.barber_profile_id && (
                                    <p className="mt-2 text-xs text-destructive">
                                        {errors.barber_profile_id}
                                    </p>
                                )}

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!data.barber_profile_id}
                                        onClick={() => setStep(3)}
                                        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Continuar →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 3: FECHA Y HORA */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">
                                    Elige fecha y hora
                                </h2>

                                <div>
                                    <label className="mb-2 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
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
                                            setLoadingSlots(true);
                                            setAvailableSlots([]);
                                            setData('date', e.target.value);
                                            setData('time', '');
                                        }}
                                        className="w-full rounded-xl border border-border bg-card p-3.5 text-sm text-foreground focus:border-ring focus:outline-none sm:w-1/2"
                                    />
                                    {errors.date && (
                                        <p className="mt-2 text-xs text-destructive">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                {data.date && (
                                    <div>
                                        <label className="mb-2 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                            Horarios Disponibles
                                        </label>
                                        {loadingSlots ? (
                                            <div className="py-8 text-center text-sm text-muted-foreground">
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
                                                                    ? 'border-primary bg-primary text-primary-foreground shadow-md'
                                                                    : 'border-border bg-card text-muted-foreground hover:border-foreground/40'
                                                            }`}
                                                        >
                                                            {formatTimeAMPM(
                                                                slot,
                                                            )}
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
                                            <p className="mt-2 text-xs text-destructive">
                                                {errors.time}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!data.date || !data.time}
                                        onClick={() => setStep(4)}
                                        className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Continuar →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* PASO 4: CONFIRMACIÓN Y DATOS DE CONTACTO */}
                        {step === 4 && (
                            <div className="space-y-6">
                                <h2 className="mb-2 text-xl font-bold tracking-tight text-foreground">
                                    Tus Datos y Confirmación
                                </h2>

                                {/* Resumen de la Cita */}
                                <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 text-sm">
                                    <div>
                                        <span className="block text-xs tracking-wider text-muted-foreground uppercase">
                                            Servicio
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {selectedService?.name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs tracking-wider text-muted-foreground uppercase">
                                            Barbero
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {selectedBarber?.display_name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs tracking-wider text-muted-foreground uppercase">
                                            Fecha y Hora
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            {data.date} a las{' '}
                                            {formatTimeAMPM(data.time)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs tracking-wider text-muted-foreground uppercase">
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
                                        <label className="mb-1 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
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
                                            className={`w-full rounded-xl border border-border bg-card p-3.5 text-sm text-foreground focus:border-ring focus:outline-none ${
                                                authClient
                                                    ? 'cursor-not-allowed bg-muted/60 opacity-60'
                                                    : ''
                                            }`}
                                        />
                                        {errors.client_name && (
                                            <p className="mt-1 text-xs text-destructive">
                                                {errors.client_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <Label className="mb-1 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                                Correo Electrónico
                                            </Label>
                                            <Input
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
                                                className={`h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground focus:border-ring focus:outline-none ${
                                                    authClient
                                                        ? 'cursor-not-allowed bg-muted/60 opacity-60'
                                                        : ''
                                                }`}
                                            />
                                            {errors.client_email && (
                                                <p className="mt-1 text-xs text-destructive">
                                                    {errors.client_email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="client_phone"
                                                className="mb-1 block text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                                            >
                                                Teléfono
                                            </Label>

                                            {authClient ? (
                                                // Si está autenticado y está desactivado, mostramos el input bloqueado con el formato actual
                                                <Input
                                                    id="client_phone"
                                                    type="text"
                                                    value={data.client_phone}
                                                    disabled
                                                    className="h-11 w-full cursor-not-allowed rounded-xl border border-border bg-muted/60 px-3 text-sm text-foreground opacity-60"
                                                />
                                            ) : (
                                                // Si no está autenticado, mostramos el select de prefijo y el input de 7 dígitos
                                                (() => {
                                                    const currentPhone =
                                                        data.client_phone || '';
                                                    const VALID_PREFIXES = [
                                                        '0412',
                                                        '0414',
                                                        '0424',
                                                        '0416',
                                                        '0426',
                                                    ];
                                                    const hasValidPrefix =
                                                        VALID_PREFIXES.includes(
                                                            currentPhone.slice(
                                                                0,
                                                                4,
                                                            ),
                                                        );
                                                    const phonePrefix =
                                                        hasValidPrefix
                                                            ? currentPhone.slice(
                                                                  0,
                                                                  4,
                                                              )
                                                            : '0412';
                                                    const phoneNumber =
                                                        hasValidPrefix
                                                            ? currentPhone.slice(
                                                                  4,
                                                              )
                                                            : currentPhone;

                                                    return (
                                                        <div className="flex gap-2">
                                                            <select
                                                                value={
                                                                    phonePrefix
                                                                }
                                                                disabled={
                                                                    !!authClient
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        'client_phone',
                                                                        `${e.target.value}${phoneNumber}`,
                                                                    )
                                                                }
                                                                className="h-11 rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground transition-all focus:border-ring focus:ring-ring"
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

                                                            <Input
                                                                id="client_phone"
                                                                type="text"
                                                                inputMode="numeric"
                                                                maxLength={7}
                                                                value={
                                                                    phoneNumber
                                                                }
                                                                disabled={
                                                                    !!authClient
                                                                }
                                                                onChange={(
                                                                    e,
                                                                ) => {
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
                                                                className="h-11 w-full rounded-xl border border-border bg-card text-sm text-foreground transition-all focus:border-ring focus:outline-none"
                                                            />
                                                        </div>
                                                    );
                                                })()
                                            )}

                                            {errors.client_phone && (
                                                <p className="mt-1 text-xs text-destructive">
                                                    {errors.client_phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
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
                                            className="w-full resize-none rounded-xl border border-border bg-card p-3.5 text-sm text-foreground focus:border-ring focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-accent"
                                    >
                                        Atrás
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
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
