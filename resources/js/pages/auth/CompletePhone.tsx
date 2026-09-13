import { Head, useForm, Link } from '@inertiajs/react';
import type { FormEventHandler, ChangeEvent } from 'react';
import { useState, useRef } from 'react';

export default function CompletePhone() {
    const { data, setData, post, processing, errors } = useForm({
        phone: '',
    });

    const [prefix, setPrefix] = useState('0412');
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const operatorPrefixes = ['0412', '0414', '0416', '0424', '0426'];

    const handlePrefixChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPrefix(e.target.value);
        phoneInputRef.current?.focus();
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, '');

        // Si pegan los 11 dígitos con prefijo incluido
        if (value.length >= 11) {
            const detectedPrefix = value.slice(0, 4);

            if (operatorPrefixes.includes(detectedPrefix)) {
                setPrefix(detectedPrefix);
                value = value.slice(4);
            }
        }

        // Cortar estrictamente a 7 caracteres
        setData('phone', value.slice(0, 7));
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const fullPhoneNumber = `${prefix}${data.phone}`;

        if (fullPhoneNumber.length !== 11) {
            return;
        }

        setData('phone', fullPhoneNumber);

        post('/complete-profile/phone', {
            preserveScroll: true,
            onError: (errs) => {
                console.error('Errores de validación:', errs);
            },
        });
    };

    return (
        <>
            <Head title="Completa tu perfil" />
            <div className="w-full space-y-6 rounded-3xl border border-border bg-card p-8 text-foreground shadow-2xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <div className="mb-6 flex flex-col items-center justify-center">
                            <img
                                src="/favicon.ico"
                                alt="Logo"
                                className="h-20 w-20 object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Verifica tu número
                        </h2>
                        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
                            Ingresa tu número celular para recibir
                            actualizaciones importantes sobre tus reservas.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-foreground"
                        >
                            Número de Teléfono
                        </label>

                        <div className="flex items-center gap-2">
                            <select
                                value={prefix}
                                onChange={handlePrefixChange}
                                className="h-12 w-28 rounded-xl border border-border bg-muted px-3 py-2 font-mono text-base text-foreground focus:ring-2 focus:ring-ring"
                            >
                                {operatorPrefixes.map((p) => (
                                    <option
                                        key={p}
                                        value={p}
                                        className="bg-background text-foreground"
                                    >
                                        {p}
                                    </option>
                                ))}
                            </select>

                            <input
                                ref={phoneInputRef}
                                type="tel"
                                id="phone"
                                autoComplete="off"
                                value={data.phone}
                                onChange={handlePhoneChange}
                                maxLength={7}
                                placeholder="1234567"
                                className="h-12 flex-1 rounded-xl border border-border bg-muted px-4 py-2 font-mono text-base text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                            />
                        </div>

                        {errors.phone && (
                            <p className="px-1 text-xs text-destructive">
                                {errors.phone}
                            </p>
                        )}
                        <p className="px-1 text-xs text-muted-foreground">
                            Vista previa:{' '}
                            <span className="font-mono text-foreground">
                                {prefix}-{data.phone}
                            </span>
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={processing || data.phone.length !== 7}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : 'Guardar y Continuar'}
                    </button>

                    <div className="pt-2 text-center">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-xs text-muted-foreground underline transition hover:text-foreground"
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
