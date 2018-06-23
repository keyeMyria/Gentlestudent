import {
	LEERKANSEN_FETCH_LIST,
	LEERKANSEN_FETCH_LIST_SUCCES,
	LEERKANSEN_FETCH_LIST_FAILED,
	LEERKANSEN_FETCH_BY_ID,
	LEERKANSEN_FETCH_BY_ID_SUCCES,
	LEERKANSEN_FETCH_BY_ID_FAILED
} from '../actions/leerkansActions';

const initialState = {
	items: [],
	item: {},
	loading: false
}

export function leerkansReducer(state = initialState, action) {
	switch(action.type) {
		case LEERKANSEN_FETCH_LIST:
			return {
				...state,
				loading: true
			}
		case LEERKANSEN_FETCH_LIST_SUCCES:
			return {
				...state,
				items: action.data,
				loading: false
			};
		case LEERKANSEN_FETCH_LIST_FAILED:
			return {
				...state,
				loading: false
			};
		case LEERKANSEN_FETCH_BY_ID:
			return {
				...state,
				loading: true
			}
		case LEERKANSEN_FETCH_BY_ID_SUCCES:
			return {
				...state,
				item: action.data,
				loading: false
			};
		case LEERKANSEN_FETCH_BY_ID_FAILED:
			return {
				...state,
				loading: false
			};
		default:
			return state
	}
}