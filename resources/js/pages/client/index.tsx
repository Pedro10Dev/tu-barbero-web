import { Head } from '@inertiajs/react';
import {
    Search,
    Phone,
    Mail,
    Scissors,
    ChevronDown,
    MessageSquare,
    UserCheck,
    Calendar,
    ArrowUpDown,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';

type Client = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    phoneFormatted: string;
    totalVisits: number;
    lastVisit: string;
    favoriteService: string;
    notes: string;
};

type SortOption = 'asc' | 'desc' | 'most-visits' | 'least-visits';

export default function ClientsIndex({ clients }: { clients: Client[] }) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('asc');

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const filteredClients = clients.filter(
        (client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (client.phone ?? '').includes(searchTerm) ||
            (client.email ?? '')
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
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

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Directorio de Clientes"
                    description="Consulta el historial, notas y preferencias de tus clientes registrados en estación."
                    actions={
                        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-brand">
                                <Users className="size-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Total Registrados
                                </span>
                                <span className="tabular text-base font-bold text-foreground">
                                    {clients.length}{' '}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        clientes
                                    </span>
                                </span>
                            </div>
                        </div>
                    }
                />

                {/* Búsqueda y ordenamiento */}
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                    <div className="relative flex w-full items-center">
                        <Search className="absolute left-3.5 size-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por nombre, teléfono o correo electrónico..."
                            className="w-full rounded-lg border border-border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
                        />
                    </div>

                    <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
                        <ArrowUpDown className="hidden size-4 text-muted-foreground sm:block" />
                        <select
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(e.target.value as SortOption)
                            }
                            className="w-full cursor-pointer rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground transition focus:border-ring focus:outline-none sm:w-auto"
                        >
                            <option
                                value="asc"
                                className="bg-muted text-foreground"
                            >
                                Alfabético (A - Z)
                            </option>
                            <option
                                value="desc"
                                className="bg-muted text-foreground"
                            >
                                Alfabético (Z - A)
                            </option>
                            <option
                                value="most-visits"
                                className="bg-muted text-foreground"
                            >
                                Más visitas
                            </option>
                            <option
                                value="least-visits"
                                className="bg-muted text-foreground"
                            >
                                Menos visitas
                            </option>
                        </select>
                    </div>
                </div>

                {/* Listado */}
                <div className="flex flex-col gap-3">
                    {sortedClients.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground">
                            No se encontraron clientes que coincidan con la
                            búsqueda.
                        </div>
                    ) : (
                        sortedClients.map((client) => {
                            const isExpanded = expandedId === client.id;

                            return (
                                <div
                                    key={client.id}
                                    className={`group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 ${
                                        isExpanded
                                            ? 'border-border shadow-lg shadow-foreground/10'
                                            : 'border-border hover:border-foreground/40'
                                    }`}
                                >
                                    <div
                                        className={`absolute top-0 bottom-0 left-0 w-1 transition-colors duration-300 ${
                                            isExpanded
                                                ? 'bg-brand'
                                                : 'bg-muted group-hover:bg-foreground/30'
                                        }`}
                                    />

                                    {/* Cabecera */}
                                    <div
                                        onClick={() => toggleExpand(client.id)}
                                        className="flex cursor-pointer flex-col justify-between gap-4 p-5 pl-6 select-none sm:flex-row sm:items-center"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                                                <UserCheck className="size-5" />
                                            </div>

                                            <div className="space-y-1">
                                                <div className="flex flex-wrap items-center gap-2.5">
                                                    <h3 className="text-base font-semibold text-foreground">
                                                        {client.name}
                                                    </h3>
                                                    <span className="tabular inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                                                        {client.totalVisits}{' '}
                                                        visitas registradas
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                                    {client.phoneFormatted && (
                                                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                                                            <Phone className="size-3.5 text-muted-foreground" />
                                                            {
                                                                client.phoneFormatted
                                                            }
                                                        </span>
                                                    )}
                                                    {client.email && (
                                                        <span className="flex items-center gap-1.5">
                                                            <Mail className="size-3.5 text-muted-foreground" />
                                                            {client.email}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end sm:self-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpand(client.id);
                                                }}
                                                className="flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-accent"
                                            >
                                                <span>
                                                    {isExpanded
                                                        ? 'Ocultar historial'
                                                        : 'Ver historial y notas'}
                                                </span>
                                                <ChevronDown
                                                    className={`size-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contenido desplegable */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="flex flex-col justify-between gap-6 border-t border-border bg-muted/60 px-6 pt-4 pb-6 md:flex-row md:items-center">
                                                <div className="grid grid-cols-1 gap-6 text-xs sm:grid-cols-2 lg:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                            Servicio Frecuente
                                                        </span>
                                                        <div className="flex items-center gap-2 font-medium text-foreground">
                                                            <Scissors className="size-3.5 text-muted-foreground" />
                                                            {
                                                                client.favoriteService
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                            Última Visita
                                                        </span>
                                                        <div className="flex items-center gap-2 text-foreground">
                                                            <Calendar className="size-3.5 text-muted-foreground" />
                                                            {client.lastVisit}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                                        <span className="block font-semibold tracking-wider text-muted-foreground uppercase">
                                                            Notas y Preferencias
                                                        </span>
                                                        <p className="text-muted-foreground italic">
                                                            "{client.notes}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex shrink-0 items-center border-t border-border pt-4 md:border-t-0 md:pt-0">
                                                    {client.phone ? (
                                                        <a
                                                            href={`https://wa.me/${client.phone}?text=Hola%20${encodeURIComponent(client.name)},%20te%20escribo%20desde%20TuBarbero...`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-2.5 text-xs font-semibold text-success transition hover:bg-success/20 md:w-auto"
                                                        >
                                                            <MessageSquare className="size-4" />
                                                            Contactar por
                                                            WhatsApp
                                                        </a>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">
                                                            Sin teléfono
                                                            registrado
                                                        </span>
                                                    )}
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
