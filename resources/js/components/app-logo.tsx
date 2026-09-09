import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function AppLogo({ className }: { className?: string }) {
    return (
        <Link
            href="/dashboard"
            className={cn(
                'group flex w-full items-center gap-1 text-left',
                className,
            )}
        >
            <div className="flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition group-hover:border-zinc-700">
                <img
                    src="/favicon.png"
                    alt="Logo TuBarbero"
                    className="size-6 object-contain"
                />
            </div>
            <div className="ml-2 grid min-w-0 flex-1 text-left text-sm">
                <span className="hidden truncate font-black tracking-wider text-white uppercase transition group-hover:text-zinc-300 min-[25rem]:block">
                    TuBarbero
                </span>
            </div>
        </Link>
    );
}
