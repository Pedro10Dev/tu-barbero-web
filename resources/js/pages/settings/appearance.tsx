import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';

export default function Appearance() {
    return (
        <>
            <Head title="Apariencia" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Apariencia"
                    description="Personaliza cómo se ve tu panel en esta cuenta"
                />
                <AppearanceTabs />
            </div>
        </>
    );
}

Appearance.layout = {
    breadcrumbs: [
        {
            title: 'Apariencia',
            href: '/settings/appearance',
        },
    ],
};
