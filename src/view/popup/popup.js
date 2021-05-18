import AbstractView from '../abstract';
import {
  popupBottomContainer
} from './film-details-bottom-container';
import {
  formatDate,
  formatTime
} from '../../utils/utils';

const createPopup = (film) => {
  const {
    film_info: {
      title,
      description,
      poster,
      directors,
      alternative_title,
      age_rating,
      actors,
      writers,
      isFavorite,
      isWatched,
      isArchived,
      release: {
        date,
        release_country,
      },
      total_rating: rating,
      duration,
      genre: genres,
    },
    comments,
  } = film;
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${age_rating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternative_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${directors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatDate(date, 'DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatTime(duration).hours}h ${formatTime(duration).minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${genres.map((genre) => {return`<span class="film-details__genre">${genre}</span>`;}).join('')}
            </tr>
          </table>
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
      <section class="film-details__controls">
      <input type="checkbox" ${isWatched ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
      <input type="checkbox" ${isArchived ? 'checked' : ''} class="film-details__control-input visually-hidden" id="watched" name="watched">
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
      <input type="checkbox" ${isFavorite ? 'checked' : ''} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    ${popupBottomContainer(comments)}
  </form>
</section>`;
};

class Popup extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
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
    const favCheckBox = this.getElement().querySelector('#favorite');
    favCheckBox.checked = !favCheckBox.checked;
    this._callback.clickOnFavorite(this._film);
  }

  _clickWatchListHandler(event) {
    event.preventDefault();
    const watchListCheckBox = this.getElement().querySelector('#watchlist');
    watchListCheckBox.checked = !watchListCheckBox.checked;
    this._callback.clickOnWatchListHandler(this._film);
  }

  _clickMarkAsWatchedHandler(event) {
    event.preventDefault();
    const markAsWatchedCheckBox = this.getElement().querySelector('#watched');
    markAsWatchedCheckBox.checked = !markAsWatchedCheckBox.checked;
    this._callback.clickOnMarkAsWatchedHandler(this._film);
  }

  _clickPopupHandler(event) {
    event.preventDefault();
    this._callback.clickPopupHandler(this._film);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  setPopupHandler(callback) {
    this._callback.clickPopupHandler = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickPopupHandler);
  }

  setFavoriteHandler(callback) {
    this._callback.clickOnFavorite = callback;
    const element = this.getElement().querySelector('.film-details__control-label--favorite');
    element.addEventListener('click', this._clickFavHandler);
  }

  setWatchListHandler(callback) {
    this._callback.clickOnWatchListHandler = callback;
    const element = this.getElement().querySelector('.film-details__control-label--watchlist');
    element.addEventListener('click', this._clickWatchListHandler);
  }

  setMarkAsWatched(callback) {
    this._callback.clickOnMarkAsWatchedHandler = callback;
    const element = this.getElement().querySelector('.film-details__control-label--watched');
    element.addEventListener('click',  this._clickMarkAsWatchedHandler);
  }
  getTemplate() {
    return createPopup(this.film);
  }
}

export {
  Popup
};
