import { Head, router } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { formatTimeAMPM } from '@/lib/utils';

type ViewMode = 'day' | 'week' | 'month';

type ScheduleEntry = {
    id: number;
    date: string;
    client: string;
    service: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'confirmed';
};

function toDate(date: string): Date {
    const [year, month, day] = date.split('-').map(Number);

    return new Date(year, month - 1, day);
}

function toIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${y}-${m}-${day}`;
}

function formatHeader(date: string): string {
    const formatted = toDate(date).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatShortDate(date: string): string {
    const formatted = toDate(date).toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function formatMonth(date: string): string {
    const formatted = toDate(date).toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
    });

    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function rangeDates(date: string, view: ViewMode): string[] {
    if (view === 'day') {
        return [date];
    }

    const parsed = toDate(date);

    if (view === 'week') {
        const dayOfWeek = parsed.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(parsed);
        monday.setDate(parsed.getDate() + mondayOffset);

        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);

            return toIsoDate(d);
        });
    }

    const year = parsed.getFullYear();
    const month = parsed.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) =>
        toIsoDate(new Date(year, month, i + 1)),
    );
}

function shiftDate(date: string, view: ViewMode, delta: number): string {
    const parsed = toDate(date);

    if (view === 'month') {
        parsed.setMonth(parsed.getMonth() + delta);
    } else {
        parsed.setDate(parsed.getDate() + delta * (view === 'week' ? 7 : 1));
    }

    return toIsoDate(parsed);
}

export default function AgendaCalendar({
    date,
    view,
    appointments,
}: {
    date: string;
    view: ViewMode;
    appointments: ScheduleEntry[];
}) {
    const [viewMode, setViewMode] = useState<ViewMode>(view);

    const navigate = (nextView: ViewMode, nextDate: string) => {
        setViewMode(nextView);
        router.get(
            '/agenda/calendario',
            { date: nextDate, view: nextView },
            { preserveState: true },
        );
    };

    const goToday = () => {
        navigate(viewMode, toIsoDate(new Date()));
    };

    const goPrev = () => navigate(viewMode, shiftDate(date, viewMode, -1));
    const goNext = () => navigate(viewMode, shiftDate(date, viewMode, 1));

    const grouped = appointments.reduce<Record<string, ScheduleEntry[]>>(
        (acc, entry) => {
            (acc[entry.date] ??= []).push(entry);

            return acc;
        },
        {},
    );

    const days = rangeDates(date, viewMode)
        .map((day) => ({ date: day, entries: grouped[day] ?? [] }))
        .filter((day) => day.entries.length > 0);

    const cancelAppointment = (entry: ScheduleEntry) => {
        router.patch(
            `/agenda/appointments/${entry.id}`,
            { action: 'cancel' },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const completeAppointment = (entry: ScheduleEntry) => {
        router.patch(
            `/agenda/appointments/${entry.id}`,
            { action: 'complete' },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const isViewChange = (next: ViewMode) => {
        if (next === viewMode) {
            return;
        }

        navigate(next, date);
    };

    const periodLabel =
        viewMode === 'week'
            ? `del ${formatShortDate(days.length > 0 ? days[0].date : date)} al ${formatShortDate(days.length > 0 ? days[days.length - 1].date : date)}`
            : formatMonth(date);

    return (
        <>
            <Head title="Mi Agenda" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera y Selector de Vista */}
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <CalendarIcon className="size-6 text-zinc-400" />
                            Mi Agenda
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Visualiza tus bloques horarios y turnos programados
                            en estación.
                        </p>
                    </div>

                    <div className="flex shrink-0 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-1">
                        {(['day', 'week', 'month'] as ViewMode[]).map(
                            (mode) => (
                                <button
                                    key={mode}
                                    onClick={() => isViewChange(mode)}
                                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                        viewMode === mode
                                            ? 'bg-zinc-800 text-white shadow-sm'
                                            : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    {mode === 'day'
                                        ? 'Día'
                                        : mode === 'week'
                                          ? 'Semana'
                                          : 'Mes'}
                                </button>
                            ),
                        )}
                    </div>
                </div>

                {/* Barra de navegación de fechas */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:flex-row">
                    <div className="flex items-center gap-3.5">
                        <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/80 text-zinc-300">
                            <CalendarIcon className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                {viewMode === 'day'
                                    ? 'Fecha Seleccionada'
                                    : viewMode === 'week'
                                      ? 'Semana'
                                      : 'Mes'}
                            </span>
                            <h2 className="text-base font-bold text-white">
                                {viewMode === 'day'
                                    ? formatHeader(date)
                                    : periodLabel}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/60">
                            <button
                                onClick={goPrev}
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
                                onClick={goNext}
                                className="p-2.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                            >
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cuadrícula de la Agenda */}
                <div className="min-h-[400px] overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
                    {days.length === 0 ? (
                        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
                            <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-zinc-700/50 bg-zinc-800/60 text-zinc-400">
                                <CalendarIcon className="size-6" />
                            </div>
                            <h3 className="mb-1 text-sm font-semibold text-white">
                                Sin turnos en este período
                            </h3>
                            <p className="max-w-sm text-xs text-zinc-400">
                                Las citas programadas aparecerán aquí para la
                                vista seleccionada.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {days.map((day) => (
                                <div
                                    key={day.date}
                                    className="flex flex-col rounded-none"
                                >
                                    {viewMode !== 'day' && (
                                        <div className="flex items-center justify-between border-b border-zinc-800/70 bg-zinc-950/50 px-5 py-2">
                                            <span className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                                                {formatShortDate(day.date)}
                                            </span>
                                            <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[11px] font-semibold text-zinc-300">
                                                {day.entries.length}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex flex-col divide-y divide-zinc-800/70">
                                        {day.entries.map((entry) => (
                                            <div
                                                key={entry.id}
                                                className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-zinc-900/60 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-2 py-2 text-center">
                                                        <span className="text-sm font-bold text-white">
                                                            {formatTimeAMPM(
                                                                entry.start_time,
                                                            )}
                                                        </span>
                                                        <span className="text-[10px] text-zinc-500">
                                                            {formatTimeAMPM(
                                                                entry.end_time,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-0.5">
                                                        <h3 className="text-sm font-semibold text-white">
                                                            {entry.client}
                                                        </h3>
                                                        <p className="text-xs text-zinc-400">
                                                            {entry.service}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 items-center gap-2">
                                                    <span
                                                        className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                                                            entry.status ===
                                                            'confirmed'
                                                                ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                                                : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                                                        }`}
                                                    >
                                                        {entry.status ===
                                                        'confirmed'
                                                            ? 'Confirmada'
                                                            : 'Pendiente'}
                                                    </span>

                                                    {entry.status ===
                                                        'confirmed' && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    completeAppointment(
                                                                        entry,
                                                                    )
                                                                }
                                                                className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 px-2.5 py-1.5 text-[11px] font-semibold text-blue-300 transition hover:bg-blue-500/20"
                                                            >
                                                                <CheckCircle2 className="size-3.5" />
                                                                Completar
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    cancelAppointment(
                                                                        entry,
                                                                    )
                                                                }
                                                                className="flex items-center gap-1.5 rounded-xl border border-zinc-600/50 bg-zinc-800/60 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                                                            >
                                                                <XCircle className="size-3.5" />
                                                                Cancelar
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
