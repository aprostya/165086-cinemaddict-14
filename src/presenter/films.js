import FilmCardPresenter from './film-card';
import MainNavigationPresenter from './main-navigation';
import {
  HeaderComponentView
} from '../view/header';
import {
  SortFilmsComponentView
} from '../view/filters-sort';
import FilmCardPopupPresenter from '../presenter/film-popup';
import {
  FilmsContainerView
} from '../view/films-container';
import {
  FilmsListComponentView
} from '../view/films-list';

import {
  ShowMoreButtonView
} from '../view/show-more-btn';

import {
  removeBodyScroll,
  destroyElement,
  renderElement,
  updateItem,
  remove
} from '../utils/utils';
import {
  generateFilter
} from '../utils/filters';
import {
  RENDER_POSITION,
  SITE_ELEMENTS_SELECTORS,
  SITE_TITLES
} from '../consts';

const FILMS_PER_PAGE = 5;
const isMovieExtra = true;
export default class FilmsPresenter {
  constructor(container) {
    this._container = container;
    this._filmsView = new FilmsContainerView();
    this._sortFilmsComponent = new SortFilmsComponentView();
    this._showMoreBtnComponent = new ShowMoreButtonView();
    this._headerComponent = new HeaderComponentView();
    this._filmPresenter = {};
    this._mainNavPresenter = {};
    this._isPopupOpen = false;
    this._renderedFilmsCount = FILMS_PER_PAGE;
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleClickOnShowMoreButton = this._handleClickOnShowMoreButton.bind(this);
  }

  init(films) {
    this._films = films;
    this._currentFilmsShift = FILMS_PER_PAGE;
    this._generateFilmFilters = generateFilter(this._films.films);
    this._totalFilms = this._films.films;
    this._renderFilmsContainer();
    this._renderSort();
    this._renderMainNavigation();
    this._renderFilms(this._films.films.slice(0, this._currentFilmsShift));
    this._renderLoadMoreButton();
  }

  _renderFilmsContainer() {
    renderElement(this._container, this._filmsView.getElement());
    const siteFilms = this._container.querySelector(SITE_ELEMENTS_SELECTORS.FILMS);
    renderElement(siteFilms, new FilmsListComponentView(!isMovieExtra, SITE_TITLES.DEFAULT, '', this._totalFilms.length).getElement());
  }

  _renderSort() {
    renderElement(this._container, this._sortFilmsComponent.getElement(), RENDER_POSITION.AFTER_BEGIN);
  }

  _handleFilmChange(updatedFilm) {
    this._totalFilms = updateItem(this._totalFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm, () => this._handleOpenPopup(updatedFilm));
    this._mainNavPresenter.init(this._totalFilms);
  }

  _clearFilmsList() {
    Object
      .values(this._filmPresenter)
      .forEach((film) => {
        film.destroy();
      });
    this._filmPresenter = {};
    remove(this._showMoreBtnComponent);
  }

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmCardPresenter(container, this._handleFilmChange);
    filmPresenter.init(film, () => (this._isPopupOpen ? false : this._handleOpenPopup(film)));
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilmComponentView(films) {
    const siteFilms = this._container.querySelector(SITE_ELEMENTS_SELECTORS.FILMS);
    renderElement(siteFilms, new FilmsListComponentView(!isMovieExtra, SITE_TITLES.DEFAULT, '', films).getElement());
  }

  _handleClickOnShowMoreButton() {
    this._renderFilms(this._totalFilms.slice(this._currentFilmsShift, this._currentFilmsShift + FILMS_PER_PAGE));
    this._currentFilmsShift += FILMS_PER_PAGE;
    if (this._currentFilmsShift >= this._totalFilms.length) {
      this._showMoreBtnComponent.removeElement();
    }
  }

  _renderFilms(films = this._totalFilms) {
    for (let i = 0; i < films.length; i++) {
      const siteFilmsListContainer = this._container.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      this._renderFilmCard(siteFilmsListContainer, films[i]);
    }
  }

  _renderMainNavigation() {
    this._mainNavPresenter = new MainNavigationPresenter(this._container);
    this._mainNavPresenter.init(this._films.films);
  }

  _destroyModal(modal) {
    removeBodyScroll();
    this._isPopupOpen = false;
    destroyElement(modal);
  }

  _handleOpenPopup(film) {
    this._isPopupOpen = true;
    this._container.classList.add('hide-overflow');
    this._popupPresenter = new FilmCardPopupPresenter(this._container, film);
    this._popupPresenter.init(film, this._handleFilmChange);
    const modal = document.querySelector(SITE_ELEMENTS_SELECTORS.FILM_POPUP);
    const closeBtn = document.querySelector(SITE_ELEMENTS_SELECTORS.FILM_POPUP_CLOSE_BTN);
    window.onkeydown = (event) => {
      if (event.keyCode === 27) {
        this._destroyModal(modal);
      }
    };
    closeBtn && closeBtn.addEventListener('click', () => {
      this._destroyModal(modal);
    });
  }

  _renderLoadMoreButton() {
    const siteFilmsList = this._container.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST);
    renderElement(siteFilmsList, this._showMoreBtnComponent.getElement());
    this._showMoreBtnComponent.setClickHandler(this._handleClickOnShowMoreButton);
  }
}
