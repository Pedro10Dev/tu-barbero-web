import { Head, router } from '@inertiajs/react';
import {
    ChevronLeft,
    ChevronRight,
    Scissors,
    CalendarDays,
} from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { appointmentStatus } from '@/lib/status';
import { formatTimeAMPM } from '@/lib/utils';

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

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Horarios y Turnos"
                    description="Bloques ocupados por barbero, derivados de las citas del día."
                    actions={
                        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-brand">
                                <CalendarDays className="size-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Turnos del día
                                </span>
                                <span className="tabular text-base font-bold text-foreground">
                                    {totalSlots}
                                </span>
                            </div>
                        </div>
                    }
                />

                {/* Barra de fecha */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row">
                    <div className="flex items-center gap-3.5">
                        <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                            <CalendarDays className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Fecha seleccionada
                            </span>
                            <h2 className="text-base font-bold text-foreground">
                                {formatHeader(date)}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center overflow-hidden rounded-lg border border-border bg-muted">
                            <button
                                onClick={() => navigate(shiftDate(date, -1))}
                                className="p-2.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
                            >
                                <ChevronLeft className="size-4" />
                            </button>
                            <button
                                onClick={goToday}
                                className="border-x border-border px-4 text-xs font-semibold text-foreground transition hover:text-foreground"
                            >
                                Hoy
                            </button>
                            <button
                                onClick={() => navigate(shiftDate(date, 1))}
                                className="p-2.5 text-muted-foreground transition hover:bg-accent hover:text-foreground"
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
                        className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-all ${
                            activeBarber === null
                                ? 'border-brand/25 bg-brand/10 text-brand'
                                : 'border-border bg-card text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        Todos
                    </button>
                    {barbers.map((barber) => (
                        <button
                            key={barber.id}
                            onClick={() => setActiveBarber(barber.id)}
                            className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-all ${
                                activeBarber === barber.id
                                    ? 'border-brand/25 bg-brand/10 text-brand'
                                    : 'border-border bg-card text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {barber.display_name}
                        </button>
                    ))}
                </div>

                {/* Bloques por barbero */}
                <div className="flex flex-col gap-5">
                    {visibleBarbers.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
                            No hay barberos registrados.
                        </div>
                    ) : (
                        visibleBarbers.map((barber) => (
                            <div
                                key={barber.id}
                                className="overflow-hidden rounded-xl border border-border bg-card"
                            >
                                <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                                            <Scissors className="size-4" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-foreground">
                                                {barber.display_name}
                                            </h3>
                                            <p className="text-[11px] text-muted-foreground">
                                                {barber.slots.length} bloques en
                                                el día
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                                            barber.is_active
                                                ? 'border-success/25 bg-success/10 text-success'
                                                : 'border-border bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {barber.is_active
                                            ? 'Activo'
                                            : 'Inactivo'}
                                    </span>
                                </div>

                                {barber.slots.length === 0 ? (
                                    <div className="px-5 py-8 text-center text-xs text-muted-foreground">
                                        Sin turnos este día.
                                    </div>
                                ) : (
                                    <div className="flex flex-col divide-y divide-border/70">
                                        {barber.slots.map((slot) => {
                                            const config = appointmentStatus(
                                                slot.status,
                                            );

                                            return (
                                                <div
                                                    key={slot.id}
                                                    className="flex flex-col gap-2 px-5 py-3.5 transition-colors hover:bg-accent/60 sm:flex-row sm:items-center sm:justify-between"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex w-24 shrink-0 flex-col items-center justify-center rounded-lg border border-border bg-muted px-2 py-1.5 text-center">
                                                            <span className="text-sm font-bold text-foreground">
                                                                {formatTimeAMPM(
                                                                    slot.start_time,
                                                                )}
                                                            </span>
                                                            <span className="text-[10px] text-muted-foreground">
                                                                -{' '}
                                                                {formatTimeAMPM(
                                                                    slot.end_time,
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-foreground">
                                                                {slot.client}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {slot.service}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${config.chip}`}
                                                    >
                                                        <span
                                                            className={`size-1.5 rounded-full ${config.dot}`}
                                                        />
                                                        {config.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
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
