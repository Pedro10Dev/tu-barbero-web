import { useForm } from '@inertiajs/react';
import { User, Mail, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

const VALID_PREFIXES = ['0412', '0414', '0424', '0416', '0426'];

export default function ClientProfileEdit({ user }: Props) {
    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
        });

    // Derivamos el prefijo y el número directamente del estado de Inertia
    const currentPhone = data.phone || '';
    const hasValidPrefix = VALID_PREFIXES.includes(currentPhone.slice(0, 4));
    const phonePrefix = hasValidPrefix ? currentPhone.slice(0, 4) : '0412';
    const phoneNumber = hasValidPrefix ? currentPhone.slice(4) : currentPhone;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch('/client/profile', {
            preserveScroll: true,
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#09090b] text-foreground selection:bg-muted">
            <Navbar />

            <main className="flex flex-grow items-center justify-center px-4 py-28 md:py-36">
                <div className="relative w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mb-6 border-b border-border pb-4">
                        <h1 className="text-xl font-bold tracking-tight text-foreground">
                            Información Personal
                        </h1>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Actualiza tus datos personales de contacto.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="name"
                                className="flex items-center gap-2 text-xs font-medium text-foreground"
                            >
                                <User className="h-3.5 w-3.5 text-muted-foreground" />{' '}
                                Nombre Completo
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                                className="h-11 rounded-xl border-border bg-muted/60 text-sm text-foreground transition-all focus:border-ring focus:ring-ring"
                            />
                            {errors.name && (
                                <p className="text-xs font-medium text-foreground">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="email"
                                    className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                                >
                                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />{' '}
                                    Correo Electrónico
                                </Label>
                                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                    No Editable
                                </span>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                disabled
                                className="h-11 cursor-not-allowed rounded-xl border-border bg-muted/60 text-sm text-muted-foreground"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="phone"
                                className="flex items-center gap-2 text-xs font-medium text-foreground"
                            >
                                <Phone className="h-3.5 w-3.5 text-muted-foreground" />{' '}
                                Teléfono de Contacto
                            </Label>

                            <div className="flex gap-2">
                                <select
                                    value={phonePrefix}
                                    onChange={(e) =>
                                        setData(
                                            'phone',
                                            `${e.target.value}${phoneNumber}`,
                                        )
                                    }
                                    className="h-11 rounded-xl border border-border bg-muted/60 px-3 py-2 text-sm text-foreground transition-all focus:border-ring focus:ring-ring"
                                >
                                    <option value="0412">0412</option>
                                    <option value="0414">0414</option>
                                    <option value="0424">0424</option>
                                    <option value="0416">0416</option>
                                    <option value="0426">0426</option>
                                </select>

                                <Input
                                    id="phone"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={7}
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const numericValue =
                                            e.currentTarget.value.replace(
                                                /\D/g,
                                                '',
                                            );
                                        setData(
                                            'phone',
                                            `${phonePrefix}${numericValue}`,
                                        );
                                    }}
                                    placeholder="1234567"
                                    className="h-11 rounded-xl border-border bg-muted/60 text-sm text-foreground transition-all focus:border-ring focus:ring-ring"
                                />
                            </div>

                            {errors.phone && (
                                <p className="text-xs font-medium text-foreground">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between border-t border-border pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
                            >
                                {processing && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}
                                {processing
                                    ? 'Guardando...'
                                    : 'Guardar Cambios'}
                            </Button>

                            {recentlySuccessful && (
                                <div className="flex items-center gap-1.5 rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-3 py-2 text-xs font-medium text-emerald-400">
                                    <CheckCircle2 className="h-4 w-4" />{' '}
                                    Actualizado con éxito
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
