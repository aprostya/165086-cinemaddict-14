"use strict";

var _header = require("./view/header");

var _footer = require("./view/footer");

var _mainNavigation = require("./view/main-navigation");

var _filtersSort = require("./view/filters-sort");

var _footerStatistics = require("./view/footer-statistics");

var _headerProfileRating = require("./view/header-profile-rating");

var _filmsContainer = require("./view/films-container");

var _filmsList = require("./view/films-list");

var _task = require("../src/mock/task");

var _showMoreBtn = require("./view/show-more-btn");

var _filmCard = require("./view/film-card");

var SITE_ELEMENTS_SELECTORS = {
  BODY: 'body',
  MAIN: '.main',
  HEADER: '.header',
  FOOTER: '.footer',
  FILMS: '.films',
  FILMS_LIST: '.films-list',
  FILMS_LIST_EXTRA: '.films-list--extra',
  FILMS_LIST_CONTAINER: '.films-list__container'
};

var render = function render(container, template, place) {
  container && container.insertAdjacentHTML(place, template);
};

var filmsList = _task.dataStructure.films;
var siteBody = document.querySelector(SITE_ELEMENTS_SELECTORS.BODY);
var siteMainElement = document.querySelector(SITE_ELEMENTS_SELECTORS.MAIN);
var FILMS_COUNT = 5;
var isMovieExtra = true;
render(siteBody, (0, _header.createSiteHeader)(), 'afterbegin');
render(siteBody, (0, _footer.createSiteFooter)(), 'beforeend');
render(siteMainElement, (0, _mainNavigation.createMainNavigation)(), 'afterbegin');
render(siteMainElement, (0, _filtersSort.createSortFilters)(), 'beforeend');
render(siteMainElement, (0, _filmsContainer.createFilmsContainer)(), 'beforeend');
var siteFooter = document.querySelector(SITE_ELEMENTS_SELECTORS.FOOTER);
render(siteFooter, (0, _footerStatistics.createFooterStatistics)(), 'beforeend');
var siteHeader = document.querySelector('.header');
render(siteHeader, (0, _headerProfileRating.createHeaderProfileRating)(), 'beforeend');
var siteFilms = document.querySelector(SITE_ELEMENTS_SELECTORS.FILMS);
render(siteFilms, (0, _filmsList.createFilmsList)(!isMovieExtra, 'All movies. Upcoming'), 'beforeend');
var siteFilmsList = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST);
render(siteFilms, (0, _filmsList.createFilmsList)(isMovieExtra, 'Top rated'), 'beforeend');
render(siteFilms, (0, _filmsList.createFilmsList)(isMovieExtra, 'Most commented'), 'beforeend');
var siteFilmExtraBlocks = document.querySelectorAll(SITE_ELEMENTS_SELECTORS.FILMS_LIST_EXTRA);
var siteFilmsListContainer = siteFilms.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
render(siteFilmsList, (0, _showMoreBtn.createShowMoreBtn)(), 'beforeend');

for (var i = 0; i < FILMS_COUNT; i++) {
  render(siteFilmsListContainer, (0, _filmCard.createFilmCard)(), 'afterbegin');
}

siteFilmExtraBlocks.forEach(function (siteFilmExtraBlock) {
  var siteFilmExtraContainer = siteFilmExtraBlock.querySelector(SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);

  for (var _i = 0; _i < 2; _i++) {
    render(siteFilmExtraContainer, (0, _filmCard.createFilmCard)(filmsList[_i]), 'beforeend');
  }
});
console.log(_task.dataStructure, 'dataStructure');