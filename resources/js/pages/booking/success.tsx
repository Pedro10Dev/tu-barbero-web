import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Success() {
    return (
        <div className="mx-auto mt-12 max-w-md p-6 text-center">
            <Head title="Reserva Exitosa" />
            <div className="mb-4 text-5xl text-emerald-500">✓</div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
                ¡Reserva Solicitada!
            </h1>
            <p className="mb-6 text-muted-foreground">
                Tu cita ha sido registrada correctamente. El barbero la revisará
                y confirmará pronto.
            </p>
            <Link
                href="/"
                className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
