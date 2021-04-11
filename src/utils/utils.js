import dayjs from 'dayjs';

const generateNewArray = (array, item, times) => {
  for (let i = 0; i < times; i++) {
    array.push(item());
  }
  return array;
};

const getRandom = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomValue = (items) => {
  const randomIndex = getRandom(0, items.length - 1);
  return items[randomIndex];
};

const randomDate = (start = '1995-12-17T03:24:00', end = '2007-12-17T03:24:00') => {
  const middleDate = dayjs.between(start, end);
  return middleDate;
};

const getRandomInt = (a = 1, b = 0) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const countUserRating = (watchedMovies) => {
  if(watchedMovies >= 1 && watchedMovies <= 10) {
    return 'novice';
  }
  if(watchedMovies >= 11 && watchedMovies <=20) {
    return 'fan';
  }
  if(watchedMovies > 21) {
    return 'movie buff';
  }
};

const formatDate = (date, format = 'YYYY') => {
  return dayjs(date).format(format);
};

const render = (container, template, place) => {
  container && container.insertAdjacentHTML(place, template);
};

const destroyElement = (element) => {
  element.remove();
};

const openPopup = () => {
  const modal = document.querySelector('.film-details');
  const closeBtn = document.querySelector('.film-details__close-btn');
  closeBtn && closeBtn.addEventListener('click', () => destroyElement(modal));
};

const formatTime = (value) => {
  const time = {
    hours: dayjs(value).format('H'),
    minutes: dayjs(value).format('mm'),
  };
  return time;
};

export {getRandomInt, countUserRating,  openPopup, render, destroyElement, randomDate, formatDate, formatTime, generateRandomValue, getRandom, generateNewArray};
