import { cn } from '../../../shared/lib/utils';
import type { TicketAvailabilityItem } from '../types/ticketsTypes';

interface TicketsGridProps {
  items: TicketAvailabilityItem[];
  selectedNumbers: number[];
  onToggle: (number: number) => void;
}

export function TicketsGrid({ items, selectedNumbers, onToggle }: TicketsGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-10">
      {items.map((item) => {
        const selected = selectedNumbers.includes(item.number);
        return (
          <button
            key={item.number}
            type="button"
            disabled={!item.isAvailable}
            onClick={() => onToggle(item.number)}
            className={cn(
              'h-10 rounded-2xl border text-sm font-semibold transition-colors',
              !item.isAvailable && 'cursor-not-allowed border-slate-800 bg-slate-900 text-slate-600',
              item.isAvailable && !selected && 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800',
              selected && 'border-rose-400 bg-rose-500 text-white'
            )}
          >
            {item.number.toString().padStart(2, '0')}
          </button>
        );
      })}
    </div>
  );
}
