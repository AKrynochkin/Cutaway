import { createReducer } from 'Utils/reducer';
import * as constants from './constants';

const initialState = {
  list: [],
  isFetching: false
};

const actionHandlers = {
  [constants.GENRES_FETCHING]: (state) => ({ ...state, isFetching: true }),
  [constants.GENRES_SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload.genres,
    isFetching: false,
  }),
  [constants.GENRES_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false
  }),
};

export default createReducer(initialState, actionHandlers);
