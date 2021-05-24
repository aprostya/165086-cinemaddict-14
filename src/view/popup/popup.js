import SmartView from '../smart';
import {
  popupBottomContainer
} from './film-details-bottom-container';
import {
  formatDate,
  formatTime
} from '../../utils/utils';

const BLANK_FILM = {
  'id': '',
  'film_info': {
    'title': '',
    'alternative_title': '',
    'total_rating': null,
    'poster': null,
    'age_rating': null,
    'production_date': null,
    'directors': null,
    'isFavorite': false,
    'isWatched': true,
    'isArchived': false,
    'writers': null,
    'actors': null,
    'release': null,
    'duration': null,
    'genre': null,
    'description': '',
  },
  'comments': null,
};

const createPopup = (film) => {
  const {
    selectedEmoji,
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
    ${popupBottomContainer(comments, selectedEmoji)}
  </form>
</section>`;
};

class Popup extends SmartView {
  constructor(film = BLANK_FILM) {
    super();
    this._data = Popup.parseFilmToData(film);
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
    this._clickFavHandler = this._clickFavHandler.bind(this);
    this._clickWatchListHandler = this._clickWatchListHandler.bind(this);
    this._clickMarkAsWatchedHandler = this._clickMarkAsWatchedHandler.bind(this);
    this._clickEmojiHandler = this._clickEmojiHandler.bind(this);
    this._setInnerHandlers();
    this._scrollContainer = null;
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        selectedEmoji: film.selectedEmoji || null,
      },
    );
  }

  static parseDataToFilm(film) {
    film = Object.assign({}, film);
    if(!film.selectedEmoji) {
      film.selectedEmoji = null;
    }
    delete film.selectedEmoji;
    return film;
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    const watchList = this.getElement().querySelector('.film-details__control-label--watchlist');
    watchList.addEventListener('click', this._clickWatchListHandler);
    const favoriteElement = this.getElement().querySelector('.film-details__control-label--favorite');
    favoriteElement.addEventListener('click', this._clickFavHandler);
    const watchedElement = this.getElement().querySelector('.film-details__control-label--watched');
    watchedElement.addEventListener('click',  this._clickMarkAsWatchedHandler);
    const emojies = this.getElement().querySelectorAll('.film-details__emoji-item');
    for(let i = 0; i < emojies.length; i++) {
      emojies[i].addEventListener('change', this._clickEmojiHandler);
    }
    // Popup.parseDataToFilm(this._data);
  }

  _clickHandler(event) {
    event.preventDefault();
    this._callback.click(this._film);
  }

  _clickFavHandler(event) {
    event.preventDefault();
    const favCheckBox = this.getElement().querySelector('#favorite');
    this.updateData({
      isFavorite: favCheckBox.checked = !favCheckBox.checked,
    }, true);
    this._callback.clickOnFavorite(this._film);
  }

  _clickWatchListHandler(event) {
    event.preventDefault();
    const watchListCheckBox = this.getElement().querySelector('#watchlist');
    this.updateData({
      isWatched: watchListCheckBox.checked = !watchListCheckBox.checked,
    }, true);
    this._callback.clickOnWatchListHandler(this._film);
  }

  _clickMarkAsWatchedHandler(event) {
    event.preventDefault();
    const markAsWatchedCheckBox = this.getElement().querySelector('#watched');
    this.updateData({
      isArchived: markAsWatchedCheckBox.checked = !markAsWatchedCheckBox.checked,
    }, true);
    this._callback.clickOnMarkAsWatchedHandler(this._film);
  }

  _clickEmojiHandler() {
    const emojiArray = this.getElement().querySelectorAll('.film-details__emoji-item');
    for(let i = 0; i < emojiArray.length; i++) {
      if(emojiArray[i].checked) {
        const id = emojiArray[i].getAttribute('id');
        const label = this.getElement().querySelector(`label[for=${id}]`);
        const emojiMainLabel = this.getElement().querySelector('.film-details__add-emoji-label');
        const emojiImg = label.getElementsByTagName('img')[0];
        const prevEmojiImg = emojiMainLabel.getElementsByTagName('img')[0];
        if(prevEmojiImg) {
          prevEmojiImg.remove();
        }
        const newEmojiImg = document.createElement('img');
        newEmojiImg.src = emojiImg.src;
        newEmojiImg.width = 30;
        this.updateData({
          selectedEmoji: id,
        });
        label.scrollTo({top: label.scrollHeight, behavior: 'smooth'});
        emojiMainLabel.appendChild(newEmojiImg);
      }
    }
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

  setEmojiHandler(callback) {
    this._callback.clickOnEmojiHandler = callback;
  }

  setFavoriteHandler(callback) {
    this._callback.clickOnFavorite = callback;
    const element = this.getElement().querySelector('.film-details__control-label--favorite');
    element.addEventListener('click', this._clickFavHandler);
  }

  setWatchListHandler(callback) {
    this._callback.clickOnWatchListHandler = callback;
  }

  setMarkAsWatched(callback) {
    this._callback.clickOnMarkAsWatchedHandler = callback;
  }
  getTemplate() {
    return createPopup(this._data);
  }
}

export {
  Popup
};
