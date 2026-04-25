import { useEffect } from 'react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Button } from '../../../shared/components/ui/button';
import { Card } from '../../../shared/components/ui/card';
import { Input } from '../../../shared/components/ui/input';
import { Label } from '../../../shared/components/ui/label';
import { TicketsGrid } from '../components/TicketsGrid';
import {
  fetchAvailabilityRequest,
  reserveTicketsRequest,
  toggleTicketSelection,
} from '../store/ticketsSlice';

const defaultRifaId = 'default-rifa-id';

export function TicketsScreen() {
  const dispatch = useAppDispatch();
  const { availability, selectedNumbers, loadingAvailability, reserving, error } = useAppSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    dispatch(fetchAvailabilityRequest({ rifaId: defaultRifaId }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleReserve = () => {
    if (selectedNumbers.length === 0) {
      toast.warning('Selecciona al menos un numero para reservar.');
      return;
    }

    dispatch(
      reserveTicketsRequest({
        rifaId: defaultRifaId,
        numbers: selectedNumbers,
      })
    );
    toast.success('Solicitud de reserva enviada');
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-50">Venta de Tickets</h1>
        <p className="text-sm text-slate-400">Selecciona numeros disponibles y registra la venta.</p>
      </header>
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[220px,1fr]">
          <div className="space-y-2">
            <Label htmlFor="rifa">Rifa</Label>
            <Input id="rifa" value={defaultRifaId} readOnly />
          </div>
          <div className="flex items-end justify-between gap-4">
            <p className="text-sm text-slate-300">Seleccionados: {selectedNumbers.length}</p>
            <Button
              onClick={handleReserve}
              disabled={selectedNumbers.length === 0 || reserving || loadingAvailability}
            >
              {reserving ? 'Procesando...' : 'Reservar'}
            </Button>
          </div>
        </div>
        {loadingAvailability ? (
          <p className="text-sm text-slate-300">Cargando disponibilidad...</p>
        ) : (
          <TicketsGrid
            items={availability}
            selectedNumbers={selectedNumbers}
            onToggle={(number) => dispatch(toggleTicketSelection(number))}
          />
        )}
      </Card>
    </section>
  );
}
