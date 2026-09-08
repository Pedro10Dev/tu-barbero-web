import { Head, router } from '@inertiajs/react';
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
        chip: 'border-zinc-700/60 bg-zinc-800/80 text-zinc-400',
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

    const decide = (id: number, action: 'accept' | 'reject' | 'cancel') => {
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
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <Calendar className="size-6 text-zinc-400" />
                            Gestión de Citas y Solicitudes
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Revisa solicitudes pendientes por la web o
                            administra turnos de forma manual en estación.
                        </p>
                    </div>

                    {/* Tarjeta de Solicitudes Pendientes */}
                    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                            <AlertCircle className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-zinc-400">
                                Solicitudes Pendientes
                            </span>
                            <span className="text-base font-bold text-white">
                                {pendingCount}{' '}
                                <span className="text-xs font-normal text-zinc-500">
                                    por aprobar
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Filtros y Búsqueda */}
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="relative flex w-full items-center">
                        <Search className="absolute left-3.5 size-4 text-zinc-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar cliente, teléfono o servicio..."
                            className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none"
                        />
                    </div>

                    <div className="flex w-full shrink-0 items-center justify-between gap-3 sm:w-auto sm:justify-end">
                        <div className="flex rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-1">
                            <button
                                onClick={() => setFilter('all')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'all'
                                        ? 'bg-zinc-800 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-white'
                                }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'pending'
                                        ? 'bg-zinc-800 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-white'
                                }`}
                            >
                                Solicitudes
                            </button>
                            <button
                                onClick={() => setFilter('confirmed')}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'confirmed'
                                        ? 'bg-zinc-800 text-white shadow-sm'
                                        : 'text-zinc-400 hover:text-white'
                                }`}
                            >
                                Confirmadas
                            </button>
                        </div>

                        <button className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-200">
                            <Plus className="size-4" />
                            Nuevo Turno
                        </button>
                    </div>
                </div>

                {/* Listado de Citas */}
                <div className="flex flex-col gap-3">
                    {visibleAppointments.length === 0 ? (
                        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
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
                                    className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-900/40 transition-all duration-300 ${
                                        isExpanded
                                            ? 'border-zinc-700/80 shadow-lg shadow-black/20'
                                            : 'border-zinc-800/80 hover:border-zinc-700/80'
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
                                                    <h3 className="text-base font-semibold text-white">
                                                        {app.client}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${config.chip}`}
                                                    >
                                                        {config.label}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                                                    <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                                                        <Scissors className="size-3.5 text-zinc-500" />
                                                        {app.service}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="size-3.5 text-zinc-500" />
                                                        {app.start_time}{' '}
                                                        {app.time}
                                                    </span>
                                                    {app.phoneFormatted && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Phone className="size-3.5 text-zinc-500" />
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
                                                <button
                                                    onClick={() =>
                                                        decide(app.id, 'cancel')
                                                    }
                                                    disabled={isUpdating}
                                                    className="flex items-center gap-1.5 rounded-xl border border-zinc-600/50 bg-zinc-800/60 px-3.5 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white disabled:opacity-50"
                                                >
                                                    <CalendarOff className="size-4" />
                                                    Cancelar
                                                </button>
                                            )}

                                            <button
                                                onClick={() =>
                                                    toggleExpand(app.id)
                                                }
                                                className="ml-1 flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
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
                                            <div className="flex flex-col justify-between gap-6 border-t border-zinc-800/60 bg-zinc-950/40 px-6 pt-4 pb-6 md:flex-row md:items-center">
                                                <div className="grid grid-cols-1 gap-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <span className="block font-semibold tracking-wider text-zinc-500 uppercase">
                                                            Correo Electrónico
                                                        </span>
                                                        <div className="flex items-center gap-2 text-zinc-300">
                                                            <Mail className="size-3.5 text-zinc-500" />
                                                            {app.email || '—'}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="block font-semibold tracking-wider text-zinc-500 uppercase">
                                                            Detalles del
                                                            Servicio
                                                        </span>
                                                        <span className="block font-medium text-zinc-300">
                                                            {formatPrice(
                                                                app.price,
                                                            )}
                                                            {app.duration
                                                                ? ` • ${app.duration} min estimada`
                                                                : ''}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                                        <span className="block font-semibold tracking-wider text-zinc-500 uppercase">
                                                            Notas /
                                                            Observaciones
                                                        </span>
                                                        <p className="text-zinc-400 italic">
                                                            {app.notes
                                                                ? `"${app.notes}"`
                                                                : 'Sin notas'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 items-center border-t border-zinc-800/40 pt-4 md:border-t-0 md:pt-0">
                                                    {app.phone ? (
                                                        <a
                                                            href={`https://wa.me/${app.phone}?text=Hola%20${encodeURIComponent(app.client)},%20te%20contacto%20desde%20TuBarbero%20en%20relación%20a%20tu%20cita%20de%20${encodeURIComponent(app.service)}...`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/20 px-4 py-2.5 text-xs font-semibold text-emerald-300 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-600/30 md:w-auto"
                                                        >
                                                            <MessageSquare className="size-4 text-emerald-400" />
                                                            Escribir por
                                                            WhatsApp
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-zinc-500">
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
