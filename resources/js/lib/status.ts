import { Ban, CheckCircle2, CheckCheck, Clock, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type AppointmentStatus =
    'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';

type StatusStyle = {
    label: string;
    chip: string;
    dot: string;
    bar: string;
    icon: LucideIcon;
};

export const appointmentStatusConfig: Record<AppointmentStatus, StatusStyle> = {
    pending: {
        label: 'Pendiente',
        chip: 'border-warning/25 bg-warning/10 text-warning',
        dot: 'bg-warning',
        bar: 'bg-warning',
        icon: Clock,
    },
    confirmed: {
        label: 'Confirmada',
        chip: 'border-success/25 bg-success/10 text-success',
        dot: 'bg-success',
        bar: 'bg-success',
        icon: CheckCircle2,
    },
    rejected: {
        label: 'Rechazada',
        chip: 'border-destructive/25 bg-destructive/10 text-destructive',
        dot: 'bg-destructive',
        bar: 'bg-destructive',
        icon: XCircle,
    },
    cancelled: {
        label: 'Cancelada',
        chip: 'border-border bg-muted text-muted-foreground',
        dot: 'bg-muted-foreground',
        bar: 'bg-muted-foreground',
        icon: Ban,
    },
    completed: {
        label: 'Completada',
        chip: 'border-info/25 bg-info/10 text-info',
        dot: 'bg-info',
        bar: 'bg-info',
        icon: CheckCheck,
    },
};

export function appointmentStatus(status: string): StatusStyle {
    return (
        appointmentStatusConfig[status as AppointmentStatus] ??
        appointmentStatusConfig.pending
    );
}

const ACTIVITY_TONES: Record<string, string> = {
    emerald: 'bg-success',
    success: 'bg-success',
    blue: 'bg-info',
    info: 'bg-info',
    rose: 'bg-destructive',
    destructive: 'bg-destructive',
    amber: 'bg-warning',
    warning: 'bg-warning',
    neutral: 'bg-muted-foreground',
};

export function activityTone(tone: string): string {
    return ACTIVITY_TONES[tone] ?? 'bg-muted-foreground';
}
