"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popup = void 0;

var _filmDetailsBottomContainer = require("./film-details-bottom-container");

var _fimDetailsControls = require("./fim-details-controls");

var _utils = require("../../utils/utils");

var _abstract = _interopRequireDefault(require("../abstract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createPopup = function createPopup(film) {
  var _film$film_info = film.film_info,
      title = _film$film_info.title,
      description = _film$film_info.description,
      poster = _film$film_info.poster,
      directors = _film$film_info.directors,
      alternative_title = _film$film_info.alternative_title,
      age_rating = _film$film_info.age_rating,
      actors = _film$film_info.actors,
      writers = _film$film_info.writers,
      _film$film_info$relea = _film$film_info.release,
      date = _film$film_info$relea.date,
      release_country = _film$film_info$relea.release_country,
      rating = _film$film_info.total_rating,
      duration = _film$film_info.duration,
      genres = _film$film_info.genre,
      comments = film.comments;
  return "<section class=\"film-details\">\n  <form class=\"film-details__inner\" action=\"\" method=\"get\">\n    <div class=\"film-details__top-container\">\n      <div class=\"film-details__close\">\n        <button class=\"film-details__close-btn\" type=\"button\">close</button>\n      </div>\n      <div class=\"film-details__info-wrap\">\n        <div class=\"film-details__poster\">\n          <img class=\"film-details__poster-img\" src=\"".concat(poster, "\" alt=\"\">\n          <p class=\"film-details__age\">").concat(age_rating, "+</p>\n        </div>\n        <div class=\"film-details__info\">\n          <div class=\"film-details__info-head\">\n            <div class=\"film-details__title-wrap\">\n              <h3 class=\"film-details__title\">").concat(title, "</h3>\n              <p class=\"film-details__title-original\">").concat(alternative_title, "</p>\n            </div>\n\n            <div class=\"film-details__rating\">\n              <p class=\"film-details__total-rating\">").concat(rating, "</p>\n            </div>\n          </div>\n          <table class=\"film-details__table\">\n            <tr class=\"film-details__row\">\n              <td class=\"film-details__term\">Director</td>\n              <td class=\"film-details__cell\">").concat(directors, "</td>\n            </tr>\n            <tr class=\"film-details__row\">\n              <td class=\"film-details__term\">Writers</td>\n              <td class=\"film-details__cell\">").concat(writers, "</td>\n            </tr>\n            <tr class=\"film-details__row\">\n              <td class=\"film-details__term\">Actors</td>\n              <td class=\"film-details__cell\">").concat(actors, "</td>\n            </tr>\n            <tr class=\"film-details__row\">\n              <td class=\"film-details__term\">Release Date</td>\n              <td class=\"film-details__cell\">").concat((0, _utils.formatDate)(date, 'DD MMMM YYYY'), "</td>\n            </tr>\n            <tr class=\"film-details__row\">\n              <td class=\"film-details__term\">Runtime</td>\n              <td class=\"film-details__cell\">").concat((0, _utils.formatTime)(duration).hours, "h ").concat((0, _utils.formatTime)(duration).minutes, "m</td>\n            </tr>\n            <tr class=\"film-details__row\">\n              <td class=\"film-details__term\">Country</td>\n              <td class=\"film-details__cell\">").concat(release_country, "</td>\n            </tr>\n            <tr class=\"film-details__row\">\n              <td class=\"film-details__term\">Genres</td>\n              <td class=\"film-details__cell\">\n              ").concat(genres.map(function (genre) {
    return "<span class=\"film-details__genre\">".concat(genre, "</span>");
  }).join(''), "\n            </tr>\n          </table>\n          <p class=\"film-details__film-description\">\n            ").concat(description, "\n          </p>\n        </div>\n      </div>\n     ").concat((0, _fimDetailsControls.popupControls)(), "\n    </div>\n    ").concat((0, _filmDetailsBottomContainer.popupBottomContainer)(comments), "\n  </form>\n</section>");
};

var Popup =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(Popup, _AbstractView);

  function Popup(film) {
    var _this;

    _classCallCheck(this, Popup);

    _this._element = null;
    _this.film = film;
    return _possibleConstructorReturn(_this);
  }

  _createClass(Popup, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createPopup(this.film);
    }
  }, {
    key: "getElement",
    value: function getElement() {
      if (!this._element) {
        this._element = (0, _utils.createElement)(this.getTemplate());
      }

      return this._element;
    }
  }, {
    key: "removeElement",
    value: function removeElement() {
      this._element = null;
    }
  }]);

  return Popup;
}(_abstract["default"]);

exports.Popup = Popup;