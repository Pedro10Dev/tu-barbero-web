import { Link } from '@inertiajs/react';
import { LockKeyhole, Palette, UserRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: (NavItem & { icon: LucideIcon })[] = [
    {
        title: 'Perfil',
        href: edit(),
        icon: UserRound,
    },
    {
        title: 'Seguridad',
        href: editSecurity(),
        icon: LockKeyhole,
    },
    {
        title: 'Apariencia',
        href: editAppearance(),
        icon: Palette,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
            <div className="border-b border-zinc-800/80 pb-6">
                <div className="mb-1.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                        Configuración
                    </span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    Ajustes de tu cuenta
                </h1>
                <p className="mt-1 text-sm text-zinc-400">
                    Administra tu perfil, seguridad y preferencias de
                    apariencia.
                </p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
                <aside className="lg:w-56 lg:shrink-0">
                    <nav
                        className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
                        aria-label="Configuración"
                    >
                        {sidebarNavItems.map((item) => {
                            const active = isCurrentOrParentUrl(item.href);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={toUrl(item.href)}
                                    href={item.href}
                                    className={cn(
                                        'flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition',
                                        active
                                            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                                            : 'border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200',
                                    )}
                                >
                                    <Icon className="size-4" />
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                <div className="min-w-0 flex-1 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 sm:p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
