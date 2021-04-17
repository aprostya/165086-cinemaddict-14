"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSiteElements = void 0;

var _utils = require("./utils/utils");

var _footer = require("./view/footer");

var _mainNavigation = require("./view/main-navigation");

var _header = require("./view/header");

var _filtersSort = require("./view/filters-sort");

var _footerStatistics = require("./view/footer-statistics");

var _headerProfileRating = require("./view/header-profile-rating");

var _filmsContainer = require("./view/films-container");

var _filmsList = require("./view/films-list");

var _filters = require("../src/utils/filters");

var _task = require("../src/mock/task");

var _showMoreBtn = require("./view/show-more-btn");

var _filmCard = require("./view/film-card");

var _popup = require("./view/popup/popup");

var _consts = require("./consts");

// рендер элементов страницы
var renderSiteElements = function renderSiteElements() {
  var siteBody = document.querySelector(_consts.SITE_ELEMENTS_SELECTORS.BODY);
  var siteMainElement = document.querySelector(_consts.SITE_ELEMENTS_SELECTORS.MAIN);
  var isMovieExtra = true;
  var siteFooter = document.querySelector(_consts.SITE_ELEMENTS_SELECTORS.FOOTER);
  var generateFilmFilters = (0, _filters.generateFilter)(_task.filmsMockArray.films);
  (0, _utils.renderTemplate)(siteFooter, (0, _footerStatistics.createFooterStatistics)(), 'beforeend');
  (0, _utils.renderElement)(siteBody, new _header.HeaderComponent().getElement(), _consts.RENDER_POSITION.AFTER_BEGIN);
  (0, _utils.renderElement)(siteBody, new _footer.FooterComponent().getElement(), _consts.RENDER_POSITION.BEFORE_END);
  (0, _utils.renderElement)(siteMainElement, new _mainNavigation.MainNavigation(generateFilmFilters).getElement(), _consts.RENDER_POSITION.AFTER_BEGIN);
  (0, _utils.renderTemplate)(siteMainElement, (0, _filtersSort.createSortFilters)(), 'beforeend');
  (0, _utils.renderTemplate)(siteMainElement, (0, _filmsContainer.createFilmsContainer)(), 'beforeend');
  var siteHeader = document.querySelector('.header');
  (0, _utils.renderTemplate)(siteHeader, (0, _headerProfileRating.createHeaderProfileRating)(_task.filmsMockArray.user_details.already_watched), 'beforeend');
  var siteFilms = document.querySelector(_consts.SITE_ELEMENTS_SELECTORS.FILMS);
  (0, _utils.renderTemplate)(siteFilms, (0, _filmsList.createFilmsList)(!isMovieExtra, 'All movies. Upcoming'), 'beforeend');
  var TASK_COUNT_PER_STEP = 5;
  var siteFilmsListContainer = siteFilms.querySelector(_consts.SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
  var siteFilmsList = siteFilms.querySelector(_consts.SITE_ELEMENTS_SELECTORS.FILMS_LIST); // логика рендера и открытия попапа и отрисовка данных для карточки фильма

  var _loop = function _loop(i) {
    var filmCard = (0, _filmCard.createFilmCard)(_task.filmsMockArray.films[i]);
    (0, _utils.renderTemplate)(siteFilmsListContainer, filmCard, 'afterbegin');

    var renderPopup = function renderPopup() {
      (0, _utils.renderTemplate)(siteBody, (0, _popup.popup)(_task.filmsMockArray.films[i]), 'beforeend');
    };

    var createdFilmCard = document.querySelector('.film-card');
    createdFilmCard.addEventListener('click', function () {
      (0, _utils.openPopup)(renderPopup());
    });
  };

  for (var i = 0; i < Math.min(_task.filmsMockArray.films.length, TASK_COUNT_PER_STEP); i++) {
    _loop(i);
  } //логика показа фильмов для кнопки loadMoreButton


  if (_task.filmsMockArray.films.length > TASK_COUNT_PER_STEP) {
    var renderedTaskCount = TASK_COUNT_PER_STEP;
    (0, _utils.renderTemplate)(siteFilmsList, (0, _showMoreBtn.createShowMoreBtn)(), 'beforeend');
    var loadMoreButton = siteFilmsList.querySelector('.films-list__show-more');
    loadMoreButton.addEventListener('click', function (evt) {
      evt.preventDefault();

      _task.filmsMockArray.films.slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP).forEach(function (task) {
        return (0, _utils.render)(siteFilmsListContainer, (0, _filmCard.createFilmCard)(task), 'beforeend');
      });

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= _task.filmsMockArray.films.length) {
        loadMoreButton.remove();
      }
    });
  } //todo можно ли как-то сделать одну общую функцию для compareTotalRating и compareTotalComments,
  // просто брать другие значения у a и b ?


  var compareTotalRating = function compareTotalRating(a, b) {
    if (a.film_info.total_rating < b.film_info.total_rating) {
      return 1;
    }

    if (a.film_info.total_rating > b.film_info.total_rating) {
      return -1;
    }

    return 0;
  };

  var compareTotalComments = function compareTotalComments(a, b) {
    if (a.comments.length < b.comments.length) {
      return 1;
    }

    if (a.comments.length > b.comments.length) {
      return -1;
    }

    return 0;
  };

  var topRatedFilms = _task.filmsMockArray.films.sort(compareTotalRating).slice(0, 2);

  var topCommentedFilms = _task.filmsMockArray.films.sort(compareTotalComments).slice(0, 2); //todo стоит ли ифы для topRatedFilms и topCommentedFilms объединять в одну функцию?


  if (topRatedFilms.length > 0) {
    (0, _utils.renderTemplate)(siteFilms, (0, _filmsList.createFilmsList)(isMovieExtra, 'Top rated', 'film-list--top-rated'), 'beforeend');

    for (var _i = 0; _i < topRatedFilms.length; _i++) {
      var topRatedBlock = document.querySelector('.film-list--top-rated');
      var topRatedBlockContainer = topRatedBlock.querySelector(_consts.SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      (0, _utils.renderTemplate)(topRatedBlockContainer, (0, _filmCard.createFilmCard)(topRatedFilms[_i]), 'beforeend');
    }
  }

  if (topCommentedFilms.length > 0) {
    (0, _utils.renderTemplate)(siteFilms, (0, _filmsList.createFilmsList)(isMovieExtra, 'Most commented', 'film-list--top-commented'), 'beforeend');

    for (var _i2 = 0; _i2 < topRatedFilms.length; _i2++) {
      var topCommentedBlock = document.querySelector('.film-list--top-commented');
      var topCommentedBlockContainer = topCommentedBlock.querySelector(_consts.SITE_ELEMENTS_SELECTORS.FILMS_LIST_CONTAINER);
      (0, _utils.renderTemplate)(topCommentedBlockContainer, (0, _filmCard.createFilmCard)(topCommentedFilms[_i2]), 'beforeend');
    }
  }
};

exports.renderSiteElements = renderSiteElements;