export const getGenresString = ({ genres, genreIds }) => {
  if (!genres || !genres.length
    || !genreIds || !genreIds.length) {
    return '';
  }

  return genreIds
    .map(id => {
      const genre = genres.find(gen => gen.id === id) || {};

      return genre.name;
    })
    .join(' & ');
};
