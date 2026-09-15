import { Head } from '@inertiajs/react';
import { CheckCircle2, Scissors, Clock, Calendar, Award } from 'lucide-react';
import { useState } from 'react';
import { MiniBars } from '@/components/charts';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';

type Periodo = 'dia' | 'semana' | 'mes';

type PeriodSummary = {
    totalServicios: number;
    tiempoPromedio: string;
    servicioEstrella: string;
};

type SeriesPoint = {
    label: string;
    value: number;
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
    weeklySeries,
    recentActivity,
}: {
    summary: Record<Periodo, PeriodSummary>;
    weeklySeries: SeriesPoint[];
    recentActivity: ActivityEntry[];
}) {
    const [selectedPeriod, setSelectedPeriod] = useState<Periodo>('semana');

    const currentData = summary[selectedPeriod];
    const weeklyValues = weeklySeries.map((point) => point.value);

    return (
        <>
            <Head title="Mi Productividad y Rendimiento" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Mi Productividad en Silla"
                    description="Métricas operativas de volumen de servicios, tiempos de atención y ritmo de trabajo físico."
                    actions={
                        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-muted p-1">
                            {(['dia', 'semana', 'mes'] as Periodo[]).map(
                                (period) => (
                                    <button
                                        key={period}
                                        onClick={() =>
                                            setSelectedPeriod(period)
                                        }
                                        aria-pressed={selectedPeriod === period}
                                        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                                            selectedPeriod === period
                                                ? 'bg-card text-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
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
                    }
                />

                {/* Métricas */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <StatCard
                        label="Servicios Realizados"
                        value={
                            <>
                                {currentData.totalServicios}{' '}
                                <span className="text-sm font-normal text-muted-foreground">
                                    cortes
                                </span>
                            </>
                        }
                        icon={Scissors}
                        chart={
                            <MiniBars
                                data={weeklyValues}
                                className="h-10 w-28 shrink-0 text-brand"
                            />
                        }
                        hint={
                            selectedPeriod === 'dia'
                                ? 'Completados hoy'
                                : selectedPeriod === 'semana'
                                  ? 'Acumulado semanal'
                                  : 'Acumulado mensual'
                        }
                    />
                    <StatCard
                        label="Tiempo Promedio"
                        value={currentData.tiempoPromedio}
                        icon={Clock}
                        hint="Duración estimada por cliente"
                    />
                    <StatCard
                        label="Servicio Más Solicitado"
                        value={
                            <span className="truncate text-lg sm:text-2xl">
                                {currentData.servicioEstrella}
                            </span>
                        }
                        icon={Award}
                        hint="Alta demanda en tu estación"
                    />
                </div>

                {/* Bitácora reciente */}
                <div className="flex flex-col gap-4 pt-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold tracking-tight text-foreground">
                            Bitácora Reciente en Silla
                        </h2>
                        <span className="text-xs text-muted-foreground">
                            Últimos servicios completados
                        </span>
                    </div>

                    {recentActivity.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
                            Aún no hay servicios completados.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {recentActivity.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col justify-between gap-4 rounded-lg border border-border bg-card p-4 transition hover:border-foreground/25 sm:flex-row sm:items-center"
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border border-success/25 bg-success/10 text-success sm:mt-0">
                                            <CheckCircle2 className="size-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-semibold text-foreground">
                                                    {item.client}
                                                </span>
                                                <span className="text-muted-foreground">
                                                    ·
                                                </span>
                                                <span className="text-xs font-medium text-foreground">
                                                    {item.service}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="size-3" />{' '}
                                                    {item.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                                        <span className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
                                            <Clock className="size-3 text-muted-foreground" />{' '}
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
