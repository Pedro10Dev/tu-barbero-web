import { NavFooter } from '@/components/nav-footer';
import { NavMain, type ExtendedNavItem } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
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
import {
    LayoutGrid,
    Calendar,
    Users,
    Scissors,
    Globe,
    Activity,
    Shield,
    CalendarDays,
    Briefcase,
    Clock,
    ShieldCheck,
    History,
    Settings,
} from 'lucide-react';
import AppLogo from './app-logo';
import { Link, usePage } from '@inertiajs/react';

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
        title: 'Roles y Permisos',
        href: '/admin/roles',
        icon: ShieldCheck,
    },
    {
        title: 'Auditoría',
        href: '/admin/activity',
        icon: History,
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
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
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
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
