import axios from 'axios';

import { buildUrl } from './utils';
import apiMethodsKeys from 'Constants/apiMethodsKeys';

export const getFilmCredits = async (id) => {
  const filmUrl = buildUrl({ method: apiMethodsKeys.getFilmCrew, parametr: id });

  return axios.get(filmUrl);
};

export const getFilmDetails = async (id) => {
  const filmUrl = buildUrl({ method: apiMethodsKeys.getFilmDetails, parametr: id });

  return axios.get(filmUrl);
};
