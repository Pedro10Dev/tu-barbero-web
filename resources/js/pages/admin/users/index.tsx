import { Head, router } from '@inertiajs/react';
import { Users, Search, ShieldCheck, BadgeCheck, Mail } from 'lucide-react';
import { useState } from 'react';

type UserRecord = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    emailVerified: boolean;
    createdAt: string;
    roles: string[];
    appointmentCount: number;
};

const roleChip: Record<string, string> = {
    client: 'border-zinc-700/60 bg-zinc-800/80 text-zinc-300',
    barber: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
    admin: 'border-purple-500/20 bg-purple-500/10 text-purple-400',
};

export default function AdminUsers({ users }: { users: UserRecord[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [changingId, setChangingId] = useState<number | null>(null);

    const changeRole = (id: number, role: string) => {
        setChangingId(id);
        router.patch(
            `/admin/users/${id}/role`,
            { role },
            {
                preserveScroll: true,
                onFinish: () => setChangingId(null),
            },
        );
    };

    const visibleUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.phone ?? '').includes(searchTerm),
    );

    return (
        <>
            <Head title="Usuarios" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera */}
                <div className="flex flex-col justify-between gap-4 border-b border-zinc-800/80 pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-white">
                            <Users className="size-6 text-zinc-400" />
                            Usuarios
                        </h1>
                        <p className="text-sm text-zinc-400">
                            Todos los usuarios del sistema y sus roles.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 px-4 py-3">
                        <div className="flex size-10 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800/80 text-zinc-300">
                            <Users className="size-5" />
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-zinc-400">
                                Total
                            </span>
                            <span className="text-base font-bold text-white">
                                {users.length}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Búsqueda */}
                <div className="relative flex w-full items-center">
                    <Search className="absolute left-3.5 size-4 text-zinc-500" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre, email o teléfono..."
                        className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 transition focus:border-zinc-700 focus:outline-none"
                    />
                </div>

                {/* Tabla */}
                <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
                    {visibleUsers.length === 0 ? (
                        <div className="py-12 text-center text-sm text-zinc-500">
                            No se encontraron usuarios con esa búsqueda.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-zinc-800/80 text-xs text-zinc-500 uppercase">
                                        <th className="px-5 py-3 font-semibold">
                                            Usuario
                                        </th>
                                        <th className="hidden px-5 py-3 font-semibold md:table-cell">
                                            Contacto
                                        </th>
                                        <th className="px-5 py-3 font-semibold">
                                            Roles
                                        </th>
                                        <th className="hidden px-5 py-3 font-semibold lg:table-cell">
                                            Citas
                                        </th>
                                        <th className="hidden px-5 py-3 font-semibold sm:table-cell">
                                            Alta
                                        </th>
                                        <th className="px-5 py-3 font-semibold">
                                            Cambiar rol
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/60">
                                    {visibleUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition-colors hover:bg-zinc-900/60"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700/50 bg-zinc-800/60 text-xs font-bold text-zinc-200">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="flex items-center gap-1.5 font-semibold text-white">
                                                            {user.name}
                                                            {user.emailVerified && (
                                                                <BadgeCheck className="size-3.5 text-emerald-400" />
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-zinc-500">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden px-5 py-4 text-xs text-zinc-400 md:table-cell">
                                                {user.phone || '—'}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {user.roles.length === 0 ? (
                                                        <span className="text-xs text-zinc-500">
                                                            Sin rol
                                                        </span>
                                                    ) : (
                                                        user.roles.map(
                                                            (role) => (
                                                                <span
                                                                    key={role}
                                                                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${roleChip[role] ?? roleChip.client}`}
                                                                >
                                                                    <ShieldCheck className="size-3" />
                                                                    {role}
                                                                </span>
                                                            ),
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                            <td className="hidden px-5 py-4 text-xs text-zinc-300 lg:table-cell">
                                                {user.appointmentCount}
                                            </td>
                                            <td className="hidden px-5 py-4 text-xs text-zinc-400 sm:table-cell">
                                                {user.createdAt}
                                            </td>
                                            <td className="px-5 py-4">
                                                <select
                                                    value={
                                                        user.roles.includes(
                                                            'admin',
                                                        )
                                                            ? 'admin'
                                                            : user.roles.includes(
                                                                    'barber',
                                                                )
                                                              ? 'barber'
                                                              : 'client'
                                                    }
                                                    onChange={(e) =>
                                                        changeRole(
                                                            user.id,
                                                            e.target.value,
                                                        )
                                                    }
                                                    disabled={
                                                        changingId === user.id
                                                    }
                                                    className="cursor-pointer rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 transition focus:border-zinc-700 focus:outline-none disabled:opacity-50"
                                                >
                                                    <option
                                                        value="client"
                                                        className="bg-zinc-900 text-white"
                                                    >
                                                        client
                                                    </option>
                                                    <option
                                                        value="barber"
                                                        className="bg-zinc-900 text-white"
                                                    >
                                                        barber
                                                    </option>
                                                    <option
                                                        value="admin"
                                                        className="bg-zinc-900 text-white"
                                                    >
                                                        admin
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Mail className="size-3.5" />
                    La verificación de email se muestra con el ícono verde.
                </p>
            </div>
        </>
    );
}
