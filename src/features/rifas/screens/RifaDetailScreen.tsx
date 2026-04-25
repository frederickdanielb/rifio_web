import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { TicketGrid } from '../../tickets/components/TicketGrid';

export function RifaDetailScreen() {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/rifas"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <h1 className="text-2xl font-semibold text-white">Administrando Rifa #{id}</h1>
      </header>

      <div className="rounded-2xl bg-slate-900 p-5">
        <TicketGrid />
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-200">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-800" />
          Disponible
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-500" />
          Reservado
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
          Pagado
        </span>
      </div>
    </section>
  );
}
