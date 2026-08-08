import React from 'react';
import { Head } from '@inertiajs/react';

export default function Index({ services, barbers }: { services: any[], barbers: any[] }) {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Head title="Reservas - Barbería" />
            <h1 className="text-3xl font-bold text-gray-900">Módulo de Reservas</h1>
            <p className="mt-2 text-gray-600">Conexión exitosa entre Laravel e Inertia con React.</p>
        </div>
    );
}