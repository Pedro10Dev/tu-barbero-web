import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Sparkline } from '@/components/charts';
import { cn } from '@/lib/utils';

type StatCardProps = {
    label: string;
    value: ReactNode;
    icon?: LucideIcon;
    hint?: ReactNode;
    delta?: number;
    deltaInverse?: boolean;
    trend?: number[];
    chart?: ReactNode;
};

export function StatCard({
    label,
    value,
    icon: Icon,
    hint,
    delta,
    deltaInverse = false,
    trend,
    chart,
}: StatCardProps) {
    const positive = (delta ?? 0) >= 0;
    const good = deltaInverse ? !positive : positive;
    const DeltaIcon = positive ? ArrowUpRight : ArrowDownRight;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    {label}
                </span>
                {Icon && (
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand dark:border-brand/40 dark:bg-brand/20 dark:text-brand">
                        <Icon className="size-4" />
                    </span>
                )}
            </div>

            <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                        <span className="tabular text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            {value}
                        </span>
                        {delta !== undefined && (
                            <span
                                className={cn(
                                    'tabular inline-flex items-center gap-0.5 text-xs font-semibold',
                                    good ? 'text-success' : 'text-destructive',
                                )}
                            >
                                <DeltaIcon className="size-3.5" />
                                {Math.abs(delta)}%
                            </span>
                        )}
                    </div>
                    {hint && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            {hint}
                        </p>
                    )}
                </div>

                {chart ??
                    (trend && trend.length > 1 && (
                        <Sparkline
                            data={trend}
                            className="h-10 w-24 shrink-0 text-brand"
                        />
                    ))}
            </div>
        </div>
    );
}
