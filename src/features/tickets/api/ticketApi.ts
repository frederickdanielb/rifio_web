import type { Ticket, TicketBuyer } from '../store/ticketSlice';

export interface ReserveTicketApiPayload {
  numero: string;
  comprador: TicketBuyer;
}

export async function reserveTicketApi(payload: ReserveTicketApiPayload): Promise<Ticket> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });

  return {
    numero: payload.numero,
    estado: 'reservado',
    comprador: payload.comprador,
  };
}
