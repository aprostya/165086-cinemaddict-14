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
import {
  generateFilter
} from '../src/utils/filters';
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
  RENDER_POSITION,
  SITE_ELEMENTS_SELECTORS
} from './consts';

const TASK_COUNT_PER_STEP = 5;
const isMovieExtra = true;
const siteBody = document.querySelector(SITE_ELEMENTS_SELECTORS.BODY);
const siteMainElement = document.querySelector(SITE_ELEMENTS_SELECTORS.MAIN);
const filmsCount = filmsMockArray.films.length;
const generateFilmFilters = generateFilter(filmsMockArray.films);
// рендер элементов страницы
export const renderSiteElements = () => {
  renderElement(siteBody, new HeaderComponent().getElement(), RENDER_POSITION.AFTER_BEGIN);
  renderElement(siteBody, new FooterComponent().getElement());
  const siteFooter = document.querySelector(SITE_ELEMENTS_SELECTORS.FOOTER);
  renderElement(siteFooter, new FooterStatistics(filmsCount).getElement());
  renderElement(siteMainElement, new MainNavigation(generateFilmFilters).getElement(), RENDER_POSITION.AFTER_BEGIN);
  renderElement(siteMainElement, new SortFilmsComponent().getElement());
  renderElement(siteMainElement, new FilmsContainer().getElement());
  const siteHeader = document.querySelector('.header');
  renderElement(siteHeader, new HeaderProfileRating(filmsMockArray.user_details.already_watched).getElement());
  const siteFilms = document.querySelector(SITE_ELEMENTS_SELECTORS.FILMS);
  renderElement(siteFilms, new FilmsListComponent(!isMovieExtra, 'All movies. Upcoming', '', filmsCount).getElement());
  const siteFilmsListContainer = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
  const siteFilmsList = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST);
  // логика рендера и открытия попапа и отрисовка данных для карточки фильма
  for (let i = 0; i < TASK_COUNT_PER_STEP; i++) {
    const totalFilms = filmsMockArray.films;
    const filmCard = new FilmCardComponent(totalFilms[i]);
    renderElement(siteFilmsListContainer, filmCard.getElement(), RENDER_POSITION.AFTER_BEGIN);
    filmCard.setClickHandler(() => openPopup(filmCard.getElement(), filmsMockArray.films));
  }

  //логика показа фильмов для кнопки loadMoreButton
  if (filmsCount > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;
    const loadMoreButtonComponent = new ShowMoreButton();
    renderElement(siteFilmsList, loadMoreButtonComponent.getElement());
    loadMoreButtonComponent.setClickHandler(() => {
      filmsMockArray.films
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => {
          const filmCard = new FilmCardComponent(task);
          renderElement(siteFilmsListContainer, filmCard.getElement());
          filmCard.setClickHandler(() => {
            openPopup(filmCard.getElement(), filmsMockArray.films);
          });
        });

      renderedTaskCount += TASK_COUNT_PER_STEP;
      if (renderedTaskCount >= filmsCount) {
        const loadMoreButton = document.querySelector('.films-list__show-more');
        //todo как переписать на removeElement?
        //loadMoreButtonComponent.removeElement() - не работает
        loadMoreButton.remove();
      }
    });
  }


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
  if (topRatedFilms.length > 0) {
    renderElement(siteFilms, new FilmsListComponent(isMovieExtra, 'Top rated', 'film-list--top-rated', topRatedFilms.length).getElement());
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topRatedBlock = document.querySelector('.film-list--top-rated');
      const topRatedBlockContainer = topRatedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      const filmCardTopRatedComponent = new FilmCardComponent(topRatedFilms[i]);
      const filmCardTopRated = filmCardTopRatedComponent;
      renderElement(topRatedBlockContainer, filmCardTopRated.getElement());
      filmCardTopRated.setClickHandler(() => openPopup(filmCardTopRated.getElement(), filmsMockArray.films));
    }
  }
  if (topCommentedFilms.length > 0) {
    renderElement(siteFilms, new FilmsListComponent(isMovieExtra, 'Most commented', 'film-list--top-commented', topCommentedFilms.length).getElement());
    for (let i = 0; i < topRatedFilms.length; i++) {
      const topCommentedBlock = document.querySelector('.film-list--top-commented');
      const filmCardTopCommented = new FilmCardComponent(topCommentedFilms[i]);
      const topCommentedBlockContainer = topCommentedBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      renderElement(topCommentedBlockContainer, filmCardTopCommented.getElement());
      filmCardTopCommented.setClickHandler(() => openPopup(filmCardTopCommented.getElement(), filmsMockArray.films));
    }
  }
};
