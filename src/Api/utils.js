import apiRoutes from 'Constants/apiRoutes';
import apiKey from 'Constants/apiKey';

export const buildUrl = ({ method, query, parametr, language = 'en-US', page }) => {
  const routeConf = apiRoutes[method];

  // eslint-disable-next-line max-len
  return `${routeConf.url}${parametr ? `/${parametr}` : ''}${routeConf.preQuery ? routeConf.preQuery : ''}?api_key=${apiKey}&language=${language}${page ? `&page=${page}` : ''}${query && routeConf.queryName ? `&${routeConf.queryName}=${query}` : ''}`;
};
