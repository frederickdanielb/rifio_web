import { all, fork } from 'redux-saga/effects';
import { authSaga } from '../features/auth/sagas/authSaga';
import { rifasSaga } from '../features/rifas/sagas/rifasSaga';
import { ticketsSaga } from '../features/tickets/sagas/ticketsSaga';

export default function* rootSaga() {
  yield all([fork(authSaga), fork(rifasSaga), fork(ticketsSaga)]);
}
