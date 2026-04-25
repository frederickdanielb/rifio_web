import { call, put, takeLatest } from 'redux-saga/effects';
import axiosClient from '../../../core/api/axiosClient';
import { getApiErrorMessage } from '../../../core/api/getApiErrorMessage';
import type { ApiResponse } from '../../../core/types';
import type { Rifa } from '../types/rifasTypes';
import { fetchRifasFailure, fetchRifasRequest, fetchRifasSuccess } from '../store/rifasSlice';

function* handleFetchRifas() {
  try {
    const response: { data: ApiResponse<Rifa[]> } = yield call(axiosClient.get, '/rifas');
    yield put(fetchRifasSuccess(response.data.data));
  } catch (error: unknown) {
    yield put(fetchRifasFailure(getApiErrorMessage(error)));
  }
}

export function* rifasSaga() {
  yield takeLatest(fetchRifasRequest.type, handleFetchRifas);
}
