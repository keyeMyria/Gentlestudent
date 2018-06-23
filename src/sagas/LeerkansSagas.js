import { all, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
	LEERKANSEN_FETCH_LIST,
	LEERKANSEN_FETCH_LIST_SUCCES,
	LEERKANSEN_FETCH_LIST_FAILED,
	LEERKANSEN_FETCH_BY_ID_SUCCES,
	LEERKANSEN_FETCH_BY_ID_FAILED,
	LEERKANSEN_FETCH_BY_ID,
} from './../actions/leerkansActions';

function* leerkansenFetch(action) {
	try {
		const result = yield axios({
			method: 'get',
			url: 'https://gentlestudent-api.herokuapp.com/api/v1/leerkans'
			// url: 'http://localhost:8080/api/v1/leerkans'
		});
		yield put({ type: LEERKANSEN_FETCH_LIST_SUCCES, data: result.data });
	} catch (e) {
		yield put({ type: LEERKANSEN_FETCH_LIST_FAILED, message: e.message });
	}
}
function* leerkansenFetchById(action) {
	try {
		const id = action.id;
		const result = yield axios({
			method: 'get',
			// url: `https://gentlestudent-api.herokuapp.com/api/v1/leerkans/${id}`
			url: `http://localhost:8080/api/v1/leerkans/${id}`
		})
		yield put({ type: LEERKANSEN_FETCH_BY_ID_SUCCES, data: result.data });
	} catch (e) {
		yield put({ type: LEERKANSEN_FETCH_BY_ID_FAILED, message: e.message });
	}
}

function* leerkansSagas() {
	yield all([
		takeEvery(LEERKANSEN_FETCH_LIST, leerkansenFetch),
		takeEvery(LEERKANSEN_FETCH_BY_ID, leerkansenFetchById)
	]);
}

export default leerkansSagas;