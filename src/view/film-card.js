import {
  getRandom,
  formatDate,
  formatTime
} from '../utils/utils';
import AbstractView from './abstract';

const createFilmCard = (film) => {
  const {
    id,
    film_info: {
      title,
      description,
      poster,
      isFavorite,
      isWatched,
      isArchived,
      release: {
        date: year,
      },
      total_rating: rating,
      duration,
      genre,
    },
    comments,
  } = film;
  return `<article class="film-card" id=${id}>
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${formatDate(year)}</span>
    <span class="film-card__duration">${formatTime(duration).hours}h ${formatTime(duration).minutes}m</span>
    <span class="film-card__genre">${genre[getRandom(1, genre.length - 1)]}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isArchived ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : '' }" type="button">Mark as favorite</button>
  </div>
</article>
`;
};


class FilmCardComponent extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
    this._clickPopupHandler = this._clickPopupHandler.bind(this);
    this._clickFavHandler = this._clickFavHandler.bind(this);
    this._clickWatchListHandler = this._clickWatchListHandler.bind(this);
    this._clickMarkAsWatchedHandler = this._clickMarkAsWatchedHandler.bind(this);
  }

  _clickHandler(event) {
    event.preventDefault();
    this._callback.click(this._film);
  }

  _clickFavHandler(event) {
    event.preventDefault();
    this.getElement().querySelector('.film-card__controls-item--favorite').classList.toggle('film-card__controls-item--active');
    this._callback.clickOnFavoriteHandler(this._film);
  }

  _clickWatchListHandler(event) {
    event.preventDefault();
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').classList.toggle('film-card__controls-item--active');
    this._callback.clickOnWatchListHandler(this._film);
  }

  _clickMarkAsWatchedHandler(event) {
    event.preventDefault();
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').classList.toggle('film-card__controls-item--active');
    this._callback.clickOnMarkAsWatchedHandler(this._film);
  }

  _clickPopupHandler(event) {
    event.preventDefault();
    this._callback.clickOnPopupHandler(this._film);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  setPopupHandler(callback) {
    this._callback.clickOnPopupHandler = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickPopupHandler);
  }

  setFavoriteHandler(callback) {
    this._callback.clickOnFavoriteHandler = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._clickFavHandler);
  }

  setWatchListHandler(callback) {
    this._callback.clickOnWatchListHandler = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._clickWatchListHandler);
  }

  setMarkAsWatched(callback) {
    this._callback.clickOnMarkAsWatchedHandler = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._clickMarkAsWatchedHandler);
  }

  update(film) {
    this._film = film;
  }

  getTemplate() {
    return createFilmCard(this._film);
  }
}

export {
  FilmCardComponent
};
