import { all, spawn } from 'redux-saga/effects';
import leerkansSagas from './LeerkansSagas';

export default function* rootSaga() {
  yield all([
    spawn(leerkansSagas)
  ]);
}
