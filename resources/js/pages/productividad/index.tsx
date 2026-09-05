import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, Scissors, Clock, Zap, Calendar, CheckCircle2, Award } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel Principal',
        href: '/dashboard',
    },
    {
        title: 'Mi Productividad',
        href: '/productividad',
    },
];

type Periodo = 'dia' | 'semana' | 'mes';

const productivitySummary: Record<Periodo, { totalServicios: number; tiempoPromedio: string; servicioEstrella: string }> = {
    dia: { totalServicios: 6, tiempoPromedio: '32 min', servicioEstrella: 'Corte Degradado (Fade)' },
    semana: { totalServicios: 34, tiempoPromedio: '35 min', servicioEstrella: 'Corte Degradado (Fade)' },
    mes: { totalServicios: 142, tiempoPromedio: '34 min', servicioEstrella: 'Corte + Barba Completa' },
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

            <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
                
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                            <Activity className="size-6 text-emerald-400" />
                            Mi Productividad en Silla
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Métricas operativas de volumen de servicios, tiempos de atención y ritmo de trabajo físico.
                        </p>
                    </div>

                    {/* Selector rápido de periodo */}
                    <div className="flex items-center bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-1 shrink-0">
                        <button
                            onClick={() => setSelectedPeriod('dia')}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                selectedPeriod === 'dia' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Hoy
                        </button>
                        <button
                            onClick={() => setSelectedPeriod('semana')}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                selectedPeriod === 'semana' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Esta Semana
                        </button>
                        <button
                            onClick={() => setSelectedPeriod('mes')}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                selectedPeriod === 'mes' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Este Mes
                        </button>
                    </div>
                </div>

                {/* Tarjetas de Métricas de Productividad (3 Columnas) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* Total de Servicios */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 overflow-hidden hover:border-zinc-700 transition-all">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                        <div className="space-y-3 pl-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Servicios Realizados</span>
                                <div className="flex items-center justify-center size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                    <Scissors className="size-4" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {currentData.totalServicios} <span className="text-sm font-normal text-zinc-400">cortes</span>
                                </h3>
                                <p className="text-[11px] text-zinc-500 mt-0.5">
                                    {selectedPeriod === 'dia' ? 'Completados hoy' : selectedPeriod === 'semana' ? 'Acumulado semanal' : 'Acumulado mensual'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tiempo Promedio */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 overflow-hidden hover:border-zinc-700 transition-all">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />
                        <div className="space-y-3 pl-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Tiempo Promedio</span>
                                <div className="flex items-center justify-center size-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                                    <Clock className="size-4" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {currentData.tiempoPromedio}
                                </h3>
                                <p className="text-[11px] text-zinc-500 mt-0.5">Duración estimada por cliente</p>
                            </div>
                        </div>
                    </div>

                    {/* Servicio Estrella */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 overflow-hidden hover:border-zinc-700 transition-all">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]" />
                        <div className="space-y-3 pl-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Servicio Más Solicitado</span>
                                <div className="flex items-center justify-center size-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                    <Award className="size-4" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white tracking-tight truncate pt-1">
                                    {currentData.servicioEstrella}
                                </h3>
                                <p className="text-[11px] text-zinc-500 mt-0.5">Alta demanda en tu estación</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bitácora Reciente de Actividad Operativa */}
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white tracking-tight">Bitácora Reciente en Silla</h2>
                        <span className="text-xs text-zinc-400">Últimos servicios completados</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        {recentActivity.map((item) => (
                            <div 
                                key={item.id} 
                                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 p-4 gap-4 transition-all"
                            >
                                <div className="flex items-start gap-3.5">
                                    <div className="flex items-center justify-center size-10 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 shrink-0 mt-0.5 sm:mt-0">
                                        <CheckCircle2 className="size-4 text-emerald-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h4 className="text-sm font-semibold text-white">{item.client}</h4>
                                            <span className="text-xs text-zinc-400">•</span>
                                            <span className="text-xs text-zinc-300 font-medium">{item.service}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="size-3" /> {item.time}
                                            </span>
                                            <span>Estado: <strong className="text-emerald-400">{item.status}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-zinc-800/60 pt-3 sm:pt-0">
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-300 bg-zinc-800/60 px-3 py-1 rounded-lg border border-zinc-700/50">
                                        <Clock className="size-3 text-zinc-400" /> {item.duration}
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