import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';



export default function AgendaCalendar() {
    const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

    return (
        <>
            <Head title="Mi Agenda" />

            <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {/* Cabecera y Resumen Superior alineado con el resto del sistema */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                            <CalendarIcon className="size-6 text-zinc-400" />
                            Mi Agenda
                        </h1>
                        <p className="text-sm text-zinc-400">Visualiza y administra tus bloques horarios y turnos programados en estación.</p>
                    </div>

                    {/* Selector de Vista (Diaria / Semanal / Mensual) con estilo unificado */}
                    <div className="flex rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-1 shrink-0">
                        <button
                            onClick={() => setViewMode('day')}
                            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                viewMode === 'day' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Día
                        </button>
                        <button
                            onClick={() => setViewMode('week')}
                            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                viewMode === 'week' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Semana
                        </button>
                        <button
                            onClick={() => setViewMode('month')}
                            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                viewMode === 'month' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Mes
                        </button>
                    </div>
                </div>

                {/* Barra de navegación de fechas */}
                <div className="flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="flex items-center justify-center size-11 rounded-xl bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                            <CalendarIcon className="size-5" />
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block">Fecha Seleccionada</span>
                            <h2 className="text-base font-bold text-white">Viernes, 4 de Septiembre de 2026</h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center border border-zinc-700/50 rounded-xl overflow-hidden bg-zinc-800/60">
                            <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-700 transition">
                                <ChevronLeft className="size-4" />
                            </button>
                            <span className="px-4 text-xs font-semibold text-zinc-200 border-x border-zinc-700/50">Hoy</span>
                            <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-700 transition">
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cuadrícula de la Agenda (Bloques horarios personales) */}
                <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="size-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 flex items-center justify-center text-zinc-400 mb-3">
                        <CalendarIcon className="size-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">Tu agenda está lista</h3>
                    <p className="text-xs text-zinc-400 max-w-sm mb-4">
                        Aquí visualizarás tus bloques de tiempo para la vista seleccionada ({viewMode}).
                    </p>
                    <span className="inline-flex items-center rounded-xl bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-300 border border-zinc-700/60">
                        Horario activo: 09:00 AM - 08:00 PM
                    </span>
                </div>
            </div>
        </>
    );
}