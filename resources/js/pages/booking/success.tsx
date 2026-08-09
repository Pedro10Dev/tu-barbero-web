import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Success() {
    return (
        <div className="p-6 max-w-md mx-auto text-center mt-12">
            <Head title="Reserva Exitosa" />
            <div className="mb-4 text-green-500 text-5xl">✓</div>
            <h1 className="text-2xl font-bold mb-2">¡Reserva Solicitada!</h1>
            <p className="text-gray-600 mb-6">
                Tu cita ha sido registrada correctamente. El barbero la revisará y confirmará pronto.
            </p>
            <Link
                href="/"
                className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
            >
                Volver al inicio
            </Link>
        </div>
    );
}