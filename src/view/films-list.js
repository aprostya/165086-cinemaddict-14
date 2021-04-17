import {createElement} from '../utils/utils';

const createFilmsList = (isFilmExtra, movieTitle, filmListType, totalFilms) => {
  const filmsTitle = totalFilms > 0  ? `${movieTitle}` : 'There are no movies in our database';
  const isTitleHidden = isFilmExtra || totalFilms <= 0;
  const isExtraTitle = isFilmExtra ? 'films-list--extra' : '';
  return `<section class="films-list ${isExtraTitle} ${filmListType ? `${filmListType}` : ''}">
  <h2 class="films-list__title ${isTitleHidden ? '': 'visually-hidden'}">${filmsTitle}</h2>
  <div class="films-list__container">
  </div>
</section>`;
};

class FilmsListComponent {
  constructor(isFilmExtra, movieTitle, filmListType, totalFilms) {
    this._element = null;
    this.isFilmExtra = isFilmExtra;
    this.movieTitle = movieTitle;
    this.filmListType = filmListType;
    this.totalFilms = totalFilms;
  }
  getTemplate() {
    return createFilmsList(this.isFilmExtra, this.movieTitle, this.filmListType, this.totalFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {FilmsListComponent};

