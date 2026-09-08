import { Head, router } from '@inertiajs/react';
import {
    Clock,
    ChevronLeft,
    ChevronRight,
    Scissors,
    CalendarDays,
} from 'lucide-react';
import { useState } from 'react';

type Slot = {
    id: number;
    client: string;
    service: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed';
};

type BarberSchedule = {
    id: number;
    display_name: string;
    is_active: boolean;
    slots: Slot[];
};

function formatHeader(date: string): string {
    const [year, month, day] = date.split('-').map(Number);
    const parsed = new Date(year, month - 1, day);
    const formatted = parsed.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function shiftDate(date: string, delta: number): string {
    const [year, month, day] = date.split('-').map(Number);
    const parsed = new Date(year, month - 1, day + delta);
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');

    return `${y}-${m}-${d}`;
}

export default function AdminSchedules({
    date,
    barbers,
}: {
    date: string;
    barbers: BarberSchedule[];
}) {
    const [activeBarber, setActiveBarber] = useState<number | null>(null);

    const navigate = (nextDate: string) => {
        router.get(
            '/admin/schedules',
            { date: nextDate },
            { preserveState: true },
        );
    };

    const goToday = () => {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        const d = String(today.getDate()).padStart(2, '0');
        navigate(`${y}-${m}-${d}`);
    };

    const visibleBarbers = barbers.filter(
        (b) => activeBarber === null || b.id === activeBarber,
    );
    const totalSlots = barbers.reduce((acc, b) => acc + b.slots.length, 0);

    return (
        <>
            <Head title="Horarios y Turnos" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera */}
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <Clock className="size-6 text-zinc-400" />
                            Horarios y Turnos
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Bloques ocupados por barbero, derivados de las citas
                            del día.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/80 text-zinc-300">
                            <CalendarDays className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-zinc-400">
                                Turnos del día
                            </span>
                            <span className="text-base font-bold text-white">
                                {totalSlots}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Barra de fecha */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:flex-row">
                    <div className="flex items-center gap-3.5">
                        <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/80 text-zinc-300">
                            <CalendarDays className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                Fecha seleccionada
                            </span>
                            <h2 className="text-base font-bold text-white">
                                {formatHeader(date)}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/60">
                            <button
                                onClick={() => navigate(shiftDate(date, -1))}
                                className="p-2.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                            >
                                <ChevronLeft className="size-4" />
                            </button>
                            <button
                                onClick={goToday}
                                className="border-x border-zinc-700/50 px-4 text-xs font-semibold text-zinc-200 transition hover:text-white"
                            >
                                Hoy
                            </button>
                            <button
                                onClick={() => navigate(shiftDate(date, 1))}
                                className="p-2.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Selector de barbero */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setActiveBarber(null)}
                        className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                            activeBarber === null
                                ? 'border-zinc-700 bg-zinc-800 text-white'
                                : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-white'
                        }`}
                    >
                        Todos
                    </button>
                    {barbers.map((barber) => (
                        <button
                            key={barber.id}
                            onClick={() => setActiveBarber(barber.id)}
                            className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                                activeBarber === barber.id
                                    ? 'border-zinc-700 bg-zinc-800 text-white'
                                    : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-400 hover:text-white'
                            }`}
                        >
                            {barber.display_name}
                        </button>
                    ))}
                </div>

                {/* Bloques por barbero */}
                <div className="flex flex-col gap-5">
                    {visibleBarbers.length === 0 ? (
                        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
                            No hay barberos registrados.
                        </div>
                    ) : (
                        visibleBarbers.map((barber) => (
                            <div
                                key={barber.id}
                                className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40"
                            >
                                <div className="flex items-center justify-between gap-3 border-b border-zinc-800/60 px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/60 text-zinc-300">
                                            <Scissors className="size-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-white">
                                                {barber.display_name}
                                            </h3>
                                            <p className="text-[11px] text-zinc-500">
                                                {barber.slots.length} bloques en
                                                el día
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                                            barber.is_active
                                                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                                                : 'border-zinc-700/60 bg-zinc-800/80 text-zinc-400'
                                        }`}
                                    >
                                        {barber.is_active
                                            ? 'Activo'
                                            : 'Inactivo'}
                                    </span>
                                </div>

                                {barber.slots.length === 0 ? (
                                    <div className="px-5 py-8 text-center text-xs text-zinc-500">
                                        Sin turnos este día.
                                    </div>
                                ) : (
                                    <div className="flex flex-col divide-y divide-zinc-800/70">
                                        {barber.slots.map((slot) => (
                                            <div
                                                key={slot.id}
                                                className="flex flex-col gap-2 px-5 py-3.5 transition-colors hover:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="flex w-24 shrink-0 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-2 py-1.5 text-center">
                                                        <span className="text-sm font-bold text-white">
                                                            {slot.start_time}
                                                        </span>
                                                        <span className="text-[10px] text-zinc-500">
                                                            - {slot.end_time}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-white">
                                                            {slot.client}
                                                        </p>
                                                        <p className="text-xs text-zinc-400">
                                                            {slot.service}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`inline-flex w-fit shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                                                        slot.status ===
                                                        'confirmed'
                                                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                                            : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                                                    }`}
                                                >
                                                    {slot.status === 'confirmed'
                                                        ? 'Confirmado'
                                                        : 'Pendiente'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
