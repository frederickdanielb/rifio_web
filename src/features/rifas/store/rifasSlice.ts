import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Rifa } from '../types/rifasTypes';

interface RifasState {
  items: Rifa[];
  loading: boolean;
  error: string | null;
}

const initialState: RifasState = {
  items: [],
  loading: false,
  error: null,
};

const rifasSlice = createSlice({
  name: 'rifas',
  initialState,
  reducers: {
    fetchRifasRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRifasSuccess: (state, action: PayloadAction<Rifa[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchRifasFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchRifasRequest, fetchRifasSuccess, fetchRifasFailure } = rifasSlice.actions;
export default rifasSlice.reducer;
