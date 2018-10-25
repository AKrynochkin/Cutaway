import * as api from 'Api';
import apiMethodsKeys from 'Constants/apiMethodsKeys.js';

import * as constants from './constants';
import * as selectors from './selectors';

const searchSuccess = (payload) => (dispatch) => {
  dispatch({
    type: constants.SEARCH_SUCCESS,
    payload: {
      results: payload.results,
      currentPage: payload.currentPage,
      totalPages: payload.totalPages,
      totalCount: payload.totalCount
    }
  });
};

const nextPageSuccess = (payload) => (dispatch) => {
  dispatch({
    type: constants.SEARCH_NEXT_PAGE,
    payload: {
      results: payload.results,
      currentPage: payload.currentPage,
      totalPages: payload.totalPages
    }
  });
};

const searchError = (error) => (dispatch) => {
  dispatch({
    type: constants.SEARCH_FAILURE,
    payload: error
  });
};

export const searchFilmsByTitle = (query) => (dispatch) => {
  if (!query || !query.trim()) {
    dispatch(searchSuccess(constants.defaultPayload));
    return;
  }

  dispatch(clearSearch());

  dispatch({
    type: constants.SEARCH_FETCHING,
    payload: {
      requestParams: {
        query
      },
      methodName: apiMethodsKeys.searchFilmsByTitle
    }
  });

  api.searchFilmsByTitle({ query })
    .then(res => dispatch(searchSuccess(res)),
      error => dispatch(searchError(error))
    );
};

export const searchFilmsByDirector = ({ query, ids }) => dispatch => {
  if ((!query || !query.trim()) && (!ids || !ids.length)) {
    dispatch(searchSuccess(constants.defaultPayload));
    return;
  }

  dispatch(clearSearch());

  dispatch({
    type: constants.SEARCH_FETCHING,
    payload: {
      requestParams: {
        query,
        ids
      },
      methodName: apiMethodsKeys.searchFilmsByDirector
    }
  });

  api.searchFilmsByDirector({ query, ids })
    .then(res => dispatch(searchSuccess(res)),
      error => dispatch(searchError(error))
    );
};

export const clearSearch = () => dispatch => {
  dispatch({
    type: constants.SEARCH_CLEAR
  });
};

export const getNextPage = () => (dispatch, getState) => {
  const { currentPage, totalPages, requestParams, methodName, isFetching } = selectors.getSearchState(getState());

  if (!currentPage || !totalPages || !requestParams || !methodName) {
    dispatch(searchSuccess(constants.defaultPayload));
  }

  if (currentPage === totalPages || isFetching) {
    return;
  }

  dispatch({
    type: constants.SEARCH_FETCHING,
    payload: {
      requestParams,
      methodName
    }
  });

  api[methodName]({ ...requestParams, startPage: currentPage + 1 })
    .then(res => dispatch(nextPageSuccess(res)),
      error => dispatch(searchError(error))
    );
};

export const setSortType = (sortType) => dispatch => {
  dispatch({
    type: constants.SEARCH_SET_SORT_TYPE,
    payload: {
      sortType
    }
  });
};
