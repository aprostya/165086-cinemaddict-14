import {
  renderElement, replace, remove
} from '../utils/utils';
import {
  FilmCardComponent
} from '../view/film-card';
export default class FilmCardPresenter {
  constructor(container,changeData) {
    this._container = container;
    this._component = null;
    this._changeData = changeData;
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleMovieMarkAsWatchedClick = this._handleMovieMarkAsWatchedClick.bind(this);
    this._handleMovieWatchedClick = this._handleMovieWatchedClick.bind(this);
  }

  init(film, onOpenPopup) {
    this._film = film;
    const prevComponent = this._component;
    this._component = new FilmCardComponent(this._film);
    this._component.setPopupHandler(onOpenPopup);
    this._component.setFavoriteHandler(this._handleFavoriteClick);
    this._component.setWatchListHandler(this._handleMovieWatchedClick);
    this._component.setMarkAsWatched(this._handleMovieMarkAsWatchedClick);

    if (prevComponent === null) {
      renderElement(this._container, this._component.getElement());
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

  destroy() {
    remove(this._component);
  }
}
