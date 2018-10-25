import * as api from 'Api';

import * as constants from './constants';

const genresSuccess = (payload) => (dispatch) => {
  dispatch({
    type: constants.GENRES_SUCCESS,
    payload
  });
};

const genresError = (error) => (dispatch) => {
  dispatch({
    type: constants.GENRES_FAILURE,
    payload: error
  });
};

export const getFilmsGenres = () => dispatch => {
  dispatch({
    type: constants.GENRES_FETCHING
  });
  api.getFilmsGenres()
    .then(res => dispatch(genresSuccess(res.data)),
      error => dispatch(genresError(error))
    );
};
