import { Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft,
    Save,
    UserPlus,
    Phone,
    Lock,
    Upload,
    Trash2,
    Plus,
} from 'lucide-react';
import PasswordInput from '@/components/password-input';

type SocialLink = {
    platform: string;
    url: string;
};

type BarberRecord = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    display_name: string;
    bio: string | null;
    photo_url: string | null;
    social_links: SocialLink[];
    is_active: boolean;
};

const PHONE_PREFIXES = ['0412', '0414', '0424', '0416', '0426'];

const SOCIAL_PLATFORMS: { value: string; label: string }[] = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'x', label: 'X (Twitter)' },
];

export default function BarberForm({
    barber,
    passwordRules,
}: {
    barber?: BarberRecord | null;
    passwordRules?: string;
}) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: barber?.name ?? '',
        email: barber?.email ?? '',
        phone_prefix: barber?.phone ? barber.phone.slice(0, 4) : '0412',
        phone_number: barber?.phone ? barber.phone.slice(4) : '',
        display_name: barber?.display_name ?? '',
        bio: barber?.bio ?? '',
        photo: null as File | null,
        remove_photo: false,
        social_links: barber?.social_links ?? [],
        is_active: barber?.is_active ?? true,
        password: '',
        password_confirmation: '',
    });

    const isEditing = barber !== undefined && barber !== null;

    const previewUrl = data.photo
        ? URL.createObjectURL(data.photo)
        : data.remove_photo
          ? null
          : barber?.photo_url;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = { onSuccess: () => reset('photo', 'remove_photo') };

        if (isEditing) {
            put(`/admin/barbers/${barber.id}`, options);
        } else {
            post('/admin/barbers', options);
        }
    };

    const addSocialLink = () => {
        setData('social_links', [
            ...data.social_links,
            { platform: 'instagram', url: '' },
        ]);
    };

    const updateSocialLink = (
        index: number,
        field: keyof SocialLink,
        value: string,
    ) => {
        setData(
            'social_links',
            data.social_links.map((link, i) =>
                i === index ? { ...link, [field]: value } : link,
            ),
        );
    };

    const removeSocialLink = (index: number) => {
        setData(
            'social_links',
            data.social_links.filter((_, i) => i !== index),
        );
    };

    const inputClass =
        'w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-ring focus:outline-none';
    const labelClass =
        'mb-1.5 block text-xs font-semibold tracking-wider text-muted-foreground uppercase';

    return (
        <>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6 lg:p-8">
                <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-foreground">
                            <UserPlus className="size-6 text-muted-foreground" />
                            {isEditing ? 'Editar Barbero' : 'Nuevo Barbero'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {isEditing
                                ? 'Actualiza los datos del perfil y su usuario.'
                                : 'Se creará un usuario para que el barbero acceda a su cuenta.'}
                        </p>
                    </div>

                    <Link
                        href="/admin/barbers"
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-accent hover:text-foreground"
                    >
                        <ChevronLeft className="size-4" />
                        Volver
                    </Link>
                </div>

                <form
                    onSubmit={submit}
                    encType="multipart/form-data"
                    className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6"
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
                                className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition focus:border-ring focus:outline-none"
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
                        <div className="grid grid-cols-1 gap-5 border-t border-border pt-5 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label
                                    className={labelClass}
                                    htmlFor="password"
                                >
                                    Contraseña
                                </label>
                                <PasswordInput
                                    id="password"
                                    className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-ring focus:outline-none"
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
                                    className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground transition placeholder:text-muted-foreground focus:border-ring focus:outline-none"
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
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
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

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-[160px_1fr]">
                        <div className="space-y-1">
                            <label className={labelClass}>Foto de perfil</label>
                            <label
                                htmlFor="photo"
                                className="flex aspect-[4/5] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-muted transition hover:border-ring"
                            >
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Vista previa del barbero"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="flex flex-col items-center gap-2 p-4 text-center text-xs text-muted-foreground">
                                        <Upload className="size-6" />
                                        Subir foto
                                    </span>
                                )}
                                <input
                                    id="photo"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    className="hidden"
                                    onChange={(e) => {
                                        setData(
                                            'photo',
                                            e.currentTarget.files?.[0] ?? null,
                                        );
                                        setData('remove_photo', false);
                                    }}
                                />
                            </label>
                            {data.photo ? (
                                <button
                                    type="button"
                                    onClick={() => setData('photo', null)}
                                    className="flex items-center gap-1.5 text-xs text-rose-400 transition hover:text-rose-300"
                                >
                                    <Trash2 className="size-3.5" />
                                    Quitar foto seleccionada
                                </button>
                            ) : isEditing &&
                              barber?.photo_url &&
                              !data.remove_photo ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData('remove_photo', true)
                                    }
                                    className="flex items-center gap-1.5 text-xs text-rose-400 transition hover:text-rose-300"
                                >
                                    <Trash2 className="size-3.5" />
                                    Quitar foto
                                </button>
                            ) : isEditing && data.remove_photo ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData('remove_photo', false)
                                    }
                                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
                                >
                                    Usar foto actual
                                </button>
                            ) : null}
                            {data.remove_photo && !data.photo && (
                                <p className="text-xs text-amber-400">
                                    Se eliminará la foto al guardar.
                                </p>
                            )}
                            {errors.photo && (
                                <p className="text-xs text-rose-400">
                                    {errors.photo}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className={labelClass} htmlFor="bio">
                                Biografía (opcional)
                            </label>
                            <textarea
                                id="bio"
                                rows={8}
                                className={`${inputClass} h-full min-h-[160px] resize-none`}
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
                    </div>

                    <div className="space-y-3 border-t border-border pt-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Redes sociales
                            </span>
                            <button
                                type="button"
                                onClick={addSocialLink}
                                disabled={data.social_links.length >= 6}
                                className="flex items-center gap-1.5 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Plus className="size-4" />
                                Agregar red social
                            </button>
                        </div>

                        {errors.social_links && (
                            <p className="text-xs text-rose-400">
                                {errors.social_links}
                            </p>
                        )}

                        <div className="space-y-2">
                            {data.social_links.length === 0 ? (
                                <p className="rounded-xl border border-dashed border-border px-4 py-4 text-center text-xs text-muted-foreground">
                                    Aún no hay redes sociales agregadas.
                                </p>
                            ) : (
                                data.social_links.map((link, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-3 sm:flex-row"
                                    >
                                        <select
                                            value={link.platform}
                                            onChange={(e) =>
                                                updateSocialLink(
                                                    index,
                                                    'platform',
                                                    e.target.value,
                                                )
                                            }
                                            className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition focus:border-ring focus:outline-none sm:w-40"
                                        >
                                            {SOCIAL_PLATFORMS.map(
                                                (platform) => (
                                                    <option
                                                        key={platform.value}
                                                        value={platform.value}
                                                    >
                                                        {platform.label}
                                                    </option>
                                                ),
                                            )}
                                        </select>

                                        <input
                                            type="url"
                                            value={link.url}
                                            onChange={(e) =>
                                                updateSocialLink(
                                                    index,
                                                    'url',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                            className={inputClass}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeSocialLink(index)
                                            }
                                            aria-label={`Eliminar ${link.platform}`}
                                            className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {Object.keys(errors)
                            .filter((key) => key.startsWith('social_links'))
                            .map((key) => (
                                <p key={key} className="text-xs text-rose-400">
                                    {(errors as Record<string, string>)[key]}
                                </p>
                            ))}
                    </div>

                    <label className="flex w-fit cursor-pointer items-center gap-2.5 select-none">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData('is_active', e.target.checked)
                            }
                            className="size-4 rounded border-border bg-muted accent-emerald-500"
                        />
                        <span className="text-sm font-medium text-foreground">
                            Barbero activo en estación
                        </span>
                    </label>

                    <div className="flex justify-end gap-3 border-t border-border pt-5">
                        <Link
                            href="/admin/barbers"
                            className="rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-accent hover:text-foreground"
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
