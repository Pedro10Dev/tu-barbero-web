import { Head, Link, usePage } from '@inertiajs/react';
import {
    Users,
    Calendar,
    CalendarCheck,
    Scissors,
    UserPlus,
    Plus,
    Briefcase,
    ArrowUpRight,
    Activity,
    Clock,
} from 'lucide-react';
import { formatDateTimeAMPM } from '@/lib/utils';

type AdminStats = {
    totalUsers: number;
    totalAppointments: number;
    activeBarbers: number;
    appointmentsToday: number;
    totalServices: number;
};

type RecentAppointment = {
    id: number;
    client: string;
    barber: string;
    service: string;
    start_time: string;
    status: string;
};

type ActivityEntry = {
    id: string;
    title: string;
    description: string;
    tone: 'emerald' | 'blue' | 'rose';
};

const statusChip: Record<string, string> = {
    pending: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
    confirmed: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    rejected: 'border-rose-500/20 bg-rose-500/10 text-rose-400',
    cancelled: 'border-zinc-700/60 bg-zinc-800/80 text-zinc-400',
    completed: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
};

const statusLabel: Record<string, string> = {
    pending: 'Pendiente',
    confirmed: 'Confirmada',
    rejected: 'Rechazada',
    cancelled: 'Cancelada',
    completed: 'Completada',
};

const toneDot: Record<ActivityEntry['tone'], string> = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    rose: 'bg-rose-500',
};

export default function AdminDashboard({
    stats,
    recentAppointments,
    recentActivity,
}: {
    stats: AdminStats;
    recentAppointments: RecentAppointment[];
    recentActivity: ActivityEntry[];
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Panel de Administración" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 md:p-8">
                {/* Cabecera con Bienvenida y Atajos */}
                <div className="flex flex-col gap-4 border-b border-sidebar-border/50 pb-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                                Rol: Administrador
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Bienvenido, {auth.user.name}
                        </h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            Supervisa el flujo de la plataforma, gestiona tu
                            equipo y controla los servicios.
                        </p>
                    </div>

                    {/* Botones de Acción / Atajos Rápidos */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/barbers/create"
                            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:border-zinc-600 hover:bg-zinc-800"
                        >
                            <UserPlus className="h-4 w-4 text-zinc-400" />
                            Nuevo Barbero
                        </Link>
                        <Link
                            href="/admin/services/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-sm transition-all hover:bg-zinc-200"
                        >
                            <Plus className="h-4 w-4" />
                            Nuevo Servicio
                        </Link>
                    </div>
                </div>

                {/* Tarjetas de Métricas (KPIs) con Estilo Moderno */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {/* Usuarios Totales */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Usuarios Totales
                            </h3>
                            <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-2.5 text-zinc-300">
                                <Users className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">
                                {stats.totalUsers}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                                Registrados globalmente
                            </p>
                        </div>
                    </div>

                    {/* Citas Históricas */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Citas Históricas
                            </h3>
                            <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/50 p-2.5 text-zinc-300">
                                <Calendar className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">
                                {stats.totalAppointments}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                                Acumulado histórico
                            </p>
                        </div>
                    </div>

                    {/* Barberos Activos */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Barberos Activos
                            </h3>
                            <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-2.5 text-purple-400">
                                <Scissors className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">
                                {stats.activeBarbers}
                            </p>
                            <p className="mt-1 text-xs font-medium text-purple-400/90">
                                Con perfil configurado
                            </p>
                        </div>
                    </div>

                    {/* Citas de Hoy */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Citas de Hoy
                            </h3>
                            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-400">
                                <CalendarCheck className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">
                                {stats.appointmentsToday}
                            </p>
                            <p className="mt-1 text-xs font-medium text-blue-400">
                                Para el día actual
                            </p>
                        </div>
                    </div>

                    {/* Servicios Totales */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Servicios
                            </h3>
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-emerald-400">
                                <Briefcase className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">
                                {stats.totalServices}
                            </p>
                            <p className="mt-1 text-xs font-medium text-emerald-400">
                                Disponibles en catálogo
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección Inferior de Contenido */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    {/* Columna Principal: Últimas Citas */}
                    <div className="col-span-4 flex flex-col rounded-2xl border border-sidebar-border/70 bg-card/60 p-6 shadow-sm backdrop-blur-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <h3 className="text-base font-semibold text-white">
                                    Últimas Citas Registradas
                                </h3>
                            </div>
                            <Link
                                href="/admin/appointments"
                                className="flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                            >
                                Ver todas{' '}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="flex flex-1 flex-col gap-3">
                            {recentAppointments.length === 0 ? (
                                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-sidebar-border/60 bg-zinc-900/20 p-8 text-center">
                                    <Calendar className="mb-2 h-8 w-8 text-zinc-600" />
                                    <p className="text-sm font-medium text-zinc-300">
                                        No hay citas recientes registradas
                                    </p>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        Las nuevas reservas aparecerán
                                        automáticamente aquí.
                                    </p>
                                </div>
                            ) : (
                                recentAppointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="flex items-start justify-between gap-3 rounded-xl border border-sidebar-border/40 bg-zinc-900/30 p-3"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700/50 bg-zinc-800/60 text-zinc-300">
                                                <Clock className="h-3.5 w-3.5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-white">
                                                    {appointment.client}
                                                    <span className="font-normal text-zinc-400">
                                                        {' '}
                                                        · {appointment.barber}
                                                    </span>
                                                </p>
                                                <p className="mt-0.5 text-[11px] text-zinc-400">
                                                    {appointment.service} ·{' '}
                                                    {formatDateTimeAMPM(
                                                        appointment.start_time,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <span
                                            className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusChip[appointment.status] ?? statusChip.pending}`}
                                        >
                                            {statusLabel[appointment.status] ??
                                                appointment.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Columna Secundaria: Actividad del Sistema */}
                    <div className="col-span-3 flex flex-col rounded-2xl border border-sidebar-border/70 bg-card/60 p-6 shadow-sm backdrop-blur-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-zinc-400" />
                            <h3 className="text-base font-semibold text-white">
                                Actividad Reciente
                            </h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            {recentActivity.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-sidebar-border/60 bg-zinc-900/20 p-6 text-center text-xs text-zinc-500">
                                    Aún no hay actividad registrada.
                                </div>
                            ) : (
                                recentActivity.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start gap-3 rounded-xl border border-sidebar-border/40 bg-zinc-900/30 p-3"
                                    >
                                        <div
                                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[item.tone]}`}
                                        ></div>
                                        <div className="flex-1">
                                            <p className="text-xs font-medium text-white">
                                                {item.title}
                                            </p>
                                            <p className="mt-0.5 text-[11px] text-zinc-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
