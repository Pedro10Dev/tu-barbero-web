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

const productivitySummary: Record<
    Periodo,
    { totalServicios: number; tiempoPromedio: string; servicioEstrella: string }
> = {
    dia: {
        totalServicios: 6,
        tiempoPromedio: '32 min',
        servicioEstrella: 'Corte Degradado (Fade)',
    },
    semana: {
        totalServicios: 34,
        tiempoPromedio: '35 min',
        servicioEstrella: 'Corte Degradado (Fade)',
    },
    mes: {
        totalServicios: 142,
        tiempoPromedio: '34 min',
        servicioEstrella: 'Corte + Barba Completa',
    },
};

export default function ProductividadIndex() {
    const [selectedPeriod, setSelectedPeriod] = useState<Periodo>('semana');

    // Bitácora de servicios completados recientemente en la silla
    const recentActivity = [
        {
            id: 1,
            client: 'Miguel Torres',
            service: 'Corte Clásico + Barba',
            time: 'Hace 45 minutos',
            duration: '55 min',
            status: 'Completado',
        },
        {
            id: 2,
            client: 'Carlos Mendoza',
            service: 'Corte Degradado (Fade)',
            time: 'Hace 2 horas',
            duration: '40 min',
            status: 'Completado',
        },
        {
            id: 3,
            client: 'Andrés Silva',
            service: 'Mantenimiento de Barba',
            time: 'Hace 4 horas',
            duration: '30 min',
            status: 'Completado',
        },
        {
            id: 4,
            client: 'Gabriel Rojas',
            service: 'Corte Clásico',
            time: 'Ayer, 05:00 PM',
            duration: '30 min',
            status: 'Completado',
        },
    ];

    const currentData = productivitySummary[selectedPeriod];

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
                        <button
                            onClick={() => setSelectedPeriod('dia')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                selectedPeriod === 'dia'
                                    ? 'bg-zinc-800 text-white shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Hoy
                        </button>
                        <button
                            onClick={() => setSelectedPeriod('semana')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                selectedPeriod === 'semana'
                                    ? 'bg-zinc-800 text-white shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Esta Semana
                        </button>
                        <button
                            onClick={() => setSelectedPeriod('mes')}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                                selectedPeriod === 'mes'
                                    ? 'bg-zinc-800 text-white shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Este Mes
                        </button>
                    </div>
                </div>

                {/* Tarjetas de Métricas de Productividad (3 Columnas) */}
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

                {/* Bitácora Reciente de Actividad Operativa */}
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold tracking-tight text-white">
                            Bitácora Reciente en Silla
                        </h2>
                        <span className="text-xs text-zinc-400">
                            Últimos servicios completados
                        </span>
                    </div>

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
                                        {item.duration}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
