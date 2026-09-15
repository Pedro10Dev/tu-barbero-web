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
import { PageHeader } from '@/components/page-header';
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
    photo_url: string | null;
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

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Barberos"
                    description="Equipo de barberos y perfiles de estación."
                    actions={
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                                <div className="flex size-10 items-center justify-center rounded-lg border border-success/25 bg-success/10 text-success">
                                    <UserCheck className="size-5" />
                                </div>
                                <div>
                                    <span className="block text-xs font-medium text-muted-foreground">
                                        Activos
                                    </span>
                                    <span className="tabular text-base font-bold text-foreground">
                                        {activeCount}{' '}
                                        <span className="text-xs font-normal text-muted-foreground">
                                            de {barbers.length}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/admin/barbers/create"
                                className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-brand-foreground shadow-sm transition hover:bg-brand/90"
                            >
                                <Plus className="size-4" />
                                Nuevo Barbero
                            </Link>
                        </div>
                    }
                />

                {/* Grid de barberos */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {barbers.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card py-12 text-center text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
                            Aún no hay barberos registrados.
                        </div>
                    ) : (
                        barbers.map((barber) => (
                            <div
                                key={barber.id}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/40"
                            >
                                <div
                                    className={`absolute top-0 bottom-0 left-0 w-1 ${barber.is_active ? 'bg-success' : 'bg-muted-foreground/40'}`}
                                />

                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted text-foreground">
                                        {barber.photo_url ? (
                                            <img
                                                src={barber.photo_url}
                                                alt={barber.display_name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <Scissors className="size-5" />
                                        )}
                                    </div>
                                    <span
                                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${barber.is_active ? 'border-success/25 bg-success/10 text-success' : 'border-border bg-muted text-muted-foreground'}`}
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
                                        <span className="tabular text-lg font-bold text-foreground">
                                            {barber.appointmentCount}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                            Completadas (Mes)
                                        </span>
                                        <span className="tabular text-lg font-bold text-foreground">
                                            {barber.monthlyCompleted}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                                    <Link
                                        href={`/admin/barbers/${barber.id}/edit`}
                                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-accent"
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
                                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/20"
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
                        <DialogTitle className="flex items-center gap-2 text-destructive">
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

                    <div className="flex items-start gap-3 rounded-lg border border-success/25 bg-success/10 p-3 text-xs text-success">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                        El historial de cortes y citas se conservará en el panel
                        administrativo.
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Esta acción no se puede deshacer.
                    </p>

                    <DialogFooter>
                        <button
                            onClick={() => setBarberToDelete(null)}
                            className="rounded-lg border border-border bg-muted px-4 py-2.5 text-xs font-semibold text-foreground transition hover:bg-accent"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmDestroy}
                            className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-destructive/90"
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
