import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Success() {
    return (
        <div className="mx-auto mt-12 max-w-md p-6 text-center">
            <Head title="Reserva Exitosa" />
            <div className="mb-4 text-5xl text-green-500">✓</div>
            <h1 className="mb-2 text-2xl font-bold">¡Reserva Solicitada!</h1>
            <p className="mb-6 text-gray-600">
                Tu cita ha sido registrada correctamente. El barbero la revisará
                y confirmará pronto.
            </p>
            <Link
                href="/"
                className="inline-block rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
