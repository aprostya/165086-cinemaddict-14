import {
  renderElement, replace, remove
} from '../utils/utils';
import {Popup} from '../view/popup/popup';

export default class FilmCardPopupPresenter {
  constructor(container,changeData) {
    this._container = container;
    this._popUp = null;
    this._changeData = changeData;
    this._handleFavoriteClick  = this._handleFavoriteClick.bind(this);
    this._handleMovieWatchedClick = this._handleMovieWatchedClick.bind(this);
    this._handleMovieMarkAsWatchedClick = this._handleMovieMarkAsWatchedClick.bind(this);
  }

  init(film, changeData) {
    this._film = film;
    const prevComponent = this._popUp;
    this._component = new FilmCardPopupPresenter(this._film);
    this._changeData = changeData;
    this._popUp = null;
    this._popUp = new Popup(this._film);
    this._popUp.setFavoriteHandler(this._handleFavoriteClick);
    this._popUp.setWatchListHandler(this._handleMovieWatchedClick);
    this._popUp.setMarkAsWatched(this._handleMovieMarkAsWatchedClick);
    if (prevComponent === null) {
      renderElement(this._container, this._popUp.getElement());
      return;
    }
    if (this._container.contains(prevComponent.getElement())) {
      replace(this._component, prevComponent);
    }
    remove(prevComponent);
  }

  _handleFavoriteClick() {
    this._changeData(
      {
        ...this._film,
        film_info: {
          ...this._film.film_info,
          isFavorite: !this._film.film_info.isFavorite,
        },
      },
    );
  }
  _handleMovieWatchedClick() {
    this._changeData(
      {
        ...this._film,
        film_info: {
          ...this._film.film_info,
          isArchived: !this._film.film_info.isArchived,
        },
      },
    );
  }

  _handleMovieMarkAsWatchedClick() {
    this._changeData(
      {
        ...this._film,
        film_info: {
          ...this._film.film_info,
          isWatched: !this._film.film_info.isWatched,
        },
      },
    );
  }

  update(film) {
    this._film = film;
    this._popUp.update(this._film.films);
  }

  destroy() {
    remove(this._popUp);
  }
}
