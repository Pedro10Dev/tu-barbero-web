import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

const VALID_PREFIXES = ['0412', '0414', '0424', '0416', '0426'];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<PageProps>().props;

    const currentPhone = auth.user.phone || '';
    const hasValidPrefix =
        typeof currentPhone === 'string' &&
        VALID_PREFIXES.includes(currentPhone.slice(0, 4));

    const { data, setData, patch, processing, errors } = useForm({
        name: auth.user.name,
        phone: currentPhone,
    });

    const phonePrefix = hasValidPrefix ? currentPhone.slice(0, 4) : '0412';
    const phoneNumber = hasValidPrefix ? currentPhone.slice(4) : currentPhone;

    const changePrefix = (value: string) => {
        setData('phone', `${value}${phoneNumber}`);
    };

    const changeNumber = (value: string) => {
        const numericValue = value.replace(/\D/g, '');

        setData('phone', `${phonePrefix}${numericValue}`);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/settings/profile', { preserveScroll: true });
    };

    const inputClass =
        'mt-1 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-ring focus:outline-none';

    return (
        <>
            <Head title="Ajustes de perfil" />

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Perfil"
                    description="Actualiza tu nombre y tu número de teléfono"
                />

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Tu nombre completo"
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <div className="relative">
                            <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                className={`${inputClass} cursor-not-allowed bg-muted/60 pl-10 opacity-70`}
                                defaultValue={auth.user.email}
                                disabled
                                readOnly
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            El correo no se puede modificar.
                        </p>
                    </div>

                    {mustVerifyEmail &&
                        auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Tu correo electrónico no está verificado.{' '}
                                    <Link
                                        href={send()}
                                        as="button"
                                        className="font-semibold text-brand underline underline-offset-4 transition hover:text-brand/80"
                                    >
                                        Reenviar correo de verificación
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <p className="mt-2 text-sm font-medium text-brand">
                                        Se envió un nuevo enlace de verificación
                                        a tu correo.
                                    </p>
                                )}
                            </div>
                        )}

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <div className="flex gap-2">
                            <select
                                value={phonePrefix}
                                onChange={(e) => changePrefix(e.target.value)}
                                className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition focus:border-ring focus:outline-none"
                            >
                                {VALID_PREFIXES.map((prefix) => (
                                    <option key={prefix} value={prefix}>
                                        {prefix}
                                    </option>
                                ))}
                            </select>
                            <Input
                                id="phone"
                                type="text"
                                inputMode="numeric"
                                maxLength={7}
                                value={phoneNumber}
                                onChange={(e) => changeNumber(e.target.value)}
                                placeholder="1234567"
                                className="mt-0 block w-full"
                            />
                        </div>
                        <InputError className="mt-2" message={errors.phone} />
                    </div>

                    <div className="flex items-center gap-4 border-t border-border pt-5">
                        <Button
                            disabled={processing}
                            data-test="update-profile-button"
                        >
                            {processing ? 'Guardando...' : 'Guardar cambios'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Ajustes de perfil',
            href: '/settings/profile',
        },
    ],
};
