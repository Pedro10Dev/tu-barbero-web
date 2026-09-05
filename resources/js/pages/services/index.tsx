import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Scissors, Clock, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel Principal',
        href: '/dashboard',
    },
    {
        title: 'Mis Servicios',
        href: '/servicios',
    },
];

const initialServices = [
    {
        id: 1,
        name: 'Corte Clásico',
        description: 'Corte de cabello tradicional con máquina y tijera, incluye lavado y peinado.',
        duration: '30 min',
        priceHint: 'Tarifa Estándar',
        isOffered: true,
    },
    {
        id: 2,
        name: 'Corte Degradado (Fade)',
        description: 'Desvanecido limpio en los laterales con transición pulida y acabado a navaja.',
        duration: '45 min',
        priceHint: 'Tarifa Estándar',
        isOffered: true,
    },
    {
        id: 3,
        name: 'Mantenimiento de Barba',
        description: 'Perfilado de barba con navaja, aplicación de vapor, aceite hidratante y bálsamo.',
        duration: '30 min',
        priceHint: 'Tarifa Estándar',
        isOffered: true,
    },
    {
        id: 4,
        name: 'Corte + Barba Completa',
        description: 'El combo completo de la casa. Servicio integral de corte y arreglo de barba.',
        duration: '60 min',
        priceHint: 'Tarifa Premium',
        isOffered: true,
    },
    {
        id: 5,
        name: 'Diseño de Cejas',
        description: 'Perfilado y limpieza de cejas con navaja o cera para un acabado definido.',
        duration: '15 min',
        priceHint: 'Tarifa Adicional',
        isOffered: false,
    },
    {
        id: 6,
        name: 'Tratamiento Capilar Anticaída',
        description: 'Masaje capilar profundo con productos especiales para revitalizar el cuero cabelludo.',
        duration: '30 min',
        priceHint: 'Tarifa Especial',
        isOffered: false,
    },
];

export default function ServicesIndex() {
    const [services, setServices] = useState(initialServices);

    const toggleServiceStatus = (id: number) => {
        setServices(services.map(service => 
            service.id === id ? { ...service, isOffered: !service.isOffered } : service
        ));
    };

    const activeCount = services.filter(s => s.isOffered).length;

    return (
        <>
            <Head title="Mis Servicios" />

            <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
                
                {/* Cabecera y Resumen Superior */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                            <Scissors className="size-6 text-zinc-400" />
                            Catálogo de Especialidades
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Habilita o deshabilita los servicios que realizas personalmente en tu estación de trabajo.
                        </p>
                    </div>

                    {/* Tarjeta de Resumen Rápido Estética */}
                    <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl px-4 py-3 shrink-0">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <ShieldCheck className="size-5" />
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400 block font-medium">Servicios Activos</span>
                            <span className="text-base font-bold text-white">
                                {activeCount} <span className="text-xs font-normal text-zinc-500">de {services.length} disponibles</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Grid de Servicios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service) => {
                        return (
                            <div 
                                key={service.id} 
                                className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 overflow-hidden bg-zinc-900/40 p-6 ${
                                    service.isOffered 
                                        ? 'border-zinc-700/80 shadow-lg shadow-black/20 hover:border-zinc-600' 
                                        : 'border-zinc-800/50 opacity-60 hover:opacity-85 hover:border-zinc-700/50'
                                }`}
                            >
                                {/* Barra indicadora lateral izquierda dinámica */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                                    service.isOffered ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-zinc-800'
                                }`} />

                                <div className="space-y-4 pl-2">
                                    {/* Cabecera de la tarjeta */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="space-y-1.5">
                                            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 block">
                                                {service.priceHint}
                                            </span>
                                            <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                                                {service.name}
                                            </h3>
                                        </div>

                                        {/* Estado Badge */}
                                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium border shrink-0 transition-colors ${
                                            service.isOffered 
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                                : 'bg-zinc-800/80 text-zinc-400 border-zinc-700/60'
                                        }`}>
                                            {service.isOffered ? (
                                                <>
                                                    <CheckCircle2 className="size-3 text-emerald-400" /> Ofreciendo
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="size-3 text-zinc-500" /> Inactivo
                                                </>
                                            )}
                                        </span>
                                    </div>

                                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                                        {service.description}
                                    </p>

                                    {/* Duración */}
                                    <div className="flex items-center gap-2 text-xs text-zinc-300 font-medium pt-2 border-t border-zinc-800/60">
                                        <Clock className="size-3.5 text-zinc-500" />
                                        <span>Duración estimada: <strong className="text-white font-semibold">{service.duration}</strong></span>
                                    </div>
                                </div>

                                {/* Botón de acción inferior integrado */}
                                <div className="mt-6 pl-2 pt-4 border-t border-zinc-800/40 flex items-center justify-between">
                                    <span className="text-[11px] text-zinc-500 font-medium">
                                        {service.isOffered ? 'Visible en agenda' : 'Oculto en agenda'}
                                    </span>
                                    
                                    <button
                                        onClick={() => toggleServiceStatus(service.id)}
                                        className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
                                            service.isOffered
                                                ? 'bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white hover:border-zinc-600'
                                                : 'bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                                        }`}
                                    >
                                        {service.isOffered ? 'Desactivar' : 'Activar servicio'}
                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </>
    );
}