import {
  nanoid
} from 'nanoid';
import dayjs from 'dayjs';
import dayjsRandom from 'dayjs-random';
import {getRandomInt, randomDate, generateRandomValue, getRandom, generateNewArray} from '../utils/utils';

dayjs.extend(dayjsRandom);

const emotionsList = ['smile', 'sleeping', 'puke', 'angry'];
const randomDescription = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget', 'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis', 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const randomImage = ['sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg', 'made-for-each-other.png', 'popeye-meets-sinbad.png'];
const comment = ['disgusting', 'coool movie', 'fdsfsdf', 'ewrewrewr', 'rerewrewrewr'];
const names = ['Hernandez Drake', 'Duffy Velez', 'Ortega OsMan', 'Ocean Territory'];
const countries = ['Austria', 'Belize', 'Bahamas', 'Lithuania', 'Moldova', 'Norway'];
const titles = ['Afghanistan Samoa', 'Mister Pickles', 'Ortega Tillman', 'Ortega Bahrain'];
const genres = ['Drama', 'Comedy', 'Blockbuster', 'Tragedy', 'Horror'];

const data = {
  films: [],
};

const comments = () => {
  return {
    id: nanoid(),
    comment: generateRandomValue(comment),
    date: randomDate(),
    emotion: generateRandomValue(emotionsList),
    author: generateRandomValue(names),
    message: '',
  };
};

const commentsMockArray = () => generateNewArray([], comments, getRandom(1, 5));
const filmInfo = () => {
  return {
    id: nanoid(),
    film_info: {
      title: generateRandomValue(titles),
      alternative_title: generateRandomValue(titles),
      total_rating: getRandom(1.1, 10.9), //Любое число в диапазоне 1/10 можно и дробное
      poster: `images/posters/${generateRandomValue(randomImage)}`,
      age_rating: getRandomInt(3, 18), //Число в диапазоне от 3 до 18
      production_date: randomDate(),
      directors: names,
      isFavorite: Boolean(getRandom()),
      isWatched: Boolean(getRandom()),
      isArchived: Boolean(getRandom()),
      isTopRated: Boolean(getRandom()),
      isTopCommented: Boolean(getRandom()),
      writers: [
        'Takeshi Kitano',
        'Morgan Freeman',
        'Mr pickles',
        'Qwerty',
      ],
      actors: [
        'Morgan Freeman',
        'Mr pickles',
        'Qwerty',
      ],
      release: {
        date: randomDate(),
        release_country: generateRandomValue(countries),
      },
      duration: '2003-11-21T01:11:11Z',
      genre: genres,
      description: generateRandomValue(randomDescription),
    },
    user_details: {
      watchlist: Boolean(getRandom()),
      already_watched: Boolean(getRandom()),
      watching_date: randomDate(),
      favorite: Boolean(getRandom()),
    },
    comments: commentsMockArray(),
  };
};

const filmsMockArray = generateNewArray(data.films, filmInfo, 20);

export {
  filmsMockArray
};
