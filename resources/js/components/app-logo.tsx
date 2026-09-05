import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href="/dashboard" className="flex items-center gap-1 w-full text-left group">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden shadow-md group-hover:border-zinc-700 transition">
                <img 
                    src="/favicon.png" 
                    alt="Logo TuBarbero" 
                    className="size-6 object-contain" 
                />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm">
                <span className="truncate font-black tracking-wider uppercase text-white group-hover:text-zinc-300 transition">
                    TuBarbero
                </span>
            </div>
        </Link>
    );
}