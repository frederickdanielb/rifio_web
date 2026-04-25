import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  FetchAvailabilityRequestDto,
  ReserveTicketsRequestDto,
  TicketAvailabilityItem,
} from '../types/ticketsTypes';

interface TicketsState {
  availability: TicketAvailabilityItem[];
  selectedNumbers: number[];
  loadingAvailability: boolean;
  reserving: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  availability: [],
  selectedNumbers: [],
  loadingAvailability: false,
  reserving: false,
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
} = ticketsSlice.actions;

export default ticketsSlice.reducer;
