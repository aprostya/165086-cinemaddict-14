import AbstractView from './abstract';

const createFilmsList = (isFilmExtra, title, filmType, films) => {
  const filmsTitle = films > 0 ? `${title}` : 'There are no movies in our database';
  const isTitleHidden = isFilmExtra || films <= 0;
  const isExtraTitle = isFilmExtra ? 'films-list--extra' : '';
  return `<section class="films-list ${isExtraTitle} ${filmType ? `${filmType}` : ''}">
  <h2 class="films-list__title ${isTitleHidden ? '': 'visually-hidden'}">${filmsTitle}</h2>
  <div class="films-list__container">
  </div>
</section>`;
};

class FilmsListComponentView extends AbstractView {
  constructor(isFilmExtra, title, filmType, films) {
    super();
    this.isFilmExtra = isFilmExtra;
    this.title = title;
    this.filmType = filmType;
    this.films = films;
  }
  getTemplate() {
    return createFilmsList(this.isFilmExtra, this.title, this.filmType, this.films);
  }
}

export {
  FilmsListComponentView
};
