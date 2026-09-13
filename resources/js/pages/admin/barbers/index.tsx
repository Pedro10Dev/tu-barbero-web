import { Head, Link, router } from '@inertiajs/react';
import {
    Scissors,
    Plus,
    UserCheck,
    Trash2,
    Pencil,
    Phone,
    AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type Barber = {
    id: number;
    display_name: string;
    bio: string | null;
    is_active: boolean;
    email: string;
    phone: string | null;
    appointmentCount: number;
    monthlyCompleted: number;
};

type BarberToDelete = {
    id: number;
    display_name: string;
} | null;

export default function AdminBarbers({ barbers }: { barbers: Barber[] }) {
    const [barberToDelete, setBarberToDelete] = useState<BarberToDelete>(null);

    const activeCount = barbers.filter((b) => b.is_active).length;

    const confirmDestroy = () => {
        if (barberToDelete === null) {
            return;
        }

        router.delete(`/admin/barbers/${barberToDelete.id}`, {
            preserveScroll: true,
        });
        setBarberToDelete(null);
    };

    return (
        <>
            <Head title="Barberos" />

            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 lg:p-8">
                {/* Cabecera */}
                <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <h1 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-foreground">
                            <Scissors className="size-6 text-muted-foreground" />
                            Barberos
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Equipo de barberos y perfiles de estación.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                            <div className="flex size-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                                <UserCheck className="size-5" />
                            </div>
                            <div>
                                <span className="block text-xs font-medium text-muted-foreground">
                                    Activos
                                </span>
                                <span className="text-base font-bold text-foreground">
                                    {activeCount}{' '}
                                    <span className="text-xs font-normal text-muted-foreground">
                                        de {barbers.length}
                                    </span>
                                </span>
                            </div>
                        </div>

                        <Link
                            href="/admin/barbers/create"
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                        >
                            <Plus className="size-4" />
                            Nuevo Barbero
                        </Link>
                    </div>
                </div>

                {/* Grid de barberos */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {barbers.length === 0 ? (
                        <div className="rounded-2xl border border-border bg-card py-12 text-center text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
                            Aún no hay barberos registrados.
                        </div>
                    ) : (
                        barbers.map((barber) => (
                            <div
                                key={barber.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/40"
                            >
                                <div
                                    className={`absolute top-0 bottom-0 left-0 w-1.5 ${barber.is_active ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-zinc-600'}`}
                                />

                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-foreground">
                                        <Scissors className="size-5" />
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${barber.is_active ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-border bg-muted text-muted-foreground'}`}
                                    >
                                        {barber.is_active
                                            ? 'Activo'
                                            : 'Inactivo'}
                                    </span>
                                </div>

                                <div className="mt-4 space-y-1">
                                    <h3 className="text-base font-semibold text-foreground">
                                        {barber.display_name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        {barber.email}
                                    </p>
                                    {barber.phone && (
                                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Phone className="size-3.5 text-muted-foreground" />
                                            {barber.phone}
                                        </p>
                                    )}
                                </div>

                                <p className="mt-3 line-clamp-2 text-xs text-muted-foreground italic">
                                    {barber.bio || 'Sin descripción.'}
                                </p>

                                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                                    <div>
                                        <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                            Citas
                                        </span>
                                        <span className="text-lg font-bold text-foreground">
                                            {barber.appointmentCount}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                            Completadas (Mes)
                                        </span>
                                        <span className="text-lg font-bold text-foreground">
                                            {barber.monthlyCompleted}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                                    <Link
                                        href={`/admin/barbers/${barber.id}/edit`}
                                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent hover:text-foreground"
                                    >
                                        <Pencil className="size-3.5" />
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() =>
                                            setBarberToDelete({
                                                id: barber.id,
                                                display_name:
                                                    barber.display_name,
                                            })
                                        }
                                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20"
                                    >
                                        <Trash2 className="size-3.5" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <Dialog
                open={barberToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setBarberToDelete(null);
                    }
                }}
            >
                <DialogContent className="border-border bg-muted text-foreground sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-rose-400">
                            <AlertTriangle className="size-5" />
                            Eliminar barbero
                        </DialogTitle>
                        <DialogDescription>
                            Se eliminará el usuario de{' '}
                            <strong className="text-foreground">
                                {barberToDelete?.display_name}
                            </strong>{' '}
                            y su perfil; ya no podrá iniciar sesión en la
                            plataforma.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-200">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                        El historial de cortes y citas se conservará en el panel
                        administrativo.
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Esta acción no se puede deshacer.
                    </p>

                    <DialogFooter>
                        <button
                            onClick={() => setBarberToDelete(null)}
                            className="rounded-xl border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-accent hover:text-foreground"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmDestroy}
                            className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-500"
                        >
                            <Trash2 className="size-4" />
                            Eliminar barbero
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
