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
  createShowMoreBtn
} from './view/show-more-btn';
import {
  createFilmCard
} from './view/film-card';

const render = (container, template, place) => {
  container && container.insertAdjacentHTML(place, template);
};

const siteBody = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const FILMS_COUNT = 5;
const isMovieExtra = true;
render(siteBody, createSiteHeader(), 'afterbegin');
render(siteBody, createSiteFooter(), 'beforeend');
render(siteMainElement, createMainNavigation(), 'afterbegin');
render(siteMainElement, createSortFilters(), 'beforeend');
render(siteMainElement, createFilmsContainer(), 'beforeend');

const siteFooter = document.querySelector('.footer');
render(siteFooter, createFooterStatistics(), 'beforeend');

const siteHeader = document.querySelector('.header');
render(siteHeader, createHeaderProfileRating(), 'beforeend');

const siteFilms = document.querySelector('.films');
render(siteFilms, createFilmsList(!isMovieExtra, 'All movies. Upcoming'), 'beforeend');
const siteFilmsList = siteFilms.querySelector('.films-list');
render(siteFilms, createFilmsList(isMovieExtra, 'Top rated'), 'beforeend');
render(siteFilms, createFilmsList(isMovieExtra, 'Most commented'), 'beforeend');
const siteFilmExtraBlocks = document.querySelectorAll('.films-list--extra');
const siteFilmsListContainer = siteFilms.querySelector('.films-list__container');
render(siteFilmsList, createShowMoreBtn(), 'beforeend');
for (let i = 0; i < FILMS_COUNT; i++) {
  render(siteFilmsListContainer, createFilmCard(), 'afterbegin');
}
siteFilmExtraBlocks.forEach((siteFilmExtraBlock) => {
  const siteFilmExtraContainer = siteFilmExtraBlock.querySelector('.films-list__container');
  for (let i = 0; i < 2; i++) {
    render(siteFilmExtraContainer, createFilmCard(), 'beforeend');
  }
});
