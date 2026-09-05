import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { 
    Scissors, Calendar, TrendingUp, Clock, CheckCircle2, 
    XCircle, DollarSign, UserPlus, CalendarOff, History, ArrowRight 
} from 'lucide-react';

export default function Dashboard({ stats, pendingAppointments, nextAppointment }: any) {
    const { auth } = usePage().props as any;
    const barberName = auth?.user?.name || 'Barbero';

    return (
        <>
            <Head title={`Panel de ${barberName} | TuBarbero`} />
            
            <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                
                {/* Cabecera y Acciones Rápidas */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-zinc-800/80 pb-5 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Panel de Control</span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Hola, {barberName}</h1>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-zinc-900 hover:bg-zinc-200 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <UserPlus className="w-4 h-4" /> Nuevo Turno
                        </button>
                        <button className="flex-1 sm:flex-none px-4 py-2.5 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 border border-zinc-700">
                            <CalendarOff className="w-4 h-4" /> Bloquear Hora
                        </button>
                    </div>
                </div>

                {/* Banner de Próxima Cita */}
                <div className="bg-gradient-to-r from-slate-900 to-zinc-950 border border-slate-800/60 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
                    {/* Decoración de fondo */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 text-slate-800/30">
                        <Clock className="w-32 h-32 transform -rotate-12" />
                    </div>
                    
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tu siguiente cliente</p>
                            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                                {nextAppointment?.client?.name || 'Carlos Mendoza'} 
                                <span className="text-slate-400 font-medium text-lg">· 14:30</span>
                            </h3>
                            <p className="text-sm text-slate-300 mt-1">Corte Clásico + Perfilado de Barba</p>
                        </div>
                    </div>
                    
                    <button className="relative z-10 px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 rounded-lg font-medium text-sm transition-colors self-start md:self-auto flex items-center gap-2">
                        Ver detalle <ArrowRight className="w-4 h-4 text-slate-400" />
                    </button>
                </div>

                {/* Grid de Métricas Principales */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Ingresos (Mes)</span>
                            <DollarSign className="w-4.5 h-4.5 text-emerald-400" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">${stats?.monthlyRevenue || '450'}</p>
                    </div>
                    
                    <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Citas de Hoy</span>
                            <Calendar className="w-4.5 h-4.5 text-blue-400" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">{stats?.todayAppointments || '5'}</p>
                    </div>
                    
                    <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total Mensual</span>
                            <Scissors className="w-4.5 h-4.5 text-slate-300" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">{stats?.monthlyCuts || 0}</p>
                    </div>
                    
                    <div className="bg-zinc-900/60 border border-zinc-800/80 p-5 rounded-2xl hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Histórico</span>
                            <TrendingUp className="w-4.5 h-4.5 text-zinc-500" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-black text-white">{stats?.totalCuts || 0}</p>
                    </div>
                </div>

                {/* Sección dividida: Pendientes y Actividad */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Citas Pendientes (Ocupa 2 columnas) */}
                    <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-white tracking-tight">Citas Pendientes</h2>
                                <p className="text-xs text-zinc-400 mt-0.5">Solicitudes esperando tu aprobación</p>
                            </div>
                            <span className="px-2.5 py-1 bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-xs font-bold rounded-md">
                                {pendingAppointments?.length || 0}
                            </span>
                        </div>

                        {!pendingAppointments || pendingAppointments.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-10 border border-dashed border-zinc-800/80 rounded-xl bg-zinc-900/20">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
                                    <CheckCircle2 className="w-5 h-5 text-zinc-400" />
                                </div>
                                <p className="text-zinc-300 font-medium text-sm">Agenda al día</p>
                                <p className="text-zinc-500 text-xs mt-1">No hay solicitudes pendientes.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {pendingAppointments.map((appointment: any) => (
                                    <div key={appointment.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800 text-slate-300 shrink-0 mt-0.5 sm:mt-0">
                                                <Calendar className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-white font-semibold text-sm">{appointment.client?.name || 'Cliente'}</p>
                                                <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-slate-500" /> {appointment.start_time}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-900">
                                            <button className="flex-1 sm:flex-none px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg border border-emerald-500/20 transition flex items-center justify-center gap-1.5">
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Aceptar
                                            </button>
                                            <button className="flex-1 sm:flex-none px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold rounded-lg border border-rose-500/20 transition flex items-center justify-center gap-1.5">
                                                <XCircle className="w-3.5 h-3.5" /> Rechazar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actividad Reciente (Ocupa 1 columna) */}
                    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 sm:p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-white tracking-tight">Actividad</h2>
                            <History className="w-4.5 h-4.5 text-zinc-500" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                            {/* Ítem de actividad 1 */}
                            <div className="flex gap-4 items-start relative">
                                <div className="absolute left-[11px] top-7 bottom-[-16px] w-[1px] bg-zinc-800"></div>
                                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 relative z-10 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-200">Corte finalizado</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">Miguel Torres • Hace 1 hora</p>
                                </div>
                            </div>
                            
                            {/* Ítem de actividad 2 */}
                            <div className="flex gap-4 items-start relative">
                                <div className="absolute left-[11px] top-7 bottom-[-16px] w-[1px] bg-zinc-800"></div>
                                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 relative z-10 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-200">Nueva reserva</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">Andrés Silva • Hace 3 horas</p>
                                </div>
                            </div>

                            {/* Ítem de actividad 3 */}
                            <div className="flex gap-4 items-start relative">
                                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0 relative z-10 mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-200">Cita cancelada</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">Luis Gómez • Ayer</p>
                                </div>
                            </div>
                        </div>
                        
                        <button className="w-full mt-6 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-800/40 rounded-lg border border-zinc-800/80 hover:bg-zinc-800">
                            Ver historial completo
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: any) => (
    <AppLayout breadcrumbs={[
        {
            title: '',
            href: 'dashboard',
        },
    ]}>
        {page}
    </AppLayout>
);