import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Calendar,
    Users,
    Scissors,
    Globe,
    Activity,
    CalendarDays,
    Briefcase,
    Clock,
    Settings,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import type { ExtendedNavItem } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import AppLogo from './app-logo';

const barberNavItems: ExtendedNavItem[] = [
    {
        title: 'Panel Principal',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Citas y Agenda',
        href: '#',
        icon: Calendar,
        items: [
            {
                title: 'Agenda',
                href: '/agenda/calendario',
            },
            {
                title: 'Gestión de citas ',
                href: '/agenda/listado',
            },
        ],
    },
    {
        title: 'Mis Clientes',
        href: '/clientes',
        icon: Users,
    },
    {
        title: 'Servicios',
        href: '/servicios',
        icon: Scissors,
    },
    {
        title: 'Productividad',
        href: '/productividad',
        icon: Activity,
    },
];

const adminNavItems: ExtendedNavItem[] = [
    {
        title: 'Panel Administrador',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Gestión de Citas',
        href: '/admin/appointments',
        icon: CalendarDays,
    },
    {
        title: 'Barberos',
        href: '/admin/barbers',
        icon: Scissors,
    },
    {
        title: 'Servicios',
        href: '/admin/services',
        icon: Briefcase,
    },
    {
        title: 'Usuarios',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Horarios y Turnos',
        href: '/admin/schedules',
        icon: Clock,
    },
    {
        title: 'Configuración',
        href: '/admin/settings',
        icon: Settings,
    },
];

const footerNavItems = [
    {
        title: 'Landing',
        href: '/',
        icon: Globe,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;
    const roles = (auth.user?.roles as string[]) || [];

    const isAdmin = roles.includes('admin');
    const isBarber = roles.includes('barber') || isAdmin;

    return (
        <Sidebar collapsible="offcanvas" variant="sidebar">
            <SidebarHeader className="border-b border-sidebar-border/50 pt-2 pb-3">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-transparent"
                        >
                            <div className="flex w-full items-center gap-3 px-2 py-1.5">
                                {/* Icono de Tijeras */}
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700/60 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white shadow-inner">
                                    <Scissors className="h-5 w-5 -rotate-45 text-emerald-400" />
                                </div>

                                {/* Texto sin redundancia */}
                                <div className="flex flex-col overflow-hidden text-left">
                                    <span className="text-sm leading-none font-bold tracking-tight text-white">
                                        Gestión Central
                                    </span>
                                    <span className="mt-1 truncate text-[11px] font-medium text-zinc-400">
                                        Administración
                                    </span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isAdmin && (
                    <NavMain items={adminNavItems} label="Menú Administrador" />
                )}
                {isBarber && (
                    <NavMain items={barberNavItems} label="Menú Barbero" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
