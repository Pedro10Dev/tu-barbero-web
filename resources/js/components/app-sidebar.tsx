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
    SidebarMenuItem 
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { LayoutGrid, Calendar, Users, Scissors, Globe, Activity } from 'lucide-react';
import AppLogo from './app-logo';
import { Link } from '@inertiajs/react';

const mainNavItems: ExtendedNavItem[] = [
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
                href: '/agenda/calendario', // Ruta única temporal
            },
            {
                title: 'Gestión de citas ',
                href: '/agenda/listado', // Ruta única temporal
            },
        ],
    },
    {
        title: 'Mis Clientes',
        href: '/clientes', // Ruta única temporal
        icon: Users,
    },
    {
        title: 'Servicios',
        href: '/servicios', // Ruta única temporal
        icon: Scissors,
    },
     {
        title: 'Productividad',
        href: '/productividad', // Ruta única temporal
        icon: Activity,
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
                <NavMain items={mainNavItems} label="Menú Barbero" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}