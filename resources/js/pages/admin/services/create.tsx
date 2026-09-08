import { Head } from '@inertiajs/react';
import ServiceForm from '@/pages/admin/services/service-form';

export default function CreateService() {
    return (
        <>
            <Head title="Nuevo Servicio" />
            <ServiceForm />
        </>
    );
}
