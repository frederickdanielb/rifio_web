import { type FormEvent, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import type { AppDispatch } from '../../../app/store';
import { TicketGrid } from '../../tickets/components/TicketGrid';
import { Modal } from '../../../shared/components/ui/Modal';
import { reserveTicketRequest } from '../../tickets/store/ticketSlice';

export function RifaDetailScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNombre('');
    setTelefono('');
  };

  const handleReserveTicket = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTicket) {
      return;
    }

    dispatch(
      reserveTicketRequest({
        numero: selectedTicket,
        comprador: {
          nombre,
          telefono,
        },
      })
    );

    handleCloseModal();
  };

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
        <TicketGrid
          onTicketClick={(num) => {
            setSelectedTicket(num);
            setIsModalOpen(true);
          }}
        />
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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Reservar Ticket #${selectedTicket ?? '--'}`}
      >
        <form className="space-y-4" onSubmit={handleReserveTicket}>
          <div className="space-y-2">
            <label htmlFor="nombre" className="text-sm font-medium text-slate-200">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              required
              className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-rose-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="telefono" className="text-sm font-medium text-slate-200">
              Telefono
            </label>
            <input
              id="telefono"
              type="tel"
              placeholder="+56 9 1234 5678"
              value={telefono}
              onChange={(event) => setTelefono(event.target.value)}
              required
              className="h-10 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-rose-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-400"
          >
            Confirmar Reserva
          </button>
        </form>
      </Modal>
    </section>
  );
}
