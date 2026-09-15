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

const menuItemClass =
    'rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground data-[active=true]:bg-brand/15 data-[active=true]:font-medium data-[active=true]:text-brand';

export function NavMain({
    items = [],
    label = 'Estación',
}: {
    items: ExtendedNavItem[];
    label?: string;
}) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold tracking-wider text-sidebar-foreground/50 uppercase">
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
                                        className={`${menuItemClass} flex w-full justify-between`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.icon && (
                                                <item.icon className="size-4" />
                                            )}
                                            <span className="font-medium">
                                                {item.title}
                                            </span>
                                        </div>
                                        <ChevronRight className="size-4 text-sidebar-foreground/50 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => {
                                            const active = isCurrentUrl(
                                                subItem.href,
                                            );

                                            return (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={active}
                                                        className={`h-8 rounded-lg transition-colors ${
                                                            active
                                                                ? 'bg-brand/10 font-medium text-brand'
                                                                : 'text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                                                        }`}
                                                    >
                                                        <Link
                                                            href={subItem.href}
                                                            prefetch
                                                            className="flex w-full items-center gap-2.5"
                                                        >
                                                            <span
                                                                className={`size-1.5 shrink-0 rounded-full transition-colors ${
                                                                    active
                                                                        ? 'bg-brand'
                                                                        : 'bg-sidebar-foreground/30'
                                                                }`}
                                                            />
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
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
                                className={menuItemClass}
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
