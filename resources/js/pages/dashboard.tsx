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
    ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import AppLayout from '@/layouts/app-layout';
import { activityTone } from '@/lib/status';
import { formatTimeAMPM } from '@/lib/utils';

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

    const todayLabel = new Intl.DateTimeFormat('es-VE', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
    }).format(new Date());

    const nextDate = nextAppointment?.start_time.split(' ')[0];
    const nextTime = nextAppointment
        ? formatTimeAMPM(nextAppointment.start_time.split(' ')[1])
        : '';

    return (
        <>
            <Head title={`Panel de ${barberName} | TuBarbero`} />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title={`Hola, ${barberName}`}
                    description="Resumen de tu estación: los turnos del día, las solicitudes pendientes y la actividad de hoy."
                    actions={
                        <Link
                            href="/agenda/nuevo-turno"
                            className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                            <UserPlus className="h-4 w-4" /> Nuevo Turno
                        </Link>
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
                        Citas hoy {stats.todayAppointments}
                    </span>
                    <span className="tabular text-foreground">
                        Pendientes {pendingAppointments.length}
                    </span>
                </div>

                {nextAppointment ? (
                    <section className="relative border border-border bg-card">
                        <span
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-px bg-brand"
                        />
                        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-center gap-6">
                                <div
                                    aria-hidden="true"
                                    className="hidden h-20 w-20 shrink-0 place-items-center border border-border sm:grid"
                                >
                                    <Clock className="size-8 text-brand" />
                                </div>
                                <div>
                                    <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                                        Próximo turno
                                    </p>
                                    <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                        <span className="tabular font-mono text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                                            {nextTime}
                                        </span>
                                        <span className="font-serif text-xl tracking-tight text-foreground sm:text-2xl">
                                            {nextAppointment.client}
                                        </span>
                                    </div>
                                    <p className="mt-2 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                                        {nextAppointment.service} · {nextDate}
                                    </p>
                                </div>
                            </div>
                            <span className="inline-flex w-fit items-center gap-2 border border-brand/40 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-brand uppercase">
                                <span className="size-1.5 bg-brand" aria-hidden="true" />
                                Confirmado
                            </span>
                        </div>
                    </section>
                ) : (
                    <section className="flex flex-col items-start gap-3 border border-border bg-card p-6 sm:p-8">
                        <p className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
                            Sin turnos confirmados
                        </p>
                        <p className="max-w-xl text-sm text-muted-foreground">
                            Cuando confirmes una reserva, el próximo turno aparecerá aquí
                            como un ticket.
                        </p>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4">
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

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    <section className="lg:col-span-2">
                        <div className="flex items-center justify-between border border-b-0 border-border bg-card px-5 py-4">
                            <h2 className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
                                Pendientes
                            </h2>
                            <span className="tabular border border-border px-2 py-1 font-mono text-[11px] text-foreground/80">
                                {pendingAppointments.length}
                            </span>
                        </div>

                        {pendingAppointments.length === 0 ? (
                            <div className="flex flex-col items-center gap-3 border border-border bg-card px-6 py-12 text-center">
                                <CheckCircle2 className="size-5 text-brand" />
                                <p className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
                                    Agenda al día
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    No hay solicitudes pendientes por aprobar.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border border border-border bg-card">
                                {pendingAppointments.map((appointment) => {
                                    const [date, time] =
                                        appointment.start_time.split(' ');

                                    return (
                                        <div
                                            key={appointment.id}
                                            className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="tabular w-20 shrink-0 font-mono text-sm font-medium text-foreground">
                                                    {formatTimeAMPM(time)}
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-foreground">
                                                        {appointment.client}
                                                    </p>
                                                    <p className="mt-0.5 truncate font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                                                        {appointment.service} · {date}
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
                                                    className="inline-flex flex-1 items-center justify-center gap-1.5 border border-brand bg-brand px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.14em] text-brand-foreground uppercase transition-colors hover:bg-brand/85 disabled:opacity-50 sm:flex-none"
                                                >
                                                    <CheckCircle2 className="size-3.5" />
                                                    {decidingId === appointment.id
                                                        ? 'Procesando…'
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
                                                    className="inline-flex flex-1 items-center justify-center gap-1.5 border border-border px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:border-destructive/60 hover:text-destructive disabled:opacity-50 sm:flex-none"
                                                >
                                                    <XCircle className="size-3.5" />
                                                    {decidingId === appointment.id
                                                        ? 'Procesando…'
                                                        : 'Rechazar'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    <section>
                        <div className="flex items-center justify-between border border-b-0 border-border bg-card px-5 py-4">
                            <h2 className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
                                Actividad
                            </h2>
                            <History className="size-4 text-muted-foreground" />
                        </div>
                        <div className="border border-border bg-card">
                            {activity.length === 0 ? (
                                <div className="px-6 py-12 text-center font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase">
                                    Aún no hay actividad
                                </div>
                            ) : (
                                <div className="p-5">
                                    <ol className="space-y-5">
                                        {activity.map((item, index) => (
                                            <li
                                                key={item.id}
                                                className="relative flex items-start gap-3 pl-5"
                                            >
                                                {index < activity.length - 1 && (
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute top-4 bottom-[-8px] left-[3px] w-px bg-border"
                                                    />
                                                )}
                                                <span
                                                    aria-hidden="true"
                                                    className={`absolute top-1.5 left-0 size-2 ${activityTone(
                                                        item.tone,
                                                    )}`}
                                                />
                                                <div>
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
                            <div className="border-t border-border">
                                <Link
                                    href="/productividad"
                                    className="flex items-center justify-between px-5 py-3 font-mono text-[11px] tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
                                >
                                    Ver historial completo
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = AppLayout;