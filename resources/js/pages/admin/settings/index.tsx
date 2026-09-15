import { Head, useForm } from '@inertiajs/react';
import {
    Building2,
    Save,
    Phone,
    MessageCircle,
    MapPin,
    Clock,
    Store,
} from 'lucide-react';
import { PageHeader } from '@/components/page-header';

type Business = {
    business_name: string;
    business_phone: string;
    business_whatsapp: string;
    business_address: string;
    business_hours: string;
};

export default function AdminSettings({ business }: { business: Business }) {
    const { data, setData, patch, processing, errors } = useForm<Business>({
        business_name: business.business_name,
        business_phone: business.business_phone,
        business_whatsapp: business.business_whatsapp,
        business_address: business.business_address,
        business_hours: business.business_hours,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/admin/settings', { preserveScroll: true });
    };

    const inputClass =
        'w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-ring focus:outline-none';
    const labelClass =
        'mb-1.5 block text-xs font-semibold tracking-wider text-muted-foreground uppercase';

    const fields: {
        key: keyof Business;
        label: string;
        icon: React.ReactNode;
        textarea?: boolean;
        placeholder: string;
    }[] = [
        {
            key: 'business_name',
            label: 'Nombre del negocio',
            icon: <Building2 className="size-4 text-foreground" />,
            placeholder: 'Ej. TuBarbero',
        },
        {
            key: 'business_phone',
            label: 'Teléfono',
            icon: <Phone className="size-4 text-foreground" />,
            placeholder: 'Ej. 0412 123 4567',
        },
        {
            key: 'business_whatsapp',
            label: 'WhatsApp',
            icon: <MessageCircle className="size-4 text-foreground" />,
            placeholder: 'Ej. 0412 123 4567',
        },
        {
            key: 'business_address',
            label: 'Dirección',
            icon: <MapPin className="size-4 text-foreground" />,
            placeholder: 'Ej. Av. Principal, local 5, Caracas',
        },
        {
            key: 'business_hours',
            label: 'Horario de atención',
            icon: <Clock className="size-4 text-foreground" />,
            textarea: true,
            placeholder: 'Ej. Lun a Sáb 9:00 - 19:00',
        },
    ];

    return (
        <>
            <Head title="Configuración" />

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Configuración"
                    description="Ficha pública del negocio que se muestra a tus clientes."
                    actions={
                        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-brand">
                                <Store className="size-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Negocio
                                </span>
                                <span className="text-base font-bold text-foreground">
                                    {business.business_name}
                                </span>
                            </div>
                        </div>
                    }
                />

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
                        {fields.map((field) => (
                            <div key={field.key} className="space-y-1">
                                <label
                                    className={`${labelClass} flex items-center gap-1.5`}
                                    htmlFor={field.key}
                                >
                                    {field.icon}
                                    {field.label}
                                </label>
                                {field.textarea ? (
                                    <textarea
                                        id={field.key}
                                        rows={2}
                                        className={`${inputClass} resize-none`}
                                        value={data[field.key]}
                                        onChange={(e) =>
                                            setData(field.key, e.target.value)
                                        }
                                        placeholder={field.placeholder}
                                    />
                                ) : (
                                    <input
                                        id={field.key}
                                        type="text"
                                        className={inputClass}
                                        value={data[field.key]}
                                        onChange={(e) =>
                                            setData(field.key, e.target.value)
                                        }
                                        placeholder={field.placeholder}
                                    />
                                )}
                                {errors[field.key] && (
                                    <p className="text-xs text-destructive">
                                        {errors[field.key]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90 disabled:opacity-50"
                        >
                            <Save className="size-4" />
                            {processing ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
