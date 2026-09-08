import { Head } from '@inertiajs/react';
import ServiceForm from '@/pages/admin/services/service-form';

type ServiceRecord = {
    id: number;
    name: string;
    duration_minutes: number;
    price: number;
};

export default function EditService({ service }: { service: ServiceRecord }) {
    return (
        <>
            <Head title="Editar Servicio" />
            <ServiceForm service={service} />
        </>
    );
}
