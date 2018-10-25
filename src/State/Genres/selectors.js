export const isGenresFetchingSelector = state => state.genres && state.genres.isFetching;
export const getGenresList = state => state.genres && state.genres.list;
export const getGenresError = state => state.genres && state.genres.error;
