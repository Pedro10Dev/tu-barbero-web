import { Link, Head } from '@inertiajs/react';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 p-4">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    {title && (
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href="/"
                                className="group flex items-center justify-center transition-transform hover:scale-105"
                            >
                                <img
                                    src="/favicon.ico"
                                    alt="Logo"
                                    className="h-20 w-20 object-contain"
                                />
                            </Link>

                            <div className="space-y-1 text-center">
                                <h1 className="text-xl font-bold tracking-tight text-white">
                                    {title}
                                </h1>
                                {description && (
                                    <p className="max-w-xs text-center text-sm text-zinc-400">
                                        {description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );
}
