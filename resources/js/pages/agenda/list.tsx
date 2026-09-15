import { Head, Link, router } from '@inertiajs/react';
import {
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
import { PageHeader } from '@/components/page-header';
import { appointmentStatus } from '@/lib/status';
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

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Gestión de Citas y Solicitudes"
                    description="Revisa solicitudes pendientes por la web o administra turnos de forma manual en estación."
                    actions={
                        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                            <div className="flex size-10 items-center justify-center rounded-lg border border-warning/25 bg-warning/10 text-warning">
                                <AlertCircle className="size-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Solicitudes Pendientes
                                </span>
                                <span className="tabular text-base font-bold text-foreground">
                                    {pendingCount}{' '}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        por aprobar
                                    </span>
                                </span>
                            </div>
                        </div>
                    }
                />

                {/* Filtros y Búsqueda */}
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="relative flex w-full items-center">
                        <Search className="absolute left-3.5 size-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar cliente, teléfono o servicio..."
                            className="w-full rounded-lg border border-border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
                        />
                    </div>

                    <div className="flex w-full shrink-0 items-center justify-between gap-3 sm:w-auto sm:justify-end">
                        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
                            <button
                                onClick={() => setFilter('all')}
                                aria-pressed={filter === 'all'}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'all'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                aria-pressed={filter === 'pending'}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'pending'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Solicitudes
                            </button>
                            <button
                                onClick={() => setFilter('confirmed')}
                                aria-pressed={filter === 'confirmed'}
                                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                                    filter === 'confirmed'
                                        ? 'bg-card text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Confirmadas
                            </button>
                        </div>

                        <Link
                            href="/agenda/nuevo-turno"
                            className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                        >
                            <Plus className="size-4" />
                            Nuevo Turno
                        </Link>
                    </div>
                </div>

                {/* Listado de Citas */}
                <div className="flex flex-col gap-3">
                    {visibleAppointments.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
                            No hay citas que coincidan con este filtro.
                        </div>
                    ) : (
                        visibleAppointments.map((app) => {
                            const config = appointmentStatus(app.status);
                            const StatusIcon = config.icon;
                            const isExpanded = expandedId === app.id;
                            const isUpdating = updatingId === app.id;
                            const isPending = app.status === 'pending';

                            return (
                                <div
                                    key={app.id}
                                    className={`group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 ${
                                        isExpanded
                                            ? 'border-border shadow-lg shadow-foreground/10'
                                            : 'border-border hover:border-foreground/40'
                                    }`}
                                >
                                    <div
                                        className={`absolute top-0 bottom-0 left-0 w-1 transition-colors duration-300 ${config.bar}`}
                                    />

                                    {/* Cabecera */}
                                    <div
                                        onClick={() => toggleExpand(app.id)}
                                        className="flex cursor-pointer flex-col justify-between gap-4 p-5 pl-6 select-none sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`flex size-11 shrink-0 items-center justify-center rounded-lg border ${config.chip}`}
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
                                                        className="flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90 disabled:opacity-50"
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
                                                        className="flex items-center gap-1.5 rounded-lg border border-destructive/25 bg-destructive/10 px-3.5 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/20 disabled:opacity-50"
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
                                                        className="flex items-center gap-1.5 rounded-lg bg-info px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-info/90 disabled:opacity-50"
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
                                                        className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3.5 py-2 text-xs font-semibold text-foreground transition hover:bg-accent disabled:opacity-50"
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
                                                className="ml-1 flex items-center gap-2 rounded-lg border border-border bg-muted px-3.5 py-2 text-xs font-medium text-foreground transition hover:bg-accent"
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
                                                        <span className="tabular block font-medium text-foreground">
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
                                                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-2.5 text-xs font-semibold text-success transition hover:bg-success/20 md:w-auto"
                                                        >
                                                            <MessageSquare className="size-4" />
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
