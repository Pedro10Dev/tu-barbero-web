import { Head } from '@inertiajs/react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

export default function AgendaCalendar() {
    const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

    return (
        <>
            <Head title="Mi Agenda" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera y Resumen Superior alineado con el resto del sistema */}
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <CalendarIcon className="size-6 text-zinc-400" />
                            Mi Agenda
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Visualiza y administra tus bloques horarios y turnos
                            programados en estación.
                        </p>
                    </div>

                    {/* Selector de Vista (Diaria / Semanal / Mensual) con estilo unificado */}
                    <div className="flex shrink-0 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-1">
                        <button
                            onClick={() => setViewMode('day')}
                            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                viewMode === 'day'
                                    ? 'bg-zinc-800 text-white shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Día
                        </button>
                        <button
                            onClick={() => setViewMode('week')}
                            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                viewMode === 'week'
                                    ? 'bg-zinc-800 text-white shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Semana
                        </button>
                        <button
                            onClick={() => setViewMode('month')}
                            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                                viewMode === 'month'
                                    ? 'bg-zinc-800 text-white shadow-sm'
                                    : 'text-zinc-400 hover:text-white'
                            }`}
                        >
                            Mes
                        </button>
                    </div>
                </div>

                {/* Barra de navegación de fechas */}
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:flex-row">
                    <div className="flex items-center gap-3.5">
                        <div className="flex size-11 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/80 text-zinc-300">
                            <CalendarIcon className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                                Fecha Seleccionada
                            </span>
                            <h2 className="text-base font-bold text-white">
                                Viernes, 4 de Septiembre de 2026
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/60">
                            <button className="p-2.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-white">
                                <ChevronLeft className="size-4" />
                            </button>
                            <span className="border-x border-zinc-700/50 px-4 text-xs font-semibold text-zinc-200">
                                Hoy
                            </span>
                            <button className="p-2.5 text-zinc-400 transition hover:bg-zinc-700 hover:text-white">
                                <ChevronRight className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cuadrícula de la Agenda (Bloques horarios personales) */}
                <div className="flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 text-center">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-2xl border border-zinc-700/50 bg-zinc-800/60 text-zinc-400">
                        <CalendarIcon className="size-6" />
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-white">
                        Tu agenda está lista
                    </h3>
                    <p className="mb-4 max-w-sm text-xs text-zinc-400">
                        Aquí visualizarás tus bloques de tiempo para la vista
                        seleccionada ({viewMode}).
                    </p>
                    <span className="inline-flex items-center rounded-xl border border-zinc-700/60 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-300">
                        Horario activo: 09:00 AM - 08:00 PM
                    </span>
                </div>
            </div>
        </>
    );
}
