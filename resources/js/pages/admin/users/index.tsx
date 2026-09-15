import { Head, router } from '@inertiajs/react';
import { Users, Search, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '@/components/page-header';

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
    client: 'border-border bg-muted text-foreground',
    barber: 'border-info/25 bg-info/10 text-info',
    admin: 'border-brand/30 bg-brand/10 text-brand',
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

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Usuarios"
                    description="Todos los usuarios del sistema y sus roles."
                    actions={
                        <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                            <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-brand">
                                <Users className="size-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Total
                                </span>
                                <span className="tabular text-base font-bold text-foreground">
                                    {users.length}
                                </span>
                            </div>
                        </div>
                    }
                />

                {/* Búsqueda */}
                <div className="relative flex w-full items-center">
                    <Search className="absolute left-3.5 size-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre, email o teléfono..."
                        className="w-full rounded-lg border border-border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none"
                    />
                </div>

                {/* Tabla */}
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                    {visibleUsers.length === 0 ? (
                        <div className="py-12 text-center text-sm text-muted-foreground">
                            No se encontraron usuarios con esa búsqueda.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-border text-xs text-muted-foreground uppercase">
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
                                <tbody className="divide-y divide-border/60">
                                    {visibleUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="transition-colors hover:bg-accent/60"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-xs font-bold text-foreground">
                                                        {user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="flex items-center gap-1.5 font-semibold text-foreground">
                                                            {user.name}
                                                            {user.emailVerified && (
                                                                <BadgeCheck className="size-3.5 text-success" />
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden px-5 py-4 text-xs text-muted-foreground md:table-cell">
                                                {user.phone || '—'}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {user.roles.length === 0 ? (
                                                        <span className="text-xs text-muted-foreground">
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
                                            <td className="hidden px-5 py-4 text-xs text-foreground lg:table-cell">
                                                {user.appointmentCount}
                                            </td>
                                            <td className="hidden px-5 py-4 text-xs text-muted-foreground sm:table-cell">
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
                                                    className="cursor-pointer rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground transition focus:border-ring focus:outline-none disabled:opacity-50"
                                                >
                                                    <option
                                                        value="client"
                                                        className="bg-muted text-foreground"
                                                    >
                                                        client
                                                    </option>
                                                    <option
                                                        value="barber"
                                                        className="bg-muted text-foreground"
                                                    >
                                                        barber
                                                    </option>
                                                    <option
                                                        value="admin"
                                                        className="bg-muted text-foreground"
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

                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <BadgeCheck className="size-3.5 text-success" />
                    La verificación de email se marca con el ícono verde.
                </p>
            </div>
        </>
    );
}
