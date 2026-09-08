import { Head } from '@inertiajs/react';
import BarberForm from '@/pages/admin/barbers/barber-form';

export default function CreateBarber({
    passwordRules,
}: {
    passwordRules: string;
}) {
    return (
        <>
            <Head title="Nuevo Barbero" />
            <BarberForm passwordRules={passwordRules} />
        </>
    );
}
