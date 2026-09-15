import { usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ModeToggle } from '@/components/mode-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

const SECTION_TITLES: [string, string][] = [
    ['/admin/schedules', 'Horarios y Turnos'],
    ['/admin/appointments', 'Gestión de Citas'],
    ['/admin/barbers', 'Barberos'],
    ['/admin/services', 'Servicios'],
    ['/admin/users', 'Usuarios'],
    ['/admin/settings', 'Configuración'],
    ['/admin/dashboard', 'Panel Administrador'],
    ['/productividad', 'Productividad'],
    ['/agenda/nuevo-turno', 'Nuevo Turno en Estación'],
    ['/agenda/calendario', 'Agenda'],
    ['/agenda/listado', 'Gestión de Citas'],
    ['/clientes', 'Mis Clientes'],
    ['/servicios', 'Servicios'],
    ['/dashboard', 'Panel Principal'],
];

function sectionTitle(url: string): string {
    for (const [path, title] of SECTION_TITLES) {
        if (url.startsWith(path)) {
            return title;
        }
    }

    return 'TuBarbero';
}

function MobileSidebarTrigger() {
    const { openMobile, toggleSidebar } = useSidebar();

    return (
        <button
            type="button"
            onClick={() => toggleSidebar()}
            aria-label="Abrir menú"
            aria-expanded={openMobile}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
            <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                    className={cn(
                        'absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300',
                        openMobile
                            ? 'top-1/2 -translate-y-1/2 rotate-45'
                            : 'top-0',
                    )}
                />
                <span
                    className={cn(
                        'absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-all duration-200',
                        openMobile && 'translate-x-2 opacity-0',
                    )}
                />
                <span
                    className={cn(
                        'absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300',
                        openMobile
                            ? 'top-1/2 -translate-y-1/2 -rotate-45'
                            : 'bottom-0',
                    )}
                />
            </span>
        </button>
    );
}

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const page = usePage();
    const { auth } = page.props;
    const url = page.url;

    if (!auth.user) {
        return null;
    }

    const userMenu = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex max-w-44 min-w-0 items-center rounded-lg p-1 text-left transition-colors hover:bg-sidebar-accent"
                    data-test="sidebar-header-user"
                >
                    <UserInfo user={auth.user} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <UserMenuContent user={auth.user} />
            </DropdownMenuContent>
        </DropdownMenu>
    );

    const context =
        breadcrumbs.length > 0 ? (
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        ) : (
            <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">
                {sectionTitle(url)}
            </h1>
        );

    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/80 bg-background px-4 md:px-6">
            {/* Versión móvil: hamburguesa animada, logo centrado, tema y usuario */}
            <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 md:hidden">
                <MobileSidebarTrigger />
                <div className="flex min-w-0 items-center justify-center">
                    <AppLogo className="w-auto" />
                </div>
                <div className="flex min-w-0 items-center justify-end gap-1.5">
                    <ModeToggle />
                    {userMenu}
                </div>
            </div>

            {/* Versión escritorio: contexto de sección, tema y usuario */}
            <div className="hidden w-full items-center justify-between gap-4 md:flex">
                <div className="flex min-w-0 items-center justify-start gap-2">
                    {context}
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                    <ModeToggle />
                    <div
                        className="mx-1 h-6 w-px bg-sidebar-border/70"
                        aria-hidden="true"
                    />
                    {userMenu}
                </div>
            </div>
        </header>
    );
}
