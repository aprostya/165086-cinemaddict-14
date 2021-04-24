"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowMoreButton = void 0;

var _abstract = _interopRequireDefault(require("./abstract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createShowMoreBtn = function createShowMoreBtn() {
  return "<button class=\"films-list__show-more\">\n  Show more</button>";
};

var ShowMoreButton =
/*#__PURE__*/
function (_AbstractView) {
  _inherits(ShowMoreButton, _AbstractView);

  function ShowMoreButton() {
    var _this;

    _classCallCheck(this, ShowMoreButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShowMoreButton).call(this));
    _this._clickHandler = _this._clickHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ShowMoreButton, [{
    key: "getTemplate",
    value: function getTemplate() {
      return createShowMoreBtn();
    }
  }, {
    key: "_clickHandler",
    value: function _clickHandler(event) {
      event.preventDefault();

      this._callback.click();
    }
  }, {
    key: "setClickHandler",
    value: function setClickHandler(callback) {
      console.log(callback);
      this._callback.click = callback;
      this.getElement().addEventListener('click', this._clickHandler);
    }
  }]);

  return ShowMoreButton;
}(_abstract["default"]);

exports.ShowMoreButton = ShowMoreButton;