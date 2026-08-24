import { useForm } from '@inertiajs/react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, CheckCircle2, Loader2 } from 'lucide-react';

interface Props {
    user: {
        name: string;
        email: string;
        phone: string;
    };
}

export default function ClientProfileEdit({ user }: Props) {
    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/client/profile');
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#09090b] text-zinc-100 selection:bg-zinc-800">
            <Navbar />

            <main className="flex flex-grow items-center justify-center px-4 py-28 md:py-36">
                <div className="relative w-full max-w-xl rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mb-6 border-b border-zinc-800/80 pb-4">
                        <h1 className="text-xl font-bold tracking-tight text-white">
                           Información Personal 
                        </h1>
                        <p className="mt-1 text-xs text-zinc-400">
                            Actualiza tus datos personales de contacto.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="name"
                                className="flex items-center gap-2 text-xs font-medium text-zinc-300"
                            >
                                <User className="h-3.5 w-3.5 text-zinc-500" />{' '}
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
                                className="h-11 rounded-xl border-zinc-800 bg-zinc-950/60 text-sm text-zinc-100 transition-all focus:border-zinc-500 focus:ring-zinc-500"
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="email"
                                    className="flex items-center gap-2 text-xs font-medium text-zinc-400"
                                >
                                    <Mail className="h-3.5 w-3.5 text-zinc-600" />{' '}
                                    Correo Electrónico
                                </Label>
                                <span className="rounded-md bg-zinc-800/50 px-2 py-0.5 text-[10px] text-zinc-500">
                                    No Editable
                                </span>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                disabled
                                className="h-11 cursor-not-allowed rounded-xl border-zinc-800/50 bg-zinc-950/20 text-sm text-zinc-500"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="phone"
                                className="flex items-center gap-2 text-xs font-medium text-zinc-300"
                            >
                                <Phone className="h-3.5 w-3.5 text-zinc-500" />{' '}
                                Teléfono de Contacto
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                placeholder="Ej: 04141234567"
                                className="h-11 rounded-xl border-zinc-800 bg-zinc-950/60 text-sm text-zinc-100 transition-all focus:border-zinc-500 focus:ring-zinc-500"
                            />
                            {errors.phone && (
                                <p className="text-xs text-red-400">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between border-t border-zinc-800/80 pt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex h-11 items-center gap-2 rounded-xl bg-white px-6 text-sm font-medium text-zinc-950 shadow-lg transition-all hover:bg-zinc-200"
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
