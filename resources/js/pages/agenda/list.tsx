import { Head } from '@inertiajs/react';
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
} from 'lucide-react';
import { useState } from 'react';

// Datos de ejemplo ampliados con correo e info detallada
const mockAppointments = [
    {
        id: 1,
        client: 'Miguel Torres',
        email: 'miguel.torres@gmail.com',
        phone: '+584125551234',
        phoneFormatted: '+58 412-5551234',
        service: 'Corte Clásico + Barba',
        duration: '45 mins',
        price: '$20.00',
        time: 'Hoy, 02:30 PM',
        notes: 'El cliente prefiere un desvanecido bajo en los lados.',
        status: 'pending',
    },
    {
        id: 2,
        client: 'Carlos Mendoza',
        email: 'carlos.mendoza@outlook.com',
        phone: '+584145559876',
        phoneFormatted: '+58 414-5559876',
        service: 'Corte Degradado',
        duration: '30 mins',
        price: '$15.00',
        time: 'Hoy, 04:30 PM',
        notes: 'Viene puntual, cliente frecuente.',
        status: 'confirmed',
    },
    {
        id: 3,
        client: 'Andrés Silva',
        email: 'andres.silva@yahoo.com',
        phone: '+584245554321',
        phoneFormatted: '+58 424-5554321',
        service: 'Mantenimiento de Barba',
        duration: '25 mins',
        price: '$12.00',
        time: 'Mañana, 10:00 AM',
        notes: 'Primera vez en la barbería.',
        status: 'pending',
    },
];

export default function AgendaList() {
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>(
        'all',
    );
    // Estado para llevar el control de qué tarjeta está expandida por su ID
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Filtrar citas según el estado seleccionado
    const filteredAppointments = mockAppointments.filter((app) => {
        if (filter === 'pending') {
            return app.status === 'pending';
        }

        if (filter === 'confirmed') {
            return app.status === 'confirmed';
        }

        return true;
    });

    const pendingCount = mockAppointments.filter(
        (app) => app.status === 'pending',
    ).length;

    return (
        <>
            <Head title="Gestión de Citas" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera y Resumen Superior alineado con el resto del sistema */}
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

                    {/* Tarjeta de Resumen Rápido Estética */}
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

                {/* Filtros de Estado y Botón de Nuevo Turno */}
                <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    {/* Barra de Búsqueda */}
                    <div className="relative flex w-full items-center">
                        <Search className="absolute left-3.5 size-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Buscar cliente, teléfono o servicio..."
                            className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none"
                        />
                    </div>

                    <div className="flex w-full shrink-0 items-center justify-between gap-3 sm:w-auto sm:justify-end">
                        {/* Filtros de Estado */}
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

                        {/* Botón de Nuevo Turno Manual */}
                        <button className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-zinc-950 shadow-sm transition hover:bg-zinc-200">
                            <Plus className="size-4" />
                            Nuevo Turno
                        </button>
                    </div>
                </div>

                {/* Listado de Citas con tarjetas expandibles */}
                <div className="flex flex-col gap-3">
                    {filteredAppointments.length === 0 ? (
                        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
                            No hay citas que coincidan con este filtro.
                        </div>
                    ) : (
                        filteredAppointments.map((app) => {
                            const isPending = app.status === 'pending';
                            const isExpanded = expandedId === app.id;

                            return (
                                <div
                                    key={app.id}
                                    className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-900/40 transition-all duration-300 ${
                                        isExpanded
                                            ? 'border-zinc-700/80 shadow-lg shadow-black/20'
                                            : 'border-zinc-800/80 hover:border-zinc-700/80'
                                    }`}
                                >
                                    {/* Barra indicadora lateral izquierda dinámica según estado */}
                                    <div
                                        className={`absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300 ${
                                            isPending
                                                ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                                                : 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                                        }`}
                                    />

                                    {/* Cabecera principal de la tarjeta */}
                                    <div
                                        onClick={() => toggleExpand(app.id)}
                                        className="flex cursor-pointer flex-col justify-between gap-4 p-5 pl-6 select-none sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`flex size-11 shrink-0 items-center justify-center rounded-xl border ${
                                                    isPending
                                                        ? 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                                                        : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                                }`}
                                            >
                                                {isPending ? (
                                                    <AlertCircle className="size-5" />
                                                ) : (
                                                    <CheckCircle2 className="size-5" />
                                                )}
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    <h3 className="text-base font-semibold text-white">
                                                        {app.client}
                                                    </h3>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                                                            isPending
                                                                ? 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                                                                : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                                        }`}
                                                    >
                                                        {isPending
                                                            ? 'Pendiente de aprobación'
                                                            : 'Confirmada'}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                                                    <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                                                        <Scissors className="size-3.5 text-zinc-500" />
                                                        {app.service}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="size-3.5 text-zinc-500" />
                                                        {app.time}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Phone className="size-3.5 text-zinc-500" />
                                                        {app.phoneFormatted}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Controles de la derecha */}
                                        <div
                                            className="flex items-center gap-2 self-end sm:self-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {isPending && (
                                                <button className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500">
                                                    Aprobar
                                                </button>
                                            )}
                                            <button className="flex items-center gap-1.5 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white">
                                                Estado
                                            </button>
                                            <button
                                                className="flex size-9 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/60 text-zinc-400 transition hover:bg-zinc-700 hover:text-red-400"
                                                title="Cancelar turno"
                                            >
                                                <XCircle className="size-4" />
                                            </button>

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

                                    {/* Contenido Desplegable Animado */}
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
                                                            {app.email}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="block font-semibold tracking-wider text-zinc-500 uppercase">
                                                            Detalles del
                                                            Servicio
                                                        </span>
                                                        <span className="block font-medium text-zinc-300">
                                                            {app.price} •{' '}
                                                            {app.duration}{' '}
                                                            estimada
                                                        </span>
                                                    </div>

                                                    <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                                        <span className="block font-semibold tracking-wider text-zinc-500 uppercase">
                                                            Notas /
                                                            Observaciones
                                                        </span>
                                                        <p className="text-zinc-400 italic">
                                                            "{app.notes}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 items-center border-t border-zinc-800/40 pt-4 md:border-t-0 md:pt-0">
                                                    <a
                                                        href={`https://wa.me/${app.phone}?text=Hola%20${encodeURIComponent(app.client)},%20te%20contacto%20desde%20TuBarbero%20en%20relación%20a%20tu%20cita%20de%20${encodeURIComponent(app.service)}...`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600/20 px-4 py-2.5 text-xs font-semibold text-emerald-300 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-600/30 md:w-auto"
                                                    >
                                                        <MessageSquare className="size-4 text-emerald-400" />
                                                        Escribir por WhatsApp
                                                    </a>
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
