import apiMethods from './apiMethodsKeys';

const baseRoute = 'https://api.themoviedb.org/3';

const routes = {
  [apiMethods.searchPerson]: {
    url: `${baseRoute}/search/person`,
    queryName: 'query'
  },
  [apiMethods.searchFilmsByCrew]: {
    url: `${baseRoute}/discover/movie`,
    queryName: 'with_crew'
  },
  [apiMethods.searchFilmsByDirector]: {
    url: `${baseRoute}/person`,
    preQuery: '/movie_credits'
  },
  [apiMethods.searchFilmsByTitle]: {
    url: `${baseRoute}/search/movie`,
    queryName: 'query'
  },
  [apiMethods.getFilmsGenres]: {
    url: `${baseRoute}/genre/movie/list`
  },
  [apiMethods.getFilmCrew]: {
    url: `${baseRoute}/movie`,
    preQuery: '/credits'
  },
  [apiMethods.getFilmDetails]: {
    url: `${baseRoute}/movie`
  },
};

export default routes;
