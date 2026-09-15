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

    const todayLabel = new Intl.DateTimeFormat('es-VE', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    }).format(new Date());

    return (
        <>
            <Head title="Panel de Administración | TuBarbero" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title={`Bienvenido, ${auth.user.name}`}
                    description="Supervisa el flujo de la plataforma, gestiona tu equipo y controla los servicios."
                    actions={
                        <>
                            <Link
                                href="/admin/barbers/create"
                                className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
                            >
                                <UserPlus className="h-4 w-4 text-muted-foreground" />
                                Nuevo Barbero
                            </Link>
                            <Link
                                href="/admin/services/create"
                                className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                <Plus className="h-4 w-4" />
                                Nuevo Servicio
                            </Link>
                        </>
                    }
                />

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                    <div className="flex items-center gap-2">
                        <span className="size-1.5 bg-brand" aria-hidden="true" />
                        <span className="text-foreground">Hoy · {todayLabel}</span>
                    </div>
                    <span aria-hidden="true" className="hidden h-3.5 w-px bg-border sm:block" />
                    <span>Horario 9:00 — 20:00</span>
                    <span aria-hidden="true" className="hidden h-3.5 w-px bg-border sm:block" />
                    <span className="tabular text-foreground">
                        Citas hoy {stats.appointmentsToday}
                    </span>
                    <span className="tabular text-foreground">
                        Barberos {stats.activeBarbers}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
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

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-7">
                    <section className="lg:col-span-4">
                        <div className="flex items-center justify-between border border-b-0 border-border bg-card px-5 py-4">
                            <h2 className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
                                Últimas citas
                            </h2>
                            <Link
                                href="/admin/appointments"
                                className="flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                            >
                                Ver todas
                                <ArrowUpRight className="size-3.5" />
                            </Link>
                        </div>

                        {recentAppointments.length === 0 ? (
                            <div className="flex flex-col items-center gap-3 border border-border bg-card px-6 py-12 text-center">
                                <Calendar className="size-5 text-muted-foreground" />
                                <p className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
                                    Sin citas registradas
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Las nuevas reservas aparecerán automáticamente aquí.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border border border-border bg-card">
                                {recentAppointments.map((appointment) => {
                                    const status = appointmentStatus(
                                        appointment.status,
                                    );

                                    return (
                                        <div
                                            key={appointment.id}
                                            className="flex items-start justify-between gap-3 px-5 py-4"
                                        >
                                            <div className="flex min-w-0 items-start gap-4">
                                                <div
                                                    aria-hidden="true"
                                                    className="hidden h-8 w-8 shrink-0 place-items-center border border-border sm:grid"
                                                >
                                                    <Clock className="size-3.5 text-muted-foreground" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-foreground">
                                                        {appointment.client}
                                                        <span className="font-normal text-muted-foreground">
                                                            {' '}
                                                            · {appointment.barber}
                                                        </span>
                                                    </p>
                                                    <p className="mt-0.5 truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                                                        {appointment.service} ·{' '}
                                                        {formatDateTimeAMPM(
                                                            appointment.start_time,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="inline-flex shrink-0 items-center gap-1.5 border border-border px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-foreground/70 uppercase">
                                                <span
                                                    aria-hidden="true"
                                                    className={`size-1.5 ${status.dot}`}
                                                />
                                                {status.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    <section className="lg:col-span-3">
                        <div className="flex items-center justify-between border border-b-0 border-border bg-card px-5 py-4">
                            <h2 className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
                                Actividad reciente
                            </h2>
                            <Activity className="size-4 text-muted-foreground" />
                        </div>
                        <div className="border border-border bg-card">
                            {recentActivity.length === 0 ? (
                                <div className="px-6 py-12 text-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                                    Aún no hay actividad
                                </div>
                            ) : (
                                <div className="p-5">
                                    <ol className="space-y-5">
                                        {recentActivity.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className={`mt-1.5 size-2 shrink-0 ${activityTone(
                                                        item.tone,
                                                    )}`}
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-foreground">
                                                        {item.title}
                                                    </p>
                                                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}