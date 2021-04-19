import {
  openPopup
} from './utils/utils';
import {
  FooterComponent
} from './view/footer';
import {
  MainNavigation
} from './view/main-navigation';
import {
  HeaderComponent
} from './view/header';
import {
  SortFilmsComponent
} from './view/filters-sort';
import {
  FooterStatistics
} from './view/footer-statistics';
import {
  HeaderProfileRating
} from './view/header-profile-rating';
import {
  FilmsContainer
} from './view/films-container';
import {
  FilmsListComponent
} from './view/films-list';
import {
  renderElement
} from './utils/utils';
import {generateFilter} from '../src/utils/filters';
import {
  filmsMockArray
} from '../src/mock/task';
import {
  ShowMoreButton
} from './view/show-more-btn';
import {
  FilmCardComponent
} from './view/film-card';

import {
  Popup
} from './view/popup/popup';

import {
  RENDER_POSITION,
  SITE_ELEMENTS_SELECTORS
} from './consts';

// рендер элементов страницы
export const renderSiteElements = () => {
  const siteBody = document.querySelector(SITE_ELEMENTS_SELECTORS.BODY);
  const siteMainElement = document.querySelector(SITE_ELEMENTS_SELECTORS.MAIN);
  const isMovieExtra = true;
  const generateFilmFilters = generateFilter(filmsMockArray.films);
  renderElement(siteBody, new HeaderComponent().getElement(), RENDER_POSITION.AFTER_BEGIN);
  renderElement(siteBody, new FooterComponent().getElement(),  RENDER_POSITION.BEFORE_END);
  const siteFooter = document.querySelector(SITE_ELEMENTS_SELECTORS.FOOTER);
  renderElement(siteFooter, new FooterStatistics().getElement(), RENDER_POSITION.BEFORE_END);
  renderElement(siteMainElement, new MainNavigation(generateFilmFilters).getElement(), RENDER_POSITION.AFTER_BEGIN);
  renderElement(siteMainElement, new SortFilmsComponent().getElement(), RENDER_POSITION.BEFORE_END);
  renderElement(siteMainElement, new FilmsContainer().getElement(), RENDER_POSITION.BEFORE_END);
  const siteHeader = document.querySelector('.header');
  renderElement(siteHeader, new HeaderProfileRating(filmsMockArray.user_details.already_watched).getElement(), RENDER_POSITION.BEFORE_END);
  const siteFilms = document.querySelector(SITE_ELEMENTS_SELECTORS.FILMS);
  renderElement(siteFilms, new FilmsListComponent(!isMovieExtra, 'All movies. Upcoming', '').getElement(), RENDER_POSITION.BEFORE_END);
  const TASK_COUNT_PER_STEP = 5;
  const siteFilmsListContainer = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
  const siteFilmsList = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST);
  // логика рендера и открытия попапа и отрисовка данных для карточки фильма
  for (let i = 0; i < Math.min(filmsMockArray.films.length, TASK_COUNT_PER_STEP); i++) {
    const filmCard = new FilmCardComponent(filmsMockArray.films[i]).getElement();
    renderElement(siteFilmsListContainer, filmCard, 'afterbegin');
    const renderPopup = () => {
      siteBody.classList.add('hide-overflow');
      renderElement(siteBody, new Popup(filmsMockArray.films[i]).getElement(), RENDER_POSITION.BEFORE_END);
    };
    const createdFilmCard = document.querySelector('.film-card');
    createdFilmCard && createdFilmCard.addEventListener('click', () => {
      openPopup(renderPopup());
    });
  }
  //логика показа фильмов для кнопки loadMoreButton
  if (filmsMockArray.films.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;
    renderElement(siteFilmsList, new ShowMoreButton().getElement(), RENDER_POSITION.BEFORE_END);
    const loadMoreButton = siteFilmsList && siteFilmsList.querySelector('.films-list__show-more');
    loadMoreButton && loadMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      filmsMockArray.films
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderElement(siteFilmsListContainer, new FilmCardComponent(task).getElement(), RENDER_POSITION.BEFORE_END));

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
    renderElement(siteFilms, new FilmsListComponent(isMovieExtra, 'Top rated', 'film-list--top-rated').getElement(), RENDER_POSITION.BEFORE_END);
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topRatedBlock = document.querySelector('.film-list--top-rated');
      const topRatedBlockContainer = topRatedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      renderElement(topRatedBlockContainer, new FilmCardComponent(topRatedFilms[i]).getElement(), RENDER_POSITION.BEFORE_END);
    }
  }
  if (topCommentedFilms.length > 0) {
    renderElement(siteFilms, new FilmsListComponent(isMovieExtra, 'Most commented', 'film-list--top-commented').getElement(), RENDER_POSITION.BEFORE_END);
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topCommentedBlock = document.querySelector('.film-list--top-commented');
      const topCommentedBlockContainer = topCommentedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      renderElement(topCommentedBlockContainer, new FilmCardComponent(topCommentedFilms[i]).getElement(), RENDER_POSITION.BEFORE_END);
    }
  }
};
