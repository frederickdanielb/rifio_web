import { CalendarDays, Ticket } from 'lucide-react';
import { Card } from '../../../shared/components/ui/card';
import type { Rifa } from '../types/rifasTypes';

interface RifaCardProps {
  rifa: Rifa;
}

export function RifaCard({ rifa }: RifaCardProps) {
  const soldPercentage = Math.round((rifa.soldNumbers / rifa.totalNumbers) * 100);

  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">{rifa.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{rifa.description}</p>
        </div>
        <span className="rounded-2xl border border-rose-500/30 bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-300">
          {rifa.status}
        </span>
      </div>
      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Ticket className="h-4 w-4 text-rose-400" />
          <span>Premio: {rifa.prize}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-rose-400" />
          <span>Sorteo: {new Date(rifa.drawDate).toLocaleDateString('es-CL')}</span>
        </div>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>Vendidos</span>
          <span>{soldPercentage}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-800">
          <div className="h-2 rounded-full bg-rose-500" style={{ width: `${soldPercentage}%` }} />
        </div>
      </div>
    </Card>
  );
}
