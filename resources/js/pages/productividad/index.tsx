import { Head } from '@inertiajs/react';
import {
    Activity,
    Scissors,
    Clock,
    Calendar,
    CheckCircle2,
    Award,
} from 'lucide-react';
import { useState } from 'react';

type Periodo = 'dia' | 'semana' | 'mes';

type PeriodSummary = {
    totalServicios: number;
    tiempoPromedio: string;
    servicioEstrella: string;
};

type ActivityEntry = {
    id: number;
    client: string;
    service: string;
    time: string;
    duration: number | null;
    status: string;
};

export default function ProductividadIndex({
    summary,
    recentActivity,
}: {
    summary: Record<Periodo, PeriodSummary>;
    recentActivity: ActivityEntry[];
}) {
    const [selectedPeriod, setSelectedPeriod] = useState<Periodo>('semana');

    const currentData = summary[selectedPeriod];

    return (
        <>
            <Head title="Mi Productividad y Rendimiento" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera */}
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <Activity className="size-6 text-emerald-400" />
                            Mi Productividad en Silla
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Métricas operativas de volumen de servicios, tiempos
                            de atención y ritmo de trabajo físico.
                        </p>
                    </div>

                    {/* Selector rápido de periodo */}
                    <div className="flex shrink-0 items-center rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-1">
                        {(['dia', 'semana', 'mes'] as Periodo[]).map(
                            (period) => (
                                <button
                                    key={period}
                                    onClick={() => setSelectedPeriod(period)}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                        selectedPeriod === period
                                            ? 'bg-zinc-800 text-white shadow-sm'
                                            : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    {period === 'dia'
                                        ? 'Hoy'
                                        : period === 'semana'
                                          ? 'Esta Semana'
                                          : 'Este Mes'}
                                </button>
                            ),
                        )}
                    </div>
                </div>

                {/* Tarjetas de Métricas */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {/* Total de Servicios */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700">
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                        <div className="space-y-3 pl-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
                                    Servicios Realizados
                                </span>
                                <div className="flex size-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                                    <Scissors className="size-4" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight text-white">
                                    {currentData.totalServicios}{' '}
                                    <span className="text-sm font-normal text-zinc-400">
                                        cortes
                                    </span>
                                </h3>
                                <p className="mt-0.5 text-[11px] text-zinc-500">
                                    {selectedPeriod === 'dia'
                                        ? 'Completados hoy'
                                        : selectedPeriod === 'semana'
                                          ? 'Acumulado semanal'
                                          : 'Acumulado mensual'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tiempo Promedio */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700">
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
                        <div className="space-y-3 pl-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
                                    Tiempo Promedio
                                </span>
                                <div className="flex size-9 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                                    <Clock className="size-4" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight text-white">
                                    {currentData.tiempoPromedio}
                                </h3>
                                <p className="mt-0.5 text-[11px] text-zinc-500">
                                    Duración estimada por cliente
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Servicio Estrella */}
                    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all hover:border-zinc-700">
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
                        <div className="space-y-3 pl-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
                                    Servicio Más Solicitado
                                </span>
                                <div className="flex size-9 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                                    <Award className="size-4" />
                                </div>
                            </div>
                            <div>
                                <h3 className="truncate pt-1 text-base font-bold tracking-tight text-white">
                                    {currentData.servicioEstrella}
                                </h3>
                                <p className="mt-0.5 text-[11px] text-zinc-500">
                                    Alta demanda en tu estación
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bitácora Reciente */}
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold tracking-tight text-white">
                            Bitácora Reciente en Silla
                        </h2>
                        <span className="text-xs text-zinc-400">
                            Últimos servicios completados
                        </span>
                    </div>

                    {recentActivity.length === 0 ? (
                        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 py-12 text-center text-sm text-zinc-500">
                            Aún no hay servicios completados.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {recentActivity.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-all hover:border-zinc-700 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/60 text-zinc-300 sm:mt-0">
                                            <CheckCircle2 className="size-4 text-emerald-400" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h4 className="text-sm font-semibold text-white">
                                                    {item.client}
                                                </h4>
                                                <span className="text-xs text-zinc-400">
                                                    •
                                                </span>
                                                <span className="text-xs font-medium text-zinc-300">
                                                    {item.service}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-zinc-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="size-3" />{' '}
                                                    {item.time}
                                                </span>
                                                <span>
                                                    Estado:{' '}
                                                    <strong className="text-emerald-400">
                                                        {item.status}
                                                    </strong>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 border-t border-zinc-800/60 pt-3 sm:justify-end sm:border-t-0 sm:pt-0">
                                        <span className="inline-flex items-center gap-1 rounded-lg border border-zinc-700/50 bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-300">
                                            <Clock className="size-3 text-zinc-400" />{' '}
                                            {item.duration
                                                ? `${item.duration} min`
                                                : '—'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
