import { type PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import axiosClient from '../../../core/api/axiosClient';
import { getApiErrorMessage } from '../../../core/api/getApiErrorMessage';
import type { ApiResponse } from '../../../core/types';
import type {
  FetchAvailabilityRequestDto,
  ReserveTicketsRequestDto,
  TicketAvailabilityItem,
} from '../types/ticketsTypes';
import {
  fetchAvailabilityFailure,
  fetchAvailabilityRequest,
  fetchAvailabilitySuccess,
  reserveTicketsFailure,
  reserveTicketsRequest,
  reserveTicketsSuccess,
} from '../store/ticketsSlice';

function* handleFetchAvailability(action: PayloadAction<FetchAvailabilityRequestDto>) {
  try {
    const response: { data: ApiResponse<TicketAvailabilityItem[]> } = yield call(axiosClient.get, '/tickets', {
      params: { rifaId: action.payload.rifaId },
    });
    yield put(fetchAvailabilitySuccess(response.data.data));
  } catch (error: unknown) {
    yield put(fetchAvailabilityFailure(getApiErrorMessage(error)));
  }
}

function* handleReserveTickets(action: PayloadAction<ReserveTicketsRequestDto>) {
  try {
    yield call(axiosClient.post, '/tickets', action.payload);
    yield put(reserveTicketsSuccess());
    yield put(fetchAvailabilityRequest({ rifaId: action.payload.rifaId }));
  } catch (error: unknown) {
    yield put(reserveTicketsFailure(getApiErrorMessage(error)));
  }
}

export function* ticketsSaga() {
  yield takeLatest(fetchAvailabilityRequest.type, handleFetchAvailability);
  yield takeLatest(reserveTicketsRequest.type, handleReserveTickets);
}
