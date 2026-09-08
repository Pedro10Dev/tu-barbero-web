import { Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Save, UserPlus, Phone, Lock } from 'lucide-react';
import PasswordInput from '@/components/password-input';

type BarberRecord = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    display_name: string;
    bio: string | null;
    is_active: boolean;
};

const PHONE_PREFIXES = ['0412', '0414', '0424', '0416', '0426'];

export default function BarberForm({
    barber,
    passwordRules,
}: {
    barber?: BarberRecord | null;
    passwordRules?: string;
}) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: barber?.name ?? '',
        email: barber?.email ?? '',
        phone_prefix: barber?.phone ? barber.phone.slice(0, 4) : '0412',
        phone_number: barber?.phone ? barber.phone.slice(4) : '',
        display_name: barber?.display_name ?? '',
        bio: barber?.bio ?? '',
        is_active: barber?.is_active ?? true,
        password: '',
        password_confirmation: '',
    });

    const isEditing = barber !== undefined && barber !== null;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(`/admin/barbers/${barber.id}`);
        } else {
            post('/admin/barbers');
        }
    };

    const inputClass =
        'w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none';
    const labelClass =
        'mb-1.5 block text-xs font-semibold tracking-wider text-zinc-400 uppercase';

    return (
        <>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6 lg:p-8">
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <UserPlus className="size-6 text-zinc-400" />
                            {isEditing ? 'Editar Barbero' : 'Nuevo Barbero'}
                        </h1>
                        <p className="text-sm text-zinc-400">
                            {isEditing
                                ? 'Actualiza los datos del perfil y su usuario.'
                                : 'Se creará un usuario para que el barbero acceda a su cuenta.'}
                        </p>
                    </div>

                    <Link
                        href="/admin/barbers"
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                    >
                        <ChevronLeft className="size-4" />
                        Volver
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    className="flex flex-col gap-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6"
                >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label className={labelClass} htmlFor="name">
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                className={inputClass}
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Nombre real del usuario"
                            />
                            {errors.name && (
                                <p className="text-xs text-rose-400">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className={labelClass} htmlFor="email">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                className={inputClass}
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="correo@example.com"
                            />
                            {errors.email && (
                                <p className="text-xs text-rose-400">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className={labelClass} htmlFor="phone_number">
                            Teléfono
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={data.phone_prefix}
                                onChange={(e) =>
                                    setData('phone_prefix', e.target.value)
                                }
                                className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-3 py-2.5 text-sm text-white transition focus:border-zinc-700 focus:outline-none"
                            >
                                {PHONE_PREFIXES.map((prefix) => (
                                    <option key={prefix} value={prefix}>
                                        {prefix}
                                    </option>
                                ))}
                            </select>

                            <input
                                id="phone_number"
                                type="text"
                                inputMode="numeric"
                                maxLength={7}
                                className={inputClass}
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
                        {errors.phone_number || errors.phone_prefix ? (
                            <p className="text-xs text-rose-400">
                                {errors.phone_number ?? errors.phone_prefix}
                            </p>
                        ) : null}
                        <p className="flex items-center gap-1.5 text-xs text-emerald-400/80">
                            <Phone className="size-3.5" />
                            Obligatorio para el ingreso del barbero.
                        </p>
                    </div>

                    {!isEditing && (
                        <div className="grid grid-cols-1 gap-5 border-t border-zinc-800/60 pt-5 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label
                                    className={labelClass}
                                    htmlFor="password"
                                >
                                    Contraseña
                                </label>
                                <PasswordInput
                                    id="password"
                                    className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    placeholder="Contraseña"
                                    passwordrules={passwordRules}
                                />
                                {errors.password && (
                                    <p className="text-xs text-rose-400">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label
                                    className={labelClass}
                                    htmlFor="password_confirmation"
                                >
                                    Confirmar contraseña
                                </label>
                                <PasswordInput
                                    id="password_confirmation"
                                    className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Repite la contraseña"
                                    passwordrules={passwordRules}
                                />
                                {errors.password_confirmation && (
                                    <p className="text-xs text-rose-400">
                                        {errors.password_confirmation}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {!isEditing && (
                        <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                            <Lock className="size-3.5" />
                            El barbero deberá confirmar su correo y cambiar esta
                            contraseña al ingresar por primera vez.
                        </p>
                    )}

                    <div className="space-y-1">
                        <label className={labelClass} htmlFor="display_name">
                            Nombre en estación
                        </label>
                        <input
                            id="display_name"
                            className={inputClass}
                            value={data.display_name}
                            onChange={(e) =>
                                setData('display_name', e.target.value)
                            }
                            placeholder="Cómo aparece en la agenda"
                        />
                        {errors.display_name && (
                            <p className="text-xs text-rose-400">
                                {errors.display_name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className={labelClass} htmlFor="bio">
                            Biografía (opcional)
                        </label>
                        <textarea
                            id="bio"
                            rows={3}
                            className={`${inputClass} resize-none`}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            placeholder="Especialidades, experiencia, estilo..."
                        />
                        {errors.bio && (
                            <p className="text-xs text-rose-400">
                                {errors.bio}
                            </p>
                        )}
                    </div>

                    <label className="flex w-fit cursor-pointer items-center gap-2.5 select-none">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData('is_active', e.target.checked)
                            }
                            className="size-4 rounded border-zinc-700 bg-zinc-900 accent-emerald-500"
                        />
                        <span className="text-sm font-medium text-zinc-300">
                            Barbero activo en estación
                        </span>
                    </label>

                    <div className="flex justify-end gap-3 border-t border-zinc-800/60 pt-5">
                        <Link
                            href="/admin/barbers"
                            className="rounded-xl border border-zinc-700/50 bg-zinc-800/60 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50"
                        >
                            <Save className="size-4" />
                            {processing
                                ? 'Guardando...'
                                : isEditing
                                  ? 'Guardar cambios'
                                  : 'Crear barbero'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
