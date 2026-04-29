import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  FetchAvailabilityRequestDto,
  ReserveTicketsRequestDto,
  TicketAvailabilityItem,
} from '../types/ticketsTypes';

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

interface TicketsState {
  availability: TicketAvailabilityItem[];
  selectedNumbers: number[];
  loadingAvailability: boolean;
  reserving: boolean;
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const paidDefaults = new Set<string>(['04', '25', '66', '90']);

const initialState: TicketsState = {
  availability: [],
  selectedNumbers: [],
  loadingAvailability: false,
  reserving: false,
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

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    fetchAvailabilityRequest: (state, _action: PayloadAction<FetchAvailabilityRequestDto>) => {
      state.loadingAvailability = true;
      state.error = null;
    },
    fetchAvailabilitySuccess: (state, action: PayloadAction<TicketAvailabilityItem[]>) => {
      state.loadingAvailability = false;
      state.availability = action.payload;
      state.selectedNumbers = [];
    },
    fetchAvailabilityFailure: (state, action: PayloadAction<string>) => {
      state.loadingAvailability = false;
      state.error = action.payload;
    },
    toggleTicketSelection: (state, action: PayloadAction<number>) => {
      const value = action.payload;
      const index = state.selectedNumbers.indexOf(value);
      if (index >= 0) {
        state.selectedNumbers.splice(index, 1);
      } else {
        state.selectedNumbers.push(value);
      }
    },
    reserveTicketsRequest: (state, _action: PayloadAction<ReserveTicketsRequestDto>) => {
      state.reserving = true;
      state.error = null;
    },
    reserveTicketsSuccess: (state) => {
      state.reserving = false;
      state.selectedNumbers = [];
    },
    reserveTicketsFailure: (state, action: PayloadAction<string>) => {
      state.reserving = false;
      state.error = action.payload;
    },
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

export const {
  fetchAvailabilityRequest,
  fetchAvailabilitySuccess,
  fetchAvailabilityFailure,
  toggleTicketSelection,
  reserveTicketsRequest,
  reserveTicketsSuccess,
  reserveTicketsFailure,
  reserveTicketRequest,
  reserveTicketSuccess,
  reserveTicketFailure,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
