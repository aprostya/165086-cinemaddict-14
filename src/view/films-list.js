import AbstractView from './abstract';

const createFilmsList = (isFilmExtra, movieTitle, filmListType, totalFilms) => {
  const filmsTitle = totalFilms > 0 ? `${movieTitle}` : 'There are no movies in our database';
  const isTitleHidden = isFilmExtra || totalFilms <= 0;
  const isExtraTitle = isFilmExtra ? 'films-list--extra' : '';
  return `<section class="films-list ${isExtraTitle} ${filmListType ? `${filmListType}` : ''}">
  <h2 class="films-list__title ${isTitleHidden ? '': 'visually-hidden'}">${filmsTitle}</h2>
  <div class="films-list__container">
  </div>
</section>`;
};

class FilmsListComponent extends AbstractView {
  constructor(isFilmExtra, movieTitle, filmListType, totalFilms) {
    super();
    this.isFilmExtra = isFilmExtra;
    this.movieTitle = movieTitle;
    this.filmListType = filmListType;
    this.totalFilms = totalFilms;
  }
  getTemplate() {
    return createFilmsList(this.isFilmExtra, this.movieTitle, this.filmListType, this.totalFilms);
  }
}

export {
  FilmsListComponent
};
