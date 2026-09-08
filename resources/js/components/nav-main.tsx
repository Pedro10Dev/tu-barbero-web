import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export interface ExtendedNavItem extends NavItem {
    items?: {
        title: string;
        href: string;
    }[];
}

export function NavMain({
    items = [],
    label = 'Menú Barbero',
}: {
    items: ExtendedNavItem[];
    label?: string;
}) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                {label}
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => {
                    const hasSubItems = item.items && item.items.length > 0;
                    const isAnySubItemActive =
                        hasSubItems &&
                        item.items?.some((sub) => isCurrentUrl(sub.href));

                    return hasSubItems ? (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isAnySubItemActive}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={{ children: item.title }}
                                        isActive={isAnySubItemActive}
                                        className="flex w-full justify-between text-zinc-300 transition-colors hover:bg-zinc-800/50"
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.icon && (
                                                <item.icon className="size-4" />
                                            )}
                                            <span className="font-medium">
                                                {item.title}
                                            </span>
                                        </div>
                                        <ChevronRight className="size-4 text-zinc-500 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    {/* Contenedor sin línea izquierda (border-none sobreescribe el estilo por defecto) */}
                                    <SidebarMenuSub className="ml-4 flex flex-col border-none py-2 pr-2 pl-1">
                                        {item.items?.map((subItem, index) => {
                                            const active = isCurrentUrl(
                                                subItem.href,
                                            );

                                            return (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                    className="list-none"
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={active}
                                                        className={`flex w-full items-center rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 ${
                                                            active
                                                                ? 'border-zinc-700 bg-zinc-800 font-medium text-white shadow-sm'
                                                                : 'cursor-pointer border-transparent bg-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900 hover:text-zinc-200'
                                                        }`}
                                                    >
                                                        <Link
                                                            href={subItem.href}
                                                            prefetch
                                                            className="flex w-full items-center gap-3"
                                                        >
                                                            <div
                                                                className={`size-1.5 rounded-full transition-colors ${active ? 'bg-zinc-300' : 'bg-zinc-700'}`}
                                                            />
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>

                                                    {/* Línea divisora entre elementos (se omite en el último) */}
                                                    {index <
                                                        item.items!.length -
                                                            1 && (
                                                        <div className="mx-2 my-1.5 h-[1px] bg-zinc-800/60" />
                                                    )}
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(item.href)}
                                tooltip={{ children: item.title }}
                                className="text-zinc-300 transition-colors hover:bg-zinc-800/50"
                            >
                                <Link
                                    href={item.href}
                                    prefetch
                                    className="flex items-center gap-2"
                                >
                                    {item.icon && (
                                        <item.icon className="size-4" />
                                    )}
                                    <span className="font-medium">
                                        {item.title}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
