import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    userName?: string;
    passwordRules: string;
};

export default function ForcedPassword({ userName, passwordRules }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/settings/password', {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Cambia tu contraseña" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Hola,{' '}
                        <span className="font-semibold text-foreground">
                            {userName}
                        </span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Por seguridad, establece una nueva contraseña antes de
                        continuar.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="current_password">Contraseña actual</Label>
                    <PasswordInput
                        id="current_password"
                        required
                        autoComplete="current-password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        placeholder="Contraseña temporal asignada"
                    />
                    <InputError message={errors.current_password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Nueva contraseña</Label>
                    <PasswordInput
                        id="password"
                        required
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Nueva contraseña"
                        passwordrules={passwordRules}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">
                        Confirmar nueva contraseña
                    </Label>
                    <PasswordInput
                        id="password_confirmation"
                        required
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        placeholder="Repite la nueva contraseña"
                        passwordrules={passwordRules}
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button
                    type="submit"
                    className="mt-2 w-full"
                    disabled={processing}
                >
                    {processing && <Spinner />}
                    Cambiar contraseña y continuar
                </Button>
            </form>
        </>
    );
}

ForcedPassword.layout = {
    title: 'Cambio de contraseña',
    description: 'Establece una nueva contraseña para tu cuenta',
};
