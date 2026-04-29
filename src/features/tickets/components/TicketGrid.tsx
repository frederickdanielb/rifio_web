import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

interface TicketGridProps {
  onTicketClick: (numero: string) => void;
}

export function TicketGrid({ onTicketClick }: TicketGridProps) {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);

  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {tickets.map((ticket) => {
        const statusClass =
          ticket.estado === 'pagado'
            ? 'bg-emerald-500 text-white'
            : ticket.estado === 'reservado'
              ? 'bg-amber-500 text-white'
              : 'bg-slate-800 text-slate-300';

        return (
          <button
            key={ticket.numero}
            type="button"
            onClick={() => onTicketClick(ticket.numero)}
            className={`aspect-square rounded-md flex items-center justify-center font-mono text-sm transition-all hover:scale-105 ${statusClass}`}
          >
            {ticket.numero}
          </button>
        );
      })}
    </div>
  );
}
