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
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { activityTone, appointmentStatus } from '@/lib/status';
import { formatDateTimeAMPM } from '@/lib/utils';

type AdminStats = {
    totalUsers: number;
    totalAppointments: number;
    activeBarbers: number;
    appointmentsToday: number;
    totalServices: number;
};

type TrendPoint = {
    label: string;
    value: number;
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

export default function AdminDashboard({
    stats,
    trend,
    recentAppointments,
    recentActivity,
}: {
    stats: AdminStats;
    trend: TrendPoint[];
    recentAppointments: RecentAppointment[];
    recentActivity: ActivityEntry[];
}) {
    const { auth } = usePage().props;
    const trendValues = trend.map((point) => point.value);

    return (
        <>
            <Head title="Panel de Administración" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title={`Bienvenido, ${auth.user.name}`}
                    description="Supervisa el flujo de la plataforma, gestiona tu equipo y controla los servicios."
                    actions={
                        <>
                            <Link
                                href="/admin/barbers/create"
                                className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                            >
                                <UserPlus className="h-4 w-4 text-muted-foreground" />
                                Nuevo Barbero
                            </Link>
                            <Link
                                href="/admin/services/create"
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                            >
                                <Plus className="h-4 w-4" />
                                Nuevo Servicio
                            </Link>
                        </>
                    }
                />

                {/* KPIs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        label="Usuarios Totales"
                        value={stats.totalUsers}
                        icon={Users}
                        hint="Registrados globalmente"
                    />
                    <StatCard
                        label="Citas Históricas"
                        value={stats.totalAppointments}
                        icon={Calendar}
                        hint="Acumulado histórico"
                    />
                    <StatCard
                        label="Barberos"
                        value={stats.activeBarbers}
                        icon={Scissors}
                        hint="Con perfil configurado"
                    />
                    <StatCard
                        label="Citas de Hoy"
                        value={stats.appointmentsToday}
                        icon={CalendarCheck}
                        hint="Para el día actual"
                        trend={trendValues}
                    />
                    <StatCard
                        label="Servicios"
                        value={stats.totalServices}
                        icon={Briefcase}
                        hint="Disponibles en catálogo"
                    />
                </div>

                {/* Citas recientes + actividad */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4 flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-base font-semibold text-foreground">
                                Últimas Citas Registradas
                            </h3>
                            <Link
                                href="/admin/appointments"
                                className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Ver todas{' '}
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="flex flex-1 flex-col gap-3">
                            {recentAppointments.length === 0 ? (
                                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
                                    <Calendar className="mb-2 h-8 w-8 text-muted-foreground" />
                                    <p className="text-sm font-medium text-foreground">
                                        No hay citas recientes registradas
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Las nuevas reservas aparecerán
                                        automáticamente aquí.
                                    </p>
                                </div>
                            ) : (
                                recentAppointments.map((appointment) => {
                                    const status = appointmentStatus(
                                        appointment.status,
                                    );

                                    return (
                                        <div
                                            key={appointment.id}
                                            className="flex items-start justify-between gap-3 rounded-lg border border-border bg-muted/40 p-3"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                                                    <Clock className="h-3.5 w-3.5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-foreground">
                                                        {appointment.client}
                                                        <span className="font-normal text-muted-foreground">
                                                            {' '}
                                                            ·{' '}
                                                            {appointment.barber}
                                                        </span>
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                                                        {appointment.service} ·{' '}
                                                        {formatDateTimeAMPM(
                                                            appointment.start_time,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <span
                                                className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${status.chip}`}
                                            >
                                                {status.label}
                                            </span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    <div className="col-span-3 flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                        <div className="mb-4 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-base font-semibold text-foreground">
                                Actividad Reciente
                            </h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            {recentActivity.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-xs text-muted-foreground">
                                    Aún no hay actividad registrada.
                                </div>
                            ) : (
                                recentActivity.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-3"
                                    >
                                        <div
                                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${activityTone(item.tone)}`}
                                        ></div>
                                        <div className="flex-1">
                                            <p className="text-xs font-medium text-foreground">
                                                {item.title}
                                            </p>
                                            <p className="mt-0.5 text-[11px] text-muted-foreground">
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
