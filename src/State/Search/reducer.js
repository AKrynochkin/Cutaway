import sortTypes from 'Constants/sortTypes';
import { createReducer } from 'Utils/reducer';
import * as constants from './constants';

const initialState = {
  results: [],
  totalPages: 0,
  currentPage: 0,
  totalCount: 0,
  sortDirection: 1,
  sortType: sortTypes.DATE,
  isFetching: false
};

const actionHandlers = {
  [constants.SEARCH_FETCHING]: (state, { payload }) => {
    return {
      ...state,
      requestParams: payload.requestParams,
      methodName: payload.methodName,
      isFetching: true
    };
  },
  [constants.SEARCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    results: payload.results,
    currentPage: payload.currentPage,
    totalPages: payload.totalPages,
    totalCount: payload.totalCount,
    isFetching: false,
  }),
  [constants.SEARCH_NEXT_PAGE]: (state, { payload }) => {
    const ids = {};
    const results = [
      ...state.results,
      ...payload.results
    ].filter(f => {
      const isUnique = !ids[f.id];

      ids[f.id] = true;

      return isUnique;
    });

    return {
      ...state,
      results,
      currentPage: payload.currentPage,
      totalPages: payload.totalPages,
      isFetching: false
    };
  },
  [constants.SEARCH_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
    isFetching: false
  }),
  [constants.SEARCH_SET_SORT_TYPE]: (state, { payload: { sortType } }) => {
    const sortDirection = sortType === state.sortType && state.sortDirection === 1 ? -1 : 1;

    return {
      ...state,
      sortType,
      sortDirection
    };
  },
  [constants.SEARCH_CLEAR]: () => (initialState)
};

export default createReducer(initialState, actionHandlers);
