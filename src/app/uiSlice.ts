import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isUpgradeModalOpen: boolean;
  upgradeModalMessage: string;
}

const initialState: UiState = {
  isUpgradeModalOpen: false,
  upgradeModalMessage: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openUpgradeModal: (state, action: PayloadAction<string>) => {
      state.isUpgradeModalOpen = true;
      state.upgradeModalMessage = action.payload;
    },
    closeUpgradeModal: (state) => {
      state.isUpgradeModalOpen = false;
      state.upgradeModalMessage = '';
    },
  },
});

export const { openUpgradeModal, closeUpgradeModal } = uiSlice.actions;
export default uiSlice.reducer;
