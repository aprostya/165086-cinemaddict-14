import {createElement} from '../utils/utils';

const createFilmsList = (isFilmExtra, movieTitle, filmListType) => {
  return `<section class="films-list ${isFilmExtra ? 'films-list--extra' : ''} ${filmListType ? `${filmListType}` : ''}">
  <h2 class="films-list__title ${isFilmExtra ? '': 'visually-hidden'}">${movieTitle}</h2>
  <div class="films-list__container">
  </div>
</section>`;
};

class FilmsListComponent {
  constructor(isFilmExtra, movieTitle, filmListType) {
    this._element = null;
    this.isFilmExtra = isFilmExtra;
    this.movieTitle = movieTitle;
    this.filmListType = filmListType;
  }
  getTemplate() {
    return createFilmsList(this.isFilmExtra, this.movieTitle, this.filmListType);
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

