import { type PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { reserveTicketApi } from '../api/ticketApi';
import {
  reserveTicketFailure,
  reserveTicketRequest,
  reserveTicketSuccess,
  type ReserveTicketPayload,
  type Ticket,
} from './ticketSlice';

function* handleReserveTicket(action: PayloadAction<ReserveTicketPayload>) {
  try {
    const updatedTicket: Ticket = yield call(reserveTicketApi, action.payload);
    yield put(reserveTicketSuccess(updatedTicket));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'No fue posible reservar el ticket.';
    yield put(reserveTicketFailure(message));
  }
}

export function* watchTicketSagas() {
  yield takeLatest(reserveTicketRequest.type, handleReserveTicket);
}
