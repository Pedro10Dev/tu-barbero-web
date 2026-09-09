import type { InertiaLinkProps } from '@inertiajs/react';
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function formatTimeAMPM(time: string): string {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;

    return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function formatDateTimeAMPM(datetime: string): string {
    const index = datetime.indexOf(' ');

    if (index === -1) {
        return datetime;
    }

    return `${datetime.slice(0, index)} ${formatTimeAMPM(datetime.slice(index + 1))}`;
}
