import axios from 'axios';

import { buildUrl } from './utils';
import apiMethodsKeys from 'Constants/apiMethodsKeys';

export const searchFilmsByDirector = async ({ query, ids }) => {
  let persons = ids || [];

  if (!ids) {
    const personUrl = buildUrl({
      method: apiMethodsKeys.searchPerson,
      query
    });

    persons = await axios.get(personUrl)
      .then(res => res && res.data && res.data.results);

    if (!persons || !persons.length) {
      return {
        currentPage: 1,
        results: [],
        totalPages: 1,
        totalCount: 0
      };
    }

    persons = persons.map((p) => p.id);
  }

  const resultFilms = [];
  const unique = {};

  for (let i = 0; i < persons.length; i++) {
    const filmsUrl = buildUrl({
      method: apiMethodsKeys.searchFilmsByDirector,
      parametr: persons[i]
    });

    const films = await axios.get(filmsUrl)
      .then(res => res && res.data && res.data.crew);

    if (films) {
      for (const j in films) {
        if (films[j].job !== 'Director') {
          continue;
        }

        if (typeof (unique[films[i].id]) == 'undefined') {
          resultFilms.push(films[i]);
          unique[films[i].id] = 0;
        }
      }
    }
  }

  return {
    currentPage: 1,
    results: resultFilms,
    totalPages: 1,
    totalCount: resultFilms.length
  };
};

export const searchFilmsByTitle = async ({ query, startPage, endPage }) => {
  const films = [];
  let totalPages = 1;
  let currentPage = 1;
  let totalCount = 0;
  const filmsUrl = buildUrl({
    method: apiMethodsKeys.searchFilmsByTitle,
    query,
    page: startPage
  });

  await axios.get(filmsUrl).then(res => {
    films.push(...res.data.results);
    totalPages = res.data.total_pages;
    totalCount = res.data.total_results;
    currentPage = res.data.page;
  });

  if (endPage && startPage < totalPages) {
    const end = endPage <= totalPages ? endPage : totalPages;

    for (let i = startPage; i <= end; i++) {
      currentPage = await getPage(query, i, films);
    }
  }

  const ids = {};

  return {
    currentPage,
    totalPages,
    totalCount,
    results: films.filter(f => {
      const isUnique = !ids[f.id];

      ids[f.id] = true;
      return isUnique;
    })
  };
};

const getPage = async (query, pageNumber, dataArr) => {
  const newPageUrl = buildUrl({
    method: apiMethodsKeys.searchFilmsByTitle,
    query,
    page: pageNumber
  });
  let newCurrentPage;

  await axios.get(newPageUrl).then(res => {
    dataArr.push(...res.data.results);
    newCurrentPage = res.data.page;
  });

  return newCurrentPage;
};
