import dayjs from 'dayjs';
import {
  SITE_ELEMENTS_SELECTORS,
  USER_RATING,
  RENDER_POSITION
} from '../consts';

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
  if (watchedMovies >= 1 && watchedMovies <= 10) {
    return USER_RATING.JUNIOR;
  }
  if (watchedMovies >= 11 && watchedMovies <= 20) {
    return USER_RATING.MIDDLE;
  }
  if (watchedMovies >= 21) {
    return USER_RATING.SENIOR;
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
  const modal = document.querySelector(SITE_ELEMENTS_SELECTORS.FILM_POPUP);
  const body = document.querySelector('body');
  const closeBtn = document.querySelector(SITE_ELEMENTS_SELECTORS.FILM_POPUP_CLOSE_BTN);
  closeBtn && closeBtn.addEventListener('click', () => {
    body.classList.remove('hide-overflow');
    destroyElement(modal);
  });
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RENDER_POSITION.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFORE_END:
      container.append(element);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  container && container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const formatTime = (value) => {
  const time = {
    hours: dayjs(value).format('H'),
    minutes: dayjs(value).format('mm'),
  };
  return time;
};

export {
  getRandomInt,
  countUserRating,
  openPopup,
  render,
  destroyElement,
  randomDate,
  renderElement,
  renderTemplate,
  createElement,
  formatDate,
  formatTime,
  generateRandomValue,
  getRandom,
  generateNewArray
};
