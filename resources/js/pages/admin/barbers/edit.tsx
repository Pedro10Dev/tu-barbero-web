import { Head } from '@inertiajs/react';
import BarberForm from '@/pages/admin/barbers/barber-form';

type BarberRecord = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    display_name: string;
    bio: string | null;
    is_active: boolean;
};

export default function EditBarber({ barber }: { barber: BarberRecord }) {
    return (
        <>
            <Head title="Editar Barbero" />
            <BarberForm barber={barber} />
        </>
    );
}
