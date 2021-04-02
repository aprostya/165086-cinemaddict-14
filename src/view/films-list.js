export const createFilmsList = (isFilmExtra, movieName) => {
  return (`
  <section class="films-list ${isFilmExtra ? 'films-list--extra' : '' }">
  <h2 class="films-list__title ${isFilmExtra ? '': 'visually-hidden'}">${movieName}</h2>
  <div class="films-list__container">
  </div>
</section>`);
};
