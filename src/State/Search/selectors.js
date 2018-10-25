import { createSelector } from 'reselect';

import sortTypes from 'Constants/sortTypes';
import { compareObjectsByProp } from 'Utils/comparers';

const dateProperty = 'release_date';
const ratingProperty = 'vote_average';

const getResults = state => state.search && state.search.results;

export const getSearchState = state => state.search;
export const isSearchFetchingSelector = state => state.search && state.search.isFetching;
export const getSearchError = state => state.search && state.search.error;
export const getTotalCount = state => state.search && state.search.totalCount;
export const getSortType = state => state.search && state.search.sortType;
export const getSortDirection = state => state.search && state.search.sortDirection;

export const getSearchResults = createSelector(
  getResults,
  getSortType,
  getSortDirection,
  (results, sortType, sortDirection) => {
    const sortProperty = sortType === sortTypes.DATE ? dateProperty : ratingProperty;

    return [...results].sort(compareObjectsByProp(sortProperty, sortDirection));
  }
);
