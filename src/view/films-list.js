export const createFilmsList = (isFilmExtra, movieName, filmListType = '') => {
  return (`
  <section class="films-list ${isFilmExtra ? 'films-list--extra' : ''} ${filmListType}">
  <h2 class="films-list__title ${isFilmExtra ? '': 'visually-hidden'}">${movieName}</h2>
  <div class="films-list__container">
  </div>
</section>`);
};
