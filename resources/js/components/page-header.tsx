import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageHeader({
    title,
    description,
    actions,
    className,
}: {
    title: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between',
                className,
            )}
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {title}
                </h1>
                {description && (
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
            {actions && (
                <div className="flex w-full shrink-0 items-center gap-2 sm:w-auto">
                    {actions}
                </div>
            )}
        </div>
    );
}
