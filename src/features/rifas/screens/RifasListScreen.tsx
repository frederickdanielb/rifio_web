import { Link } from 'react-router-dom';
import { CanAccess } from '../../../shared/components/CanAccess';

export function RifasListScreen() {
  const rifas = [
    { id: '1', nombre: 'Rifa SUV 2026', precioTicket: '$10.000', estado: 'Activa' },
    { id: '2', nombre: 'Rifa Moto Urbana', precioTicket: '$5.000', estado: 'Activa' },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Gestion de Rifas</h1>
          <p className="mt-1 text-sm text-slate-300">Administra las rifas activas de la plataforma.</p>
        </div>
        <CanAccess permission="rifa:crear">
          <button
            type="button"
            className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
          >
            Crear Nueva Rifa
          </button>
        </CanAccess>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {rifas.map((rifa) => (
          <article key={rifa.id} className="rounded-2xl bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">{rifa.nombre}</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>
                <span className="text-slate-400">Precio del ticket:</span> {rifa.precioTicket}
              </p>
              <p>
                <span className="text-slate-400">Estado:</span>{' '}
                <span className="font-medium text-rose-400">{rifa.estado}</span>
              </p>
            </div>
            <Link
              to={`/rifas/${rifa.id}`}
              className="mt-6 rounded-2xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-800"
            >
              Administrar
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
