import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Scissors,
    Calendar,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    Sparkles,
    UserPlus,
    History,
} from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { formatDateTimeAMPM } from '@/lib/utils';

type Stats = {
    totalCuts: number;
    weeklyCuts: number;
    monthlyCuts: number;
    todayAppointments: number;
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

const toneDot: Record<ActivityEntry['tone'], string> = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    rose: 'bg-rose-500',
};

export default function Dashboard({
    stats,
    pendingAppointments,
    nextAppointment,
    activity,
}: {
    stats: Stats;
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

    return (
        <>
            <Head title={`Panel de ${barberName} | TuBarbero`} />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                {/* Cabecera y Acciones Rápidas */}
                <div className="flex flex-col gap-4 border-b border-zinc-800/80 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-1.5 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                                Panel de Control
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Hola, {barberName}
                        </h1>
                    </div>

                    <div className="flex w-full items-center gap-2 sm:w-auto">
                        <Link
                            href="/agenda/nuevo-turno"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition-colors hover:bg-zinc-200 sm:flex-none"
                        >
                            <UserPlus className="h-4 w-4" /> Nuevo Turno
                        </Link>
                    </div>
                </div>

                {/* Banner de Próxima Cita */}
                <div className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-slate-800/60 bg-gradient-to-r from-slate-900 to-zinc-950 p-5 shadow-xl sm:p-6 md:flex-row md:items-center">
                    {/* Decoración de fondo */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 text-slate-800/30">
                        <Clock className="h-32 w-32 -rotate-12 transform" />
                    </div>

                    {nextAppointment ? (
                        <>
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3.5 text-blue-400">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        Tu siguiente cliente
                                    </p>
                                    <h3 className="flex items-center gap-2 text-xl font-bold text-white sm:text-2xl">
                                        {nextAppointment.client}
                                        <span className="text-lg font-medium text-slate-400">
                                            ·{' '}
                                            {formatDateTimeAMPM(
                                                nextAppointment.start_time,
                                            )}
                                        </span>
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-300">
                                        {nextAppointment.service}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="relative z-10 text-sm text-slate-300">
                            No tienes citas confirmadas próximamente.
                        </div>
                    )}
                </div>

                {/* Grid de Métricas Principales */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Cortes de la Semana
                            </span>
                            <Sparkles className="h-4.5 w-4.5 text-emerald-400" />
                        </div>
                        <p className="text-2xl font-black text-white sm:text-3xl">
                            {stats.weeklyCuts}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Citas de Hoy
                            </span>
                            <Calendar className="h-4.5 w-4.5 text-blue-400" />
                        </div>
                        <p className="text-2xl font-black text-white sm:text-3xl">
                            {stats.todayAppointments}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Total Mensual
                            </span>
                            <Scissors className="h-4.5 w-4.5 text-slate-300" />
                        </div>
                        <p className="text-2xl font-black text-white sm:text-3xl">
                            {stats.monthlyCuts}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 transition-colors hover:border-zinc-700">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                                Histórico
                            </span>
                            <TrendingUp className="h-4.5 w-4.5 text-zinc-500" />
                        </div>
                        <p className="text-2xl font-black text-white sm:text-3xl">
                            {stats.totalCuts}
                        </p>
                    </div>
                </div>

                {/* Sección dividida: Pendientes y Actividad */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Citas Pendientes (Ocupa 2 columnas) */}
                    <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6 lg:col-span-2">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight text-white">
                                    Citas Pendientes
                                </h2>
                                <p className="mt-0.5 text-xs text-zinc-400">
                                    Solicitudes esperando tu aprobación
                                </p>
                            </div>
                            <span className="rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-xs font-bold text-zinc-300">
                                {pendingAppointments.length}
                            </span>
                        </div>

                        {pendingAppointments.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800/80 bg-zinc-900/20 py-10">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800">
                                    <CheckCircle2 className="h-5 w-5 text-zinc-400" />
                                </div>
                                <p className="text-sm font-medium text-zinc-300">
                                    Agenda al día
                                </p>
                                <p className="mt-1 text-xs text-zinc-500">
                                    No hay solicitudes pendientes.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingAppointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 transition hover:border-zinc-700 sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 shrink-0 rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-slate-300 sm:mt-0">
                                                <Calendar className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    {appointment.client}
                                                </p>
                                                <p className="mt-0.5 text-xs text-zinc-400">
                                                    {appointment.service} ·{' '}
                                                    {formatDateTimeAMPM(
                                                        appointment.start_time,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex w-full items-center gap-2 border-t border-zinc-900 pt-2 sm:w-auto sm:border-t-0 sm:pt-0">
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
                                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 disabled:opacity-50 sm:flex-none"
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
                                                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-500/20 disabled:opacity-50 sm:flex-none"
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

                    {/* Actividad Reciente (Ocupa 1 columna) */}
                    <div className="flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-lg font-bold tracking-tight text-white">
                                Actividad
                            </h2>
                            <History className="h-4.5 w-4.5 text-zinc-500" />
                        </div>

                        {activity.length === 0 ? (
                            <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-zinc-800/80 bg-zinc-900/20 py-10 text-center text-xs text-zinc-500">
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
                                            <div className="absolute top-7 bottom-[-16px] left-[11px] w-[1px] bg-zinc-800"></div>
                                        )}
                                        <div className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
                                            <div
                                                className={`h-2 w-2 rounded-full ${toneDot[item.tone]}`}
                                            ></div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-200">
                                                {item.title}
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Link
                            href="/productividad"
                            className="mt-6 w-full rounded-lg border border-zinc-800/80 bg-zinc-800/40 py-2 text-center text-xs font-semibold text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                        >
                            Ver historial completo
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: any) => (
    <AppLayout
        breadcrumbs={[
            {
                title: '',
                href: '/dashboard',
            },
        ]}
    >
        {page}
    </AppLayout>
);
