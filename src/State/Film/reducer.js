import { createReducer } from 'Utils/reducer';
import * as constants from './constants';

const initialState = {
  isFetching: false
};

const actionHandlers = {
  [constants.FILM_REQUEST_FETCHING]: (state) => ({ ...state, isFetching: true }),
  [constants.FILM_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    details: action.payload,
    isFetching: false,
  }),
  [constants.FILM_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false
  }),
  [constants.FILM_CLEAR]: () => (initialState),
  [constants.FILM_SET_ID]: (state, action) => ({
    ...state,
    selectedId: action.payload
  })
};

export default createReducer(initialState, actionHandlers);
