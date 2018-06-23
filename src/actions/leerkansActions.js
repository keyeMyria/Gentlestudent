export const LEERKANSEN_FETCH_LIST = 'gentlestudent/LEERKANSEN_FETCH_LIST';
export const LEERKANSEN_FETCH_LIST_SUCCES = 'gentlestudent/LEERKANSEN_FETCH_LIST_SUCCESS';
export const LEERKANSEN_FETCH_LIST_FAILED = 'gentlestudent/LEERKANSEN_FETCH_LIST_FAILED';
export const LEERKANSEN_FETCH_BY_ID = 'gentlestudent/LEERKANSEN_FETCH_BY_ID';
export const LEERKANSEN_FETCH_BY_ID_SUCCES = 'gentlestudent/LEERKANSEN_FETCH_BY_ID_SUCCES';
export const LEERKANSEN_FETCH_BY_ID_FAILED = 'gentlestudent/LEERKANSEN_FETCH_BY_ID_FAILED';

export function LeerkansenFetch() {
	return {
		type: LEERKANSEN_FETCH_LIST
	}
}

export function LeerkansenFetchById(id) {
  return {
    type: LEERKANSEN_FETCH_BY_ID,
    id
  };
}
