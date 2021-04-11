"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filmsMockArray = void 0;

var _nanoid = require("nanoid");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _dayjsRandom = _interopRequireDefault(require("dayjs-random"));

var _utils = require("../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Название фильма. Можно взять с постеров, а можете взять из списка своих любимых фильмов. Пока это не важно;
// Постер (название файла). Один из набора файлов в директории /public/images/posters;
// Описание. От 1 до 5 случайных предложений из текста: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.
// Комментарии. От 0 до 5 штук;
// Обратите внимание, комментарии — это отдельная структура данных с эмоцией, датой, автором и сообщением, а не просто массив строк в структуре фильма.
// Остальные данные ограничьте самостоятельно. Что ещё должно быть в структуре, можно узнать из технического задания.
_dayjs["default"].extend(_dayjsRandom["default"]);

var emotionsList = ['smile', 'sleeping', 'puke', 'angry'];
var randomDescription = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
var randomImage = ['sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg', 'made-for-each-other.png', 'popeye-meets-sinbad.png'];
var comment = ['disgusting', 'coool movie', 'fdsfsdf', 'ewrewrewr', 'rerewrewrewr'];
var names = ['Hernandez Drake', 'Duffy Velez', 'Ortega OsMan', 'Ocean Territory'];
var countries = ['Austria', 'Belize', 'Bahamas', 'Lithuania', 'Moldova', 'Norway'];
var titles = ['Afghanistan Samoa', 'Mister Pickles', 'Ortega Tillman', 'Ortega Bahrain'];
var genres = ['Drama', 'Comedy', 'Blockbuster', 'Tragedy', 'Horror'];
console.log(names);
var data = {
  films: []
};

var comments = function comments() {
  return {
    id: (0, _nanoid.nanoid)(),
    comment: (0, _utils.generateRandomValue)(comment),
    date: (0, _utils.randomDate)(),
    emotion: (0, _utils.generateRandomValue)(emotionsList),
    author: (0, _utils.generateRandomValue)(names),
    message: ''
  };
};

var commentsMockArray = function commentsMockArray() {
  return (0, _utils.generateNewArray)([], comments, (0, _utils.getRandom)(1, 5));
};

var filmInfo = function filmInfo() {
  return {
    id: (0, _nanoid.nanoid)(),
    film_info: {
      title: (0, _utils.generateRandomValue)(titles),
      alternative_title: (0, _utils.generateRandomValue)(titles),
      total_rating: (0, _utils.getRandom)(1.1, 10.9),
      //Любое число в диапазоне 1/10 можно и дробное
      poster: "images/posters/".concat((0, _utils.generateRandomValue)(randomImage)),
      age_rating: (0, _utils.getRandomInt)(3, 18),
      //Число в диапазоне от 3 до 18
      production_date: (0, _utils.randomDate)(),
      directors: names,
      isFavorite: Boolean((0, _utils.getRandom)()),
      isTopRated: Boolean((0, _utils.getRandom)()),
      writers: ['Takeshi Kitano', 'Morgan Freeman', 'Mr pickles', 'Qwerty'],
      actors: ['Morgan Freeman', 'Mr pickles', 'Qwerty'],
      release: {
        date: (0, _utils.randomDate)(),
        release_country: (0, _utils.generateRandomValue)(countries)
      },
      duration: '2003-11-21T01:11:11Z',
      genre: genres,
      description: (0, _utils.generateRandomValue)(randomDescription)
    },
    user_details: {
      watchlist: Boolean((0, _utils.getRandom)()),
      already_watched: Boolean((0, _utils.getRandom)()),
      watching_date: (0, _utils.randomDate)(),
      favorite: Boolean((0, _utils.getRandom)())
    },
    comments: commentsMockArray()
  };
};

var filmsMockArray = (0, _utils.generateNewArray)(data.films, filmInfo, 5);
exports.filmsMockArray = filmsMockArray;