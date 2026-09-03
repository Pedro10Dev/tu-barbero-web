import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler, useState, useRef, ChangeEvent } from 'react';

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
            <div className="w-full space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-100 shadow-2xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2 text-center">
                        <div className="mb-6 flex flex-col items-center justify-center">
                            <img
                                src="/favicon.ico"
                                alt="Logo"
                                className="h-20 w-20 object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            Verifica tu número
                        </h2>
                        <p className="mx-auto max-w-xs text-sm text-zinc-400">
                            Ingresa tu número celular para recibir
                            actualizaciones importantes sobre tus reservas.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-zinc-200"
                        >
                            Número de Teléfono
                        </label>

                        <div className="flex items-center gap-2">
                            <select
                                value={prefix}
                                onChange={handlePrefixChange}
                                className="h-12 w-28 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2 font-mono text-base text-white focus:ring-2 focus:ring-zinc-500"
                            >
                                {operatorPrefixes.map((p) => (
                                    <option
                                        key={p}
                                        value={p}
                                        className="bg-zinc-900 text-white"
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
                                className="h-12 flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 font-mono text-base text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-zinc-500"
                            />
                        </div>

                        {errors.phone && (
                            <p className="px-1 text-xs text-red-400">
                                {errors.phone}
                            </p>
                        )}
                        <p className="px-1 text-xs text-zinc-500">
                            Vista previa:{' '}
                            <span className="font-mono text-zinc-300">
                                {prefix}-{data.phone}
                            </span>
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={processing || data.phone.length !== 7}
                        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-black shadow transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : 'Guardar y Continuar'}
                    </button>

                    <div className="pt-2 text-center">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="text-xs text-zinc-500 underline transition hover:text-zinc-300"
                        >
                            Cerrar sesión
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
