import { Head, Link, usePage } from '@inertiajs/react';
import { Users, Calendar, CalendarCheck, Scissors, UserPlus, Plus, Briefcase, ArrowUpRight, Activity } from 'lucide-react';

export default function AdminDashboard({ stats }: { 
    stats: { 
        totalUsers: number; 
        totalAppointments: number; 
        activeBarbers: number;
        appointmentsToday: number;
        totalServices: number;
    } 
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Panel de Administración" />

            <div className="flex flex-col gap-8 p-6 md:p-8 w-full max-w-7xl mx-auto">
                {/* Cabecera con Bienvenida y Atajos */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-sidebar-border/50 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                                Rol: Administrador
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">
                            Bienvenido, {auth.user.name}
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1">
                            Supervisa el flujo de la plataforma, gestiona tu equipo y controla los servicios.
                        </p>
                    </div>

                    {/* Botones de Acción / Atajos Rápidos */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/barbers/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:border-zinc-600"
                        >
                            <UserPlus className="h-4 w-4 text-zinc-400" />
                            Nuevo Barbero
                        </Link>
                        <Link
                            href="/admin/services/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 px-4 py-2.5 text-sm font-semibold shadow-sm transition-all"
                        >
                            <Plus className="h-4 w-4" />
                            Nuevo Servicio
                        </Link>
                    </div>
                </div>

                {/* Tarjetas de Métricas (KPIs) con Estilo Moderno */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {/* Usuarios Totales */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 backdrop-blur-sm p-5 shadow-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Usuarios Totales</h3>
                            <div className="rounded-xl bg-zinc-800/50 p-2.5 text-zinc-300 border border-zinc-700/40">
                                <Users className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">{stats.totalUsers}</p>
                            <p className="mt-1 text-xs text-zinc-500">Registrados globalmente</p>
                        </div>
                    </div>

                    {/* Citas Históricas */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 backdrop-blur-sm p-5 shadow-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Citas Históricas</h3>
                            <div className="rounded-xl bg-zinc-800/50 p-2.5 text-zinc-300 border border-zinc-700/40">
                                <Calendar className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">{stats.totalAppointments}</p>
                            <p className="mt-1 text-xs text-zinc-500">Acumulado histórico</p>
                        </div>
                    </div>

                    {/* Barberos Activos */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 backdrop-blur-sm p-5 shadow-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Barberos Activos</h3>
                            <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400 border border-purple-500/20">
                                <Scissors className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">{stats.activeBarbers}</p>
                            <p className="mt-1 text-xs text-purple-400/90 font-medium">Con perfil configurado</p>
                        </div>
                    </div>

                    {/* Citas de Hoy */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 backdrop-blur-sm p-5 shadow-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Citas de Hoy</h3>
                            <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400 border border-blue-500/20">
                                <CalendarCheck className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">{stats.appointmentsToday}</p>
                            <p className="mt-1 text-xs text-blue-400 font-medium">Para el día actual</p>
                        </div>
                    </div>

                    {/* Servicios Totales */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-sidebar-border/70 bg-card/60 backdrop-blur-sm p-5 shadow-sm transition-all hover:border-zinc-700 hover:bg-card">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Servicios</h3>
                            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20">
                                <Briefcase className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-3xl font-bold tracking-tight text-white">{stats.totalServices}</p>
                            <p className="mt-1 text-xs text-emerald-400 font-medium">Disponibles en catálogo</p>
                        </div>
                    </div>
                </div>

                {/* Sección Inferior de Contenido */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    {/* Columna Principal: Últimas Citas */}
                    <div className="col-span-4 flex flex-col rounded-2xl border border-sidebar-border/70 bg-card/60 backdrop-blur-sm p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <h3 className="text-base font-semibold text-white">Últimas Citas Registradas</h3>
                            </div>
                            <button className="text-xs font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                                Ver todas <ArrowUpRight className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-sidebar-border/60 rounded-xl p-8 bg-zinc-900/20 text-center">
                            <Calendar className="h-8 w-8 text-zinc-600 mb-2" />
                            <p className="text-sm font-medium text-zinc-300">No hay citas recientes registradas</p>
                            <p className="text-xs text-zinc-500 mt-1">Las nuevas reservas aparecerán automáticamente aquí.</p>
                        </div>
                    </div>

                    {/* Columna Secundaria: Actividad del Sistema */}
                    <div className="col-span-3 flex flex-col rounded-2xl border border-sidebar-border/70 bg-card/60 backdrop-blur-sm p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="h-4 w-4 text-zinc-400" />
                            <h3 className="text-base font-semibold text-white">Actividad Reciente</h3>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-sidebar-border/40">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                                <div className="flex-1">
                                    <p className="text-xs font-medium text-white">Sistema inicializado correctamente</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Spatie Roles y Permisos activos</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/30 border border-sidebar-border/40">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                                <div className="flex-1">
                                    <p className="text-xs font-medium text-white">Panel administrativo configurado</p>
                                    <p className="text-[11px] text-zinc-400 mt-0.5">Vistas e Inertia listos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}