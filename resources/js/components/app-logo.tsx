import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link
            href="/dashboard"
            className="group flex w-full items-center gap-1 text-left"
        >
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md transition group-hover:border-zinc-700">
                <img
                    src="/favicon.png"
                    alt="Logo TuBarbero"
                    className="size-6 object-contain"
                />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="truncate font-black tracking-wider text-white uppercase transition group-hover:text-zinc-300">
                    TuBarbero
                </span>
            </div>
        </Link>
    );
}
