import { Head, Link} from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { useForm } from '@inertiajs/react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone_prefix: '0412',
        phone_number: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Unimos el prefijo y el número en el campo phone justo antes de enviar
        data.phone = `${data.phone_prefix}${data.phone_number}`;

        post('/register', {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Registrarse" />
            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nombre completo"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <div className="flex gap-2">
                            <select
                                value={data.phone_prefix}
                                onChange={(e) =>
                                    setData('phone_prefix', e.target.value)
                                }
                                className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            >
                                <option value="0412">0412</option>
                                <option value="0414">0414</option>
                                <option value="0424">0424</option>
                                <option value="0416">0416</option>
                                <option value="0426">0426</option>
                            </select>

                            <Input
                                id="phone_number"
                                type="text"
                                inputMode="numeric"
                                maxLength={7}
                                required
                                value={data.phone_number}
                                onChange={(e) => {
                                    const numericValue =
                                        e.currentTarget.value.replace(
                                            /\D/g,
                                            '',
                                        );
                                    setData('phone_number', numericValue);
                                }}
                                placeholder="1234567"
                            />
                        </div>
                        <InputError message={errors.phone} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <PasswordInput
                            id="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            placeholder="Contraseña"
                            passwordrules={passwordRules}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirmar contraseña
                        </Label>
                        <PasswordInput
                            id="password_confirmation"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            placeholder="Confirm password"
                            passwordrules={passwordRules}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        tabIndex={5}
                        disabled={processing}
                        data-test="register-user-button"
                    >
                        {processing && <Spinner />}
                        Crear cuenta
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    ¿Ya tienes una cuenta?{' '}
                    <TextLink href={login()} tabIndex={6}>
                        Iniciar sesión
                    </TextLink>
                </div>
            </form>
        </>
    );
}

Register.layout = {
    title: 'Crear cuenta',
    description: 'Introduce tus datos a continuación para crear tu cuenta',
};
