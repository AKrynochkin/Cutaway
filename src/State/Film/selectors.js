export const isFilmRequestFetchingSelector = state => state.film && state.film.isFetching;
export const getFilmDetails = state => state.film && state.film.details;
export const getFilmId = state => state.film && state.film.selectedId;
export const getFilmDetailsError = state => state.film && state.film.error;
