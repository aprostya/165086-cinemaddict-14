import {getRandom, formatDate, formatTime, createElement} from '../utils/utils';

const createFilmCard = (film) => {
  const {
    id,
    film_info: {
      title,
      description,
      poster,
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
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>
`;
};


class FilmCardComponent {
  constructor(films) {
    this._element = null;
    this.films = films;
  }
  getTemplate() {
    return createFilmCard(this.films);
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

export {FilmCardComponent};
