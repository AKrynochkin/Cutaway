import * as api from 'Api';

import * as constants from './constants';
import * as selectors from './selectors';

const filmRequestSuccess = (payload) => (dispatch) => {
  dispatch({
    type: constants.FILM_REQUEST_SUCCESS,
    payload
  });
};

const filmRequestError = (error) => (dispatch) => {
  dispatch({
    type: constants.FILM_REQUEST_FAILURE,
    payload: error
  });
};

export const getFilm = ({ title, id }) => async (dispatch) => {
  dispatch({
    type: constants.FILM_REQUEST_FETCHING
  });

  let filmId = id;

  if (!id) {
    const film = await api.searchFilmsByTitle({ query: title })
      .then(res => res && res.results[0]);

    if (!film) {
      dispatch(filmRequestSuccess(null));
      return;
    }

    filmId = film.id;

    dispatch(setFilmId(filmId));
  }

  const credits = await api.getFilmCredits(filmId)
    .then(
      res => res.data,
      error => {
        dispatch(filmRequestError(error));
      }
    );

  const details = await api.getFilmDetails(filmId)
    .then(
      res => res.data,
      error => {
        dispatch(filmRequestError(error));
      }
    );

  if (!details) {
    dispatch(filmRequestSuccess(null));
    return;
  }

  dispatch(filmRequestSuccess({ ...details, credits }));
};

export const clearFilmDetails = () => dispatch => {
  dispatch({ type: constants.FILM_CLEAR });
};

export const setFilmId = (id) => (dispatch, state) => {
  const selectedId = selectors.getFilmId(state);

  if (selectedId !== id) {
    dispatch({
      type: constants.FILM_SET_ID,
      payload: id
    });
  }
};
