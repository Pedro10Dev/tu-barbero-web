import { Head, Link, router } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle2,
    Clock,
    Plus,
    Search,
    XCircle,
    AlertCircle,
    Phone,
    Scissors,
    Mail,
    ChevronDown,
    MessageSquare,
    CalendarOff,
} from 'lucide-react';
import { useState } from 'react';
import { formatTimeAMPM } from '@/lib/utils';

type Appointment = {
    id: number;
    client: string;
    email?: string | null;
    phone?: string | null;
    phoneFormatted: string;
    service: string;
    duration?: number | null;
    price: number;
    start_time: string;
    time: string;
    notes?: string | null;
    status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
};

const statusConfig = {
    pending: {
        label: 'Pendiente de aprobación',
        bar: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
        chip: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
        icon: AlertCircle,
    },
    confirmed: {
        label: 'Confirmada',
        bar: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]',
        chip: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
        icon: CheckCircle2,
    },
    rejected: {
        label: 'Rechazada',
        bar: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]',
        chip: 'border-rose-500/20 bg-rose-500/10 text-rose-400',
        icon: XCircle,
    },
    cancelled: {
        label: 'Cancelada',
        bar: 'bg-zinc-600',
        chip: 'border-border bg-muted text-muted-foreground',
        icon: XCircle,
    },
    completed: {
        label: 'Completada',
        bar: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.4)]',
        chip: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
        icon: CheckCircle2,
    },
} as const;

function formatPrice(price: number): string {
    return `$${Number(price).toFixed(2)}`;
}

export default function AgendaList({
    appointments,
    pendingCount,
}: {
    appointments: Appointment[];
    pendingCount: number;
}) {
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>(
        'all',
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const decide = (
        id: number,
        action: 'accept' | 'reject' | 'cancel' | 'complete',
    ) => {
        setUpdatingId(id);
        router.patch(
            `/agenda/appointments/${id}`,
            { action },
            {
                preserveScroll: true,
                onFinish: () => setUpdatingId(null),
            },
        );
    };

    const visibleAppointments = appointments.filter((app) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'pending' && app.status === 'pending') ||
            (filter === 'confirmed' && app.status === 'confirmed');

        if (!matchesFilter) {
            return false;
        }

        const haystack = [
            app.client,
            app.service,
            app.phone ?? '',
            app.email ?? '',
        ]
            .join(' ')
            .toLowerCase();

        return haystack.includes(searchTerm.toLowerCase());
    });

    return (
        <>
            <Head title="Gestión de Citas" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera y Resumen Superior */}
                <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-foreground">
                            <Calendar className="size-6 text-muted-foreground" />
                            Gestión de Citas y Solicitudes
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Revisa solicitudes pendientes por la web o
                            administra turnos de forma manual en estación.
                        </p>
                    </div>

                    {/* Tarjeta de Solicitudes Pendientes */}
                    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                            <AlertCircle className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-muted-foreground">
                                Solicitudes Pendientes
                            </span>
                            <span className="text-base font-bold text-foreground">
                                {pendingCount}{' '}
                                <span className="text-xs font-normal text-muted-foreground">
                                    por aprobar
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filtros y Búsqueda */}
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="relative flex w-full items-center">
                        <Search className="absolute left-3.5 size-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar cliente, teléfono o servicio..."
                            className="w-full rounded-xl border border-border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-ring focus:outline-none"
                        />
                    </div>

                    <div className="flex w-full shrink-0 items-center justify-between gap-3 sm:w-auto sm:justify-end">
                        <div className="flex rounded-xl border border-border bg-card p-1">
                            <button
                                onClick={() => setFilter('all')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'all'
                                        ? 'bg-muted text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'pending'
                                        ? 'bg-muted text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Solicitudes
                            </button>
                            <button
                                onClick={() => setFilter('confirmed')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'confirmed'
                                        ? 'bg-muted text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Confirmadas
                            </button>
                        </div>

                        <Link
                            href="/agenda/nuevo-turno"
                            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                        >
                            <Plus className="size-4" />
                            Nuevo Turno
                        </Link>
                    </div>
                </div>

                {/* Listado de Citas */}
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
                            const isUpdating = updatingId === app.id;
                            const isPending = app.status === 'pending';

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

                                    {/* Cabecera */}
                                    <div
                                        onClick={() => toggleExpand(app.id)}
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
                                                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                                                        <Scissors className="size-3.5 text-muted-foreground" />
                                                        {app.service}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="size-3.5 text-muted-foreground" />
                                                        {app.start_time}{' '}
                                                        {formatTimeAMPM(
                                                            app.time,
                                                        )}
                                                    </span>
                                                    {app.phoneFormatted && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Phone className="size-3.5 text-muted-foreground" />
                                                            {app.phoneFormatted}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Controles */}
                                        <div
                                            className="flex items-center gap-2 self-end sm:self-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {isPending && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            decide(
                                                                app.id,
                                                                'accept',
                                                            )
                                                        }
                                                        disabled={isUpdating}
                                                        className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50"
                                                    >
                                                        <CheckCircle2 className="size-4" />
                                                        Aprobar
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            decide(
                                                                app.id,
                                                                'reject',
                                                            )
                                                        }
                                                        disabled={isUpdating}
                                                        className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 disabled:opacity-50"
                                                    >
                                                        <XCircle className="size-4" />
                                                        Rechazar
                                                    </button>
                                                </>
                                            )}

                                            {app.status === 'confirmed' && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            decide(
                                                                app.id,
                                                                'complete',
                                                            )
                                                        }
                                                        disabled={isUpdating}
                                                        className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-500 disabled:opacity-50"
                                                    >
                                                        <CheckCircle2 className="size-4" />
                                                        Completar
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            decide(
                                                                app.id,
                                                                'cancel',
                                                            )
                                                        }
                                                        disabled={isUpdating}
                                                        className="flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3.5 py-2 text-xs font-semibold text-foreground transition hover:bg-accent hover:text-foreground disabled:opacity-50"
                                                    >
                                                        <CalendarOff className="size-4" />
                                                        Cancelar
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                onClick={() =>
                                                    toggleExpand(app.id)
                                                }
                                                className="ml-1 flex items-center gap-2 rounded-xl border border-border bg-muted px-3.5 py-2 text-xs font-medium text-foreground transition hover:bg-accent hover:text-foreground"
                                            >
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
                                    </div>

                                    {/* Contenido Desplegable */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="flex flex-col justify-between gap-6 border-t border-border bg-muted/60 px-6 pt-4 pb-6 md:flex-row md:items-center">
                                                <div className="grid grid-cols-1 gap-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                            Correo Electrónico
                                                        </span>
                                                        <div className="flex items-center gap-2 text-foreground">
                                                            <Mail className="size-3.5 text-muted-foreground" />
                                                            {app.email || '—'}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                            Detalles del
                                                            Servicio
                                                        </span>
                                                        <span className="block font-medium text-foreground">
                                                            {formatPrice(
                                                                app.price,
                                                            )}
                                                            {app.duration
                                                                ? ` • ${app.duration} min estimada`
                                                                : ''}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                                        <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                            Notas /
                                                            Observaciones
                                                        </span>
                                                        <p className="text-muted-foreground italic">
                                                            {app.notes
                                                                ? `"${app.notes}"`
                                                                : 'Sin notas'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 items-center border-t border-border pt-4 md:border-t-0 md:pt-0">
                                                    {app.phone ? (
                                                        <a
                                                            href={`https://wa.me/${app.phone}?text=Hola%20${encodeURIComponent(app.client)},%20te%20contacto%20desde%20TuBarbero%20en%20relación%20a%20tu%20cita%20de%20${encodeURIComponent(app.service)}...`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/20 px-4 py-2.5 text-xs font-semibold text-emerald-600 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-600/30 dark:text-emerald-300 md:w-auto"
                                                        >
                                                            <MessageSquare className="size-4 text-emerald-400" />
                                                            Escribir por
                                                            WhatsApp
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">
                                                            Sin teléfono de
                                                            contacto
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}
