"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFilmCard = void 0;

var _utils = require("../utils/utils");

var createFilmCard = function createFilmCard(film) {
  var _film$film_info = film.film_info,
      title = _film$film_info.title,
      description = _film$film_info.description,
      poster = _film$film_info.poster,
      year = _film$film_info.release.date,
      rating = _film$film_info.total_rating,
      duration = _film$film_info.duration,
      genre = _film$film_info.genre,
      comments = film.comments;
  return "<article class=\"film-card\">\n  <h3 class=\"film-card__title\">".concat(title, "</h3>\n  <p class=\"film-card__rating\">").concat(rating, "</p>\n  <p class=\"film-card__info\">\n    <span class=\"film-card__year\">").concat((0, _utils.formatDate)(year), "</span>\n    <span class=\"film-card__duration\">").concat((0, _utils.formatTime)(duration).hours, "h ").concat((0, _utils.formatTime)(duration).minutes, "m</span>\n    <span class=\"film-card__genre\">").concat(genre[(0, _utils.getRandom)(1, genre.length - 1)], "</span>\n  </p>\n  <img src=\"").concat(poster, "\" alt=\"\" class=\"film-card__poster\">\n  <p class=\"film-card__description\">").concat(description, "</p>\n  <a class=\"film-card__comments\">").concat(comments.length, " comments</a>\n  <div class=\"film-card__controls\">\n    <button class=\"film-card__controls-item button film-card__controls-item--add-to-watchlist\" type=\"button\">Add to watchlist</button>\n    <button class=\"film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active\" type=\"button\">Mark as watched</button>\n    <button class=\"film-card__controls-item button film-card__controls-item--favorite\" type=\"button\">Mark as favorite</button>\n  </div>\n</article>\n");
};

exports.createFilmCard = createFilmCard;