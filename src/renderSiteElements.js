import {
  createSiteHeader
} from './view/header';
import {
  createSiteFooter
} from './view/footer';
import {
  createMainNavigation
} from './view/main-navigation';
import {
  createSortFilters
} from './view/filters-sort';
import {
  createFooterStatistics
} from './view/footer-statistics';
import {
  createHeaderProfileRating
} from './view/header-profile-rating';
import {
  createFilmsContainer
} from './view/films-container';
import {
  createFilmsList
} from './view/films-list';

import {
  filmsMockArray
} from '../src/mock/task';
import {
  createShowMoreBtn
} from './view/show-more-btn';
import {
  createFilmCard
} from './view/film-card';

import {
  openPopup,
  render
} from './utils/utils';

import {
  popup
} from './view/popup/popup';

import SITE_ELEMENTS_SELECTORS from './consts';

export const renderSiteElements = () => {
  const siteBody = document.querySelector(SITE_ELEMENTS_SELECTORS.BODY);
  const siteMainElement = document.querySelector(SITE_ELEMENTS_SELECTORS.MAIN);
  const isMovieExtra = true;
  const siteFooter = document.querySelector(SITE_ELEMENTS_SELECTORS.FOOTER);
  render(siteFooter, createFooterStatistics(), 'beforeend');
  render(siteBody, createSiteHeader(), 'afterbegin');
  render(siteBody, createSiteFooter(), 'beforeend');
  render(siteMainElement, createMainNavigation(), 'afterbegin');
  render(siteMainElement, createSortFilters(), 'beforeend');
  render(siteMainElement, createFilmsContainer(), 'beforeend');
  const siteHeader = document.querySelector('.header');
  render(siteHeader, createHeaderProfileRating(), 'beforeend');
  const siteFilms = document.querySelector(SITE_ELEMENTS_SELECTORS.FILMS);
  render(siteFilms, createFilmsList(!isMovieExtra, 'All movies. Upcoming'), 'beforeend');
  const TASK_COUNT_PER_STEP = 5;
  const siteFilmsListContainer = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
  const siteFilmsList = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST);

  for (let i = 0; i < Math.min(filmsMockArray.length, TASK_COUNT_PER_STEP); i++) {
    const filmCard = createFilmCard(filmsMockArray[i]);
    render(siteFilmsListContainer, filmCard, 'afterbegin');
    const renderPopup = () => {
      render(siteBody, popup(filmsMockArray[i]), 'beforeend');
    };
    const createdFilmCard = document.querySelector('.film-card');
    createdFilmCard.addEventListener('click', () => {
      openPopup(renderPopup());
    });
  }

  if (filmsMockArray.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;
    render(siteFilmsList, createShowMoreBtn(), 'beforeend');
    const loadMoreButton = siteFilmsList.querySelector('.films-list__show-more');
    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      filmsMockArray
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => render(siteFilmsListContainer, createFilmCard(task), 'beforeend'));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= filmsMockArray.length) {
        loadMoreButton.remove();
      }
    });
  }

  // todo Как прокинуть в фильтр по объекту принимаемый параметр из функции  atrribute ?
  // const renderExtraList = (array, blockName, title, atrribute ) => {
  //   const filteredArray = filmsMockArray.filter((film) => film.film_info.atrribute).slice(0,2);
  //   if(filteredArray.length > 0) {
  //     render(siteFilms, createFilmsList(isMovieExtra, 'Top rated', 'film-list--top-rated' ), 'beforeend');
  //   }
  // };
  const topRatedFilms = filmsMockArray.filter((film) => film.film_info.isTopRated).slice(0, 2);
  const topCommented = filmsMockArray.filter((film) => film.film_info.isTopCommented).slice(0, 2);
  //todo хотела это засунуть в функцию renderExtraList, но не получилось, см. выше.
  if (topRatedFilms.length > 0) {
    render(siteFilms, createFilmsList(isMovieExtra, 'Top rated', 'film-list--top-rated'), 'beforeend');
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topRatedBlock = document.querySelector('.film-list--top-rated');
      const topRatedBlockContainer = topRatedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      render(topRatedBlockContainer, createFilmCard(topRatedFilms[i]), 'beforeend');
    }
  }
  if (topCommented.length > 0) {
    render(siteFilms, createFilmsList(isMovieExtra, 'Most commented', 'film-list--top-commented'), 'beforeend');
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topRatedBlock = document.querySelector('.film-list--top-commented');
      const topRatedBlockContainer = topRatedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      render(topRatedBlockContainer, createFilmCard(topRatedFilms[i]), 'beforeend');
    }
  }
};
