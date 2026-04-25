import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TicketStatus = 'disponible' | 'reservado' | 'pagado';

export interface TicketBuyer {
  nombre: string;
  telefono: string;
}

export interface Ticket {
  numero: string;
  estado: TicketStatus;
  comprador?: TicketBuyer;
}

export interface ReserveTicketPayload {
  numero: string;
  comprador: TicketBuyer;
}

interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const paidDefaults = new Set<string>(['04', '25', '66', '90']);

const initialState: TicketState = {
  tickets: Array.from({ length: 100 }, (_, index): Ticket => {
    const numero = index.toString().padStart(2, '0');
    return {
      numero,
      estado: paidDefaults.has(numero) ? 'pagado' : 'disponible',
    };
  }),
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reserveTicketRequest: (state, _action: PayloadAction<ReserveTicketPayload>) => {
      state.loading = true;
      state.error = null;
    },
    reserveTicketSuccess: (state, action: PayloadAction<Ticket>) => {
      const ticket = state.tickets.find((item) => item.numero === action.payload.numero);
      if (!ticket || ticket.estado === 'pagado') {
        state.loading = false;
        return;
      }
      ticket.estado = 'reservado';
      ticket.comprador = action.payload.comprador;
      state.loading = false;
    },
    reserveTicketFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { reserveTicketRequest, reserveTicketSuccess, reserveTicketFailure } =
  ticketSlice.actions;
export default ticketSlice.reducer;
