import {
  openPopup,
  render
} from './utils/utils';

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

import {generateFilter} from '../src/utils/filters';

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
  popup
} from './view/popup/popup';

import {
  SITE_ELEMENTS_SELECTORS
} from './consts';

// рендер элементов страницы
export const renderSiteElements = () => {
  const siteBody = document.querySelector(SITE_ELEMENTS_SELECTORS.BODY);
  const siteMainElement = document.querySelector(SITE_ELEMENTS_SELECTORS.MAIN);
  const isMovieExtra = true;
  const siteFooter = document.querySelector(SITE_ELEMENTS_SELECTORS.FOOTER);
  render(siteFooter, createFooterStatistics(), 'beforeend');
  render(siteBody, createSiteHeader(), 'afterbegin');
  render(siteBody, createSiteFooter(), 'beforeend');
  render(siteMainElement, createMainNavigation(generateFilter(filmsMockArray.films)), 'afterbegin');
  render(siteMainElement, createSortFilters(), 'beforeend');
  render(siteMainElement, createFilmsContainer(), 'beforeend');
  const siteHeader = document.querySelector('.header');
  render(siteHeader, createHeaderProfileRating(filmsMockArray.user_details.already_watched), 'beforeend');
  const siteFilms = document.querySelector(SITE_ELEMENTS_SELECTORS.FILMS);
  render(siteFilms, createFilmsList(!isMovieExtra, 'All movies. Upcoming'), 'beforeend');
  const TASK_COUNT_PER_STEP = 5;
  const siteFilmsListContainer = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
  const siteFilmsList = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST);
  // логика рендера и открытия попапа и отрисовка данных для карточки фильма
  for (let i = 0; i < Math.min(filmsMockArray.films.length, TASK_COUNT_PER_STEP); i++) {
    const filmCard = createFilmCard(filmsMockArray.films[i]);
    render(siteFilmsListContainer, filmCard, 'afterbegin');
    const renderPopup = () => {
      render(siteBody, popup(filmsMockArray.films[i]), 'beforeend');
    };
    const createdFilmCard = document.querySelector('.film-card');
    createdFilmCard.addEventListener('click', () => {
      openPopup(renderPopup());
    });
  }
  //логика показа фильмов для кнопки loadMoreButton
  if (filmsMockArray.films.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;
    render(siteFilmsList, createShowMoreBtn(), 'beforeend');
    const loadMoreButton = siteFilmsList.querySelector('.films-list__show-more');
    loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      filmsMockArray.films
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => render(siteFilmsListContainer, createFilmCard(task), 'beforeend'));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= filmsMockArray.films.length) {
        loadMoreButton.remove();
      }
    });
  }

  //todo можно ли как-то сделать одну общую функцию для compareTotalRating и compareTotalComments,
  // просто брать другие значения у a и b ?
  const compareTotalRating = (a, b) => {
    if (a.film_info.total_rating < b.film_info.total_rating) {
      return 1;
    }
    if (a.film_info.total_rating > b.film_info.total_rating) {
      return -1;
    }
    return 0;
  };

  const compareTotalComments = (a, b) => {
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    return 0;
  };
  const topRatedFilms = filmsMockArray.films.sort(compareTotalRating).slice(0, 2);
  const topCommentedFilms = filmsMockArray.films.sort(compareTotalComments).slice(0, 2);
  //todo стоит ли ифы для topRatedFilms и topCommentedFilms объединять в одну функцию?
  if (topRatedFilms.length > 0) {
    render(siteFilms, createFilmsList(isMovieExtra, 'Top rated', 'film-list--top-rated'), 'beforeend');
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topRatedBlock = document.querySelector('.film-list--top-rated');
      const topRatedBlockContainer = topRatedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      render(topRatedBlockContainer, createFilmCard(topRatedFilms[i]), 'beforeend');
    }
  }
  if (topCommentedFilms.length > 0) {
    render(siteFilms, createFilmsList(isMovieExtra, 'Most commented', 'film-list--top-commented'), 'beforeend');
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topCommentedBlock = document.querySelector('.film-list--top-commented');
      const topCommentedBlockContainer = topCommentedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      render(topCommentedBlockContainer, createFilmCard(topCommentedFilms[i]), 'beforeend');
    }
  }
};
