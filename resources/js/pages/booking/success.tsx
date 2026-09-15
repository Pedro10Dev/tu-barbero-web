import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Success() {
    return (
       <div className="dark flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
    <Head title="Reserva Confirmada" />
    <div className="grain-overlay" aria-hidden="true" />
    <main className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
        {/* Contenedor del Sello Centrado */}
        <div className="relative mb-8 flex items-center justify-center">
            {/* Halo Exterior / Echo Centrado */}
            <div className="absolute h-44 w-44 rounded-[1.25rem] border border-landing-success/40" />
            
            {/* Sello Principal */}
            <div className="relative flex h-36 w-36 flex-col items-center justify-center rounded-[1.25rem] border border-landing-success/30 p-4 sm:h-40 sm:w-40">
                {/* Borde Interno */}
                <div className="absolute inset-2 rounded-xl border-2 border-landing-success/70 pointer-events-none" />
                
                {/* Contenido perfectamente alineado */}
                <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-landing-success/70">
                    TU BARBERO
                </p>
                <svg
                    className="seal__check my-2 h-10 w-10 text-landing-success"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path
                        pathLength="100"
                        d="M5 12.5l5 5 9-11"
                    />
                </svg>
                <p className="font-mono text-xs font-semibold tracking-[0.25em] text-landing-success">
                    CONFIRMADO
                </p>
            </div>
        </div>

        <h1 className="confirm-enter confirm-enter--1 mb-2 font-serif text-4xl tracking-tight text-foreground">
            Reserva confirmada
        </h1>
        <p className="confirm-enter confirm-enter--2 mb-8 font-light text-muted-foreground">
            Tu cita ha sido registrada correctamente. El barbero la
            revisará y confirmará pronto.
        </p>
        <Link
            href="/"
            className="confirm-enter confirm-enter--3 inline-block rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
            Volver al inicio
        </Link>
    </main>
</div>
    );
}
