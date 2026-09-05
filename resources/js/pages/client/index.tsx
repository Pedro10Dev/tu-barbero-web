import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Search, Phone, Mail, Scissors, ChevronDown, MessageSquare, UserCheck, Calendar, ArrowUpDown, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel Principal',
        href: '/dashboard',
    },
    {
        title: 'Mis Clientes',
        href: '/clientes',
    },
];

const mockClients = [
    {
        id: 1,
        name: 'Miguel Torres',
        email: 'miguel.torres@gmail.com',
        phone: '+584125551234',
        phoneFormatted: '+58 412-5551234',
        totalVisits: 8,
        lastVisit: 'Ayer, 02:30 PM',
        favoriteService: 'Corte Clásico + Barba',
        notes: 'Le gusta el desvanecido bajo en los lados. Prefiere agua al clima.',
    },
    {
        id: 2,
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@outlook.com',
        phone: '+584145559876',
        phoneFormatted: '+58 414-5559876',
        totalVisits: 14,
        lastVisit: 'Hace 2 semanas',
        favoriteService: 'Corte Degradado',
        notes: 'Cliente muy puntual. Siempre pide perfilado de cejas.',
    },
    {
        id: 3,
        name: 'Andrés Silva',
        email: 'andres.silva@yahoo.com',
        phone: '+584245554321',
        phoneFormatted: '+58 424-5554321',
        totalVisits: 3,
        lastVisit: 'Hace 1 mes',
        favoriteService: 'Mantenimiento de Barba',
        notes: 'Viene recomendando por Miguel Torres. Usa productos para barba larga.',
    },
];

type SortOption = 'asc' | 'desc' | 'most-visits' | 'least-visits';

export default function ClientsIndex() {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('asc');

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredClients = mockClients.filter((client) => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedClients = [...filteredClients].sort((a, b) => {
        if (sortOption === 'asc') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'desc') {
            return b.name.localeCompare(a.name);
        } else if (sortOption === 'most-visits') {
            return b.totalVisits - a.totalVisits;
        } else if (sortOption === 'least-visits') {
            return a.totalVisits - b.totalVisits;
        }
        return 0;
    });

    return (
        <>
            <Head title="Mis Clientes" />

            <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-7xl mx-auto w-full">
                {/* Cabecera y Resumen Superior alineado con el resto del sistema */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                            <Users className="size-6 text-zinc-400" />
                            Directorio de Clientes
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Consulta el historial, notas y preferencias de tus clientes registrados en estación.
                        </p>
                    </div>

                    {/* Tarjeta de Resumen Rápido Estética */}
                    <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl px-4 py-3 shrink-0">
                        <div className="flex items-center justify-center size-10 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-zinc-300">
                            <UserCheck className="size-5" />
                        </div>
                        <div>
                            <span className="text-xs text-zinc-400 block font-medium">Total Registrados</span>
                            <span className="text-base font-bold text-white">
                                {mockClients.length} <span className="text-xs font-normal text-zinc-500">clientes</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Barra de Búsqueda y Selector de Ordenamiento */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative flex items-center w-full">
                        <Search className="absolute left-3.5 size-4 text-zinc-500" />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre, teléfono o correo electrónico..." 
                            className="w-full rounded-xl bg-zinc-900/60 border border-zinc-800/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
                        />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                        <ArrowUpDown className="size-4 text-zinc-400 hidden sm:block" />
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value as SortOption)}
                            className="w-full sm:w-auto rounded-xl bg-zinc-900/60 border border-zinc-800/80 px-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-700 transition cursor-pointer"
                        >
                            <option value="asc" className="bg-zinc-900 text-white">Alfabético (A - Z)</option>
                            <option value="desc" className="bg-zinc-900 text-white">Alfabético (Z - A)</option>
                            <option value="most-visits" className="bg-zinc-900 text-white">Más visitas</option>
                            <option value="least-visits" className="bg-zinc-900 text-white">Menos visitas</option>
                        </select>
                    </div>
                </div>

                {/* Listado de Clientes con tarjetas expandibles */}
                <div className="flex flex-col gap-3">
                    {sortedClients.length === 0 ? (
                        <div className="text-center py-12 text-zinc-500 text-sm bg-zinc-900/30 rounded-2xl border border-zinc-800/60">
                            No se encontraron clientes que coincidan con la búsqueda.
                        </div>
                    ) : (
                        sortedClients.map((client) => {
                            const isExpanded = expandedId === client.id;

                            return (
                                <div 
                                    key={client.id} 
                                    className={`group relative flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden bg-zinc-900/40 ${
                                        isExpanded 
                                            ? 'border-zinc-700/80 shadow-lg shadow-black/20' 
                                            : 'border-zinc-800/80 hover:border-zinc-700/80'
                                    }`}
                                >
                                    {/* Barra indicadora lateral izquierda dinámica */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300 ${
                                        isExpanded ? 'bg-zinc-400' : 'bg-zinc-700 group-hover:bg-zinc-500'
                                    }`} />

                                    {/* Cabecera principal de la tarjeta */}
                                    <div 
                                        onClick={() => toggleExpand(client.id)}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4 cursor-pointer select-none pl-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex items-center justify-center size-11 rounded-xl border border-zinc-700/50 bg-zinc-800/60 text-zinc-300 shrink-0">
                                                <UserCheck className="size-5" />
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    <h3 className="text-base font-semibold text-white">{client.name}</h3>
                                                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border bg-zinc-800/80 text-zinc-300 border-zinc-700/60">
                                                        {client.totalVisits} visitas registradas
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                                                    <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                                                        <Phone className="size-3.5 text-zinc-500" />
                                                        {client.phoneFormatted}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Mail className="size-3.5 text-zinc-500" />
                                                        {client.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botón de expansión */}
                                        <div className="flex items-center gap-2 self-end sm:self-center">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpand(client.id);
                                                }}
                                                className="flex items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                                            >
                                                <span>{isExpanded ? 'Ocultar historial' : 'Ver historial y notas'}</span>
                                                <ChevronDown className={`size-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contenido Desplegable Animado */}
                                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 pt-4 border-t border-zinc-800/60 bg-zinc-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                                                    <div className="space-y-1">
                                                        <span className="text-zinc-500 uppercase tracking-wider font-semibold block">Servicio Frecuente</span>
                                                        <div className="flex items-center gap-2 text-zinc-300 font-medium">
                                                            <Scissors className="size-3.5 text-zinc-500" />
                                                            {client.favoriteService}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="text-zinc-500 uppercase tracking-wider font-semibold block">Última Visita</span>
                                                        <div className="flex items-center gap-2 text-zinc-300">
                                                            <Calendar className="size-3.5 text-zinc-500" />
                                                            {client.lastVisit}
                                                        </div>
                                                    </div>

                                                    <div className="sm:col-span-2 lg:col-span-1 space-y-1">
                                                        <span className="text-zinc-500 uppercase tracking-wider font-semibold block">Notas y Preferencias</span>
                                                        <p className="text-zinc-400 italic">"{client.notes}"</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-800/40">
                                                    <a 
                                                        href={`https://wa.me/${client.phone}?text=Hola%20${encodeURIComponent(client.name)},%20te%20escribo%20desde%20TuBarbero...`} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 rounded-xl bg-emerald-600/20 border border-emerald-500/40 px-4 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-600/30 hover:border-emerald-500 transition-all shadow-sm w-full md:w-auto justify-center"
                                                    >
                                                        <MessageSquare className="size-4 text-emerald-400" />
                                                        Contactar por WhatsApp
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}