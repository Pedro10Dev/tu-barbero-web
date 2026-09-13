import { Head } from '@inertiajs/react';
import {
    CalendarDays,
    Search,
    Clock,
    Scissors,
    Mail,
    ChevronDown,
    AlertCircle,
    CheckCircle2,
    XCircle,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { formatTimeAMPM } from '@/lib/utils';

type Appointment = {
    id: number;
    client: string;
    barber: string;
    service: string;
    start_time: string;
    time: string;
    duration: number | null;
    price: number;
    status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
    notes: string | null;
};

const statusConfig = {
    pending: {
        label: 'Pendiente',
        chip: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
        bar: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
        icon: AlertCircle,
    },
    confirmed: {
        label: 'Confirmada',
        chip: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
        bar: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]',
        icon: CheckCircle2,
    },
    rejected: {
        label: 'Rechazada',
        chip: 'border-rose-500/20 bg-rose-500/10 text-rose-400',
        bar: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]',
        icon: XCircle,
    },
    cancelled: {
        label: 'Cancelada',
        chip: 'border-border bg-muted text-muted-foreground',
        bar: 'bg-zinc-600',
        icon: XCircle,
    },
    completed: {
        label: 'Completada',
        chip: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
        bar: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]',
        icon: CheckCircle2,
    },
} as const;

function formatPrice(price: number): string {
    return `$${Number(price).toFixed(2)}`;
}

export default function AdminAppointments({
    appointments,
}: {
    appointments: Appointment[];
}) {
    const [filter, setFilter] = useState<
        'all' | 'pending' | 'confirmed' | 'other'
    >('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const totals = appointments.reduce(
        (acc, app) => {
            acc[app.status] = (acc[app.status] ?? 0) + 1;

            return acc;
        },
        {} as Record<string, number>,
    );

    const visibleAppointments = appointments.filter((app) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'pending' && app.status === 'pending') ||
            (filter === 'confirmed' && app.status === 'confirmed') ||
            (filter === 'other' &&
                ['rejected', 'cancelled', 'completed'].includes(app.status));

        if (!matchesFilter) {
            return false;
        }

        const haystack = [app.client, app.barber, app.service, app.start_time]
            .join(' ')
            .toLowerCase();

        return haystack.includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <Head title="Gestión de Citas" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera */}
                <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-foreground">
                            <CalendarDays className="size-6 text-muted-foreground" />
                            Gestión de Citas
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Historial completo de reservas de todos los
                            barberos.
                        </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-muted text-foreground">
                            <CalendarDays className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-muted-foreground">
                                Total de citas
                            </span>
                            <span className="text-base font-bold text-foreground">
                                {appointments.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filtros y búsqueda */}
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="relative flex w-full items-center">
                        <Search className="absolute left-3.5 size-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar cliente, barbero o servicio..."
                            className="w-full rounded-xl border border-border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-ring focus:outline-none"
                        />
                    </div>

                    <div className="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
                        {(
                            [
                                ['all', 'Todas'],
                                ['pending', 'Pendientes'],
                                ['confirmed', 'Confirmadas'],
                                ['other', 'Finalizadas'],
                            ] as const
                        ).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key)}
                                className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                    filter === key
                                        ? 'bg-muted text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Listado */}
                <div className="flex flex-col gap-3">
                    {visibleAppointments.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
                            No hay citas que coincidan con este filtro.
                        </div>
                    ) : (
                        visibleAppointments.map((app) => {
                            const config = statusConfig[app.status];
                            const StatusIcon = config.icon;
                            const isExpanded = expandedId === app.id;

                            return (
                                <div
                                    key={app.id}
                                    className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
                                        isExpanded
                                            ? 'border-border shadow-lg shadow-foreground/10'
                                            : 'border-border hover:border-foreground/40'
                                    }`}
                                >
                                    <div
                                        className={`absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300 ${config.bar}`}
                                    />

                                    <div
                                        onClick={() =>
                                            setExpandedId(
                                                isExpanded ? null : app.id,
                                            )
                                        }
                                        className="flex cursor-pointer flex-col justify-between gap-4 p-5 pl-6 select-none sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${config.chip}`}
                                            >
                                                <StatusIcon className="size-5" />
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    <h3 className="text-base font-semibold text-foreground">
                                                        {app.client}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${config.chip}`}
                                                    >
                                                        {config.label}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="size-3.5 text-muted-foreground" />
                                                        {app.start_time}{' '}
                                                        {formatTimeAMPM(
                                                            app.time,
                                                        )}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <User className="size-3.5 text-muted-foreground" />
                                                        {app.barber}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Scissors className="size-3.5 text-muted-foreground" />
                                                        {app.service}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="flex items-center gap-2 self-end rounded-xl border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-accent hover:text-foreground sm:self-center">
                                            <span>
                                                {isExpanded
                                                    ? 'Ocultar'
                                                    : 'Detalles'}
                                            </span>
                                            <ChevronDown
                                                className={`size-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                    </div>

                                    {/* Detalles */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="grid grid-cols-1 gap-6 border-t border-border bg-muted/60 px-6 pt-4 pb-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
                                                <div className="space-y-1">
                                                    <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                        Precio en la reserva
                                                    </span>
                                                    <span className="font-medium text-foreground">
                                                        {formatPrice(app.price)}
                                                        {app.duration
                                                            ? ` • ${app.duration} min`
                                                            : ''}
                                                    </span>
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                        Barbero asignado
                                                    </span>
                                                    <span className="flex items-center gap-2 text-foreground">
                                                        <Mail className="size-3.5 text-muted-foreground" />
                                                        {app.barber}
                                                    </span>
                                                </div>
                                                <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                                    <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                        Notas
                                                    </span>
                                                    <p className="text-muted-foreground italic">
                                                        {app.notes
                                                            ? `"${app.notes}"`
                                                            : 'Sin notas'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Desglose por estado */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {Object.entries(statusConfig).map(([key, config]) => (
                        <div
                            key={key}
                            className="rounded-2xl border border-border bg-card p-4"
                        >
                            <span
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${config.chip}`}
                            >
                                {config.label}
                            </span>
                            <p className="mt-2 text-2xl font-bold text-foreground">
                                {totals[key] ?? 0}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
