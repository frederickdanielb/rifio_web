import { Link } from 'react-router-dom';
import { Card } from '../../../shared/components/ui/card';

export function RifasDashboardScreen() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-50">Panel Principal</h2>
        <p className="text-sm text-slate-300">
          Administra rifas, monitorea ventas y ejecuta sorteos desde una vista unica.
        </p>
      </Card>
      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-50">Atajos</h2>
        <div className="flex gap-3 text-sm">
          <Link to="/rifas" className="rounded-2xl bg-rose-500 px-3 py-2 font-medium text-white">
            Ver Rifas
          </Link>
          <Link
            to="/tickets"
            className="rounded-2xl border border-slate-700 px-3 py-2 text-slate-200 hover:bg-slate-800"
          >
            Vender Tickets
          </Link>
        </div>
      </Card>
    </section>
  );
}
