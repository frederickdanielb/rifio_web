const reservedNumbers = new Set<number>([12, 37, 58, 73]);
const paidNumbers = new Set<number>([4, 25, 66, 90]);

export function TicketGrid() {
  const tickets = Array.from({ length: 100 }, (_, index) => index);

  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
      {tickets.map((ticket) => {
        const isReserved = reservedNumbers.has(ticket);
        const isPaid = paidNumbers.has(ticket);

        const statusClass = isPaid
          ? 'bg-emerald-500 text-white'
          : isReserved
            ? 'bg-amber-500 text-white'
            : 'bg-slate-800 text-slate-300';

        return (
          <button
            key={ticket}
            type="button"
            className={`aspect-square rounded-md flex items-center justify-center font-mono text-sm transition-all hover:scale-105 ${statusClass}`}
          >
            {ticket.toString().padStart(2, '0')}
          </button>
        );
      })}
    </div>
  );
}
