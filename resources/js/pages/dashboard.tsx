import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Scissors,
    Calendar,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    UserPlus,
    History,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import AppLayout from '@/layouts/app-layout';
import { activityTone } from '@/lib/status';
import { formatDateTimeAMPM } from '@/lib/utils';

type Stats = {
    totalCuts: number;
    weeklyCuts: number;
    monthlyCuts: number;
    todayAppointments: number;
};

type TrendPoint = {
    label: string;
    value: number;
};

type PendingAppointment = {
    id: number;
    client: string;
    start_time: string;
    service: string;
};

type NextAppointment = {
    client: string;
    start_time: string;
    service: string;
};

type ActivityEntry = {
    id: number;
    title: string;
    description: string;
    tone: 'emerald' | 'blue' | 'rose';
};

export default function Dashboard({
    stats,
    trend,
    pendingAppointments,
    nextAppointment,
    activity,
}: {
    stats: Stats;
    trend: TrendPoint[];
    pendingAppointments: PendingAppointment[];
    nextAppointment: NextAppointment | null;
    activity: ActivityEntry[];
}) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string } } };
    const barberName = auth?.user?.name || 'Barbero';

    const [decidingId, setDecidingId] = useState<number | null>(null);

    const decide = (id: number, action: 'accept' | 'reject') => {
        setDecidingId(id);
        router.patch(
            `/agenda/appointments/${id}`,
            { action },
            {
                onFinish: () => setDecidingId(null),
                onError: () => setDecidingId(null),
            },
        );
    };

    const trendValues = trend.map((point) => point.value);

    return (
        <>
            <Head title={`Panel de ${barberName} | TuBarbero`} />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title={`Hola, ${barberName}`}
                    description="Resumen de tu agenda, pendientes y actividad de hoy."
                    actions={
                        <Link
                            href="/agenda/nuevo-turno"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:flex-none"
                        >
                            <UserPlus className="h-4 w-4" /> Nuevo Turno
                        </Link>
                    }
                />

                {/* Próxima cita confirmada */}
                <div className="flex flex-col justify-between gap-5 rounded-xl border border-brand/30 bg-brand/5 p-5 sm:flex-row sm:items-center sm:p-6 dark:border-brand/40 dark:bg-brand/10">
                    {nextAppointment ? (
                        <>
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg border border-brand/30 bg-brand/10 p-3.5 text-brand">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                        Tu siguiente cliente
                                    </p>
                                    <h3 className="flex flex-wrap items-center gap-x-2 text-xl font-bold text-foreground sm:text-2xl">
                                        {nextAppointment.client}
                                        <span className="text-lg font-medium text-muted-foreground">
                                            ·{' '}
                                            {formatDateTimeAMPM(
                                                nextAppointment.start_time,
                                            )}
                                        </span>
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {nextAppointment.service}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-sm text-muted-foreground">
                            No tienes citas confirmadas próximamente.
                        </p>
                    )}
                </div>

                {/* Métricas principales */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        label="Cortes de la Semana"
                        value={stats.weeklyCuts}
                        icon={Sparkles}
                        trend={trendValues}
                    />
                    <StatCard
                        label="Citas de Hoy"
                        value={stats.todayAppointments}
                        icon={Calendar}
                    />
                    <StatCard
                        label="Total Mensual"
                        value={stats.monthlyCuts}
                        icon={Scissors}
                    />
                    <StatCard
                        label="Histórico"
                        value={stats.totalCuts}
                        icon={TrendingUp}
                    />
                </div>

                {/* Pendientes y actividad */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6 lg:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight text-foreground">
                                    Citas Pendientes
                                </h2>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    Solicitudes esperando tu aprobación
                                </p>
                            </div>
                            <span className="tabular rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-bold text-foreground">
                                {pendingAppointments.length}
                            </span>
                        </div>

                        {pendingAppointments.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-10 text-center">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-medium text-foreground">
                                    Agenda al día
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">
                                    No hay solicitudes pendientes.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingAppointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="flex flex-col justify-between gap-4 rounded-lg border border-border bg-muted/40 p-4 transition hover:border-foreground/25 sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 shrink-0 rounded-lg border border-border bg-muted p-2 text-muted-foreground sm:mt-0">
                                                <Calendar className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">
                                                    {appointment.client}
                                                </p>
                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                    {appointment.service} ·{' '}
                                                    {formatDateTimeAMPM(
                                                        appointment.start_time,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center gap-2 sm:w-auto">
                                            <button
                                                onClick={() =>
                                                    decide(
                                                        appointment.id,
                                                        'accept',
                                                    )
                                                }
                                                disabled={
                                                    decidingId ===
                                                    appointment.id
                                                }
                                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success transition hover:bg-success/20 disabled:opacity-50 sm:flex-none"
                                            >
                                                <CheckCircle2 className="h-3.5 w-3.5" />{' '}
                                                {decidingId === appointment.id
                                                    ? 'Procesando...'
                                                    : 'Aceptar'}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    decide(
                                                        appointment.id,
                                                        'reject',
                                                    )
                                                }
                                                disabled={
                                                    decidingId ===
                                                    appointment.id
                                                }
                                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition hover:bg-destructive/20 disabled:opacity-50 sm:flex-none"
                                            >
                                                <XCircle className="h-3.5 w-3.5" />{' '}
                                                {decidingId === appointment.id
                                                    ? 'Procesando...'
                                                    : 'Rechazar'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-lg font-bold tracking-tight text-foreground">
                                Actividad
                            </h2>
                            <History className="h-4.5 w-4.5 text-muted-foreground" />
                        </div>

                        {activity.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-card py-10 text-center text-xs text-muted-foreground">
                                Aún no hay actividad registrada.
                            </div>
                        ) : (
                            <div className="flex-1 space-y-4">
                                {activity.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="relative flex items-start gap-4"
                                    >
                                        {index < activity.length - 1 && (
                                            <div className="absolute top-7 bottom-[-16px] left-[11px] w-[1px] bg-muted"></div>
                                        )}
                                        <div className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                                            <div
                                                className={`h-2 w-2 rounded-full ${activityTone(item.tone)}`}
                                            ></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground">
                                                {item.title}
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Link
                            href="/productividad"
                            className="mt-6 w-full rounded-lg border border-border bg-muted py-2 text-center text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                            Ver historial completo
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = AppLayout;
