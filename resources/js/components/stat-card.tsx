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
        <div className="flex h-full flex-col justify-between gap-5 bg-card p-5">
            <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                    {label}
                </span>
                {Icon && (
                    <span className="flex size-8 shrink-0 items-center justify-center border border-brand/30 text-brand">
                        <Icon className="size-3.5" />
                    </span>
                )}
            </div>

            <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                        <span className="tabular font-mono text-3xl font-medium tracking-tight text-foreground">
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
                        <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
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