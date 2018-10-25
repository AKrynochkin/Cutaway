import axios from 'axios';

import { buildUrl } from './utils';
import apiMethodsKeys from 'Constants/apiMethodsKeys';

export const getFilmsGenres = async () => {
  const genresUrl = buildUrl({ method: apiMethodsKeys.getFilmsGenres });

  return axios.get(genresUrl);
};
