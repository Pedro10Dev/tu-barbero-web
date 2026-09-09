import { usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
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
    const { auth } = usePage().props;

    if (!auth.user) {
        return null;
    }

    const userMenu = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex min-w-0 items-center rounded-lg p-1.5 text-left transition-colors hover:bg-sidebar-accent"
                    data-test="sidebar-header-user"
                >
                    <UserInfo user={auth.user} />
                    <ChevronsUpDown className="ml-1 size-4 shrink-0" />
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

    return (
        <header className="relative flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-6">
            {/* Versión móvil: hamburguesa animada, logo centrado, tema y usuario */}
            <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-2 md:hidden">
                <MobileSidebarTrigger />
                <div className="flex min-w-0 items-center justify-center">
                    <AppLogo className="w-auto" />
                </div>
                <div className="flex min-w-0 items-center justify-end gap-0.5">
                    <ModeToggle />
                    {userMenu}
                </div>
            </div>

            {/* Versión escritorio: logo, breadcrumbs, tema y usuario */}
            <div className="hidden w-full grid-cols-3 items-center md:grid">
                {/* Columna Izquierda: Breadcrumbs */}
                <div className="flex min-w-0 items-center justify-start gap-2">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                {/* Columna Central: Logo Centrado */}
                <div className="flex items-center justify-center">
                    <AppLogo className="w-auto" />
                </div>

                {/* Columna Derecha: Opciones y Menú de Usuario */}
                <div className="flex items-center justify-end gap-1">
                    <ModeToggle />
                    {userMenu}
                </div>
            </div>
        </header>
    );
}
