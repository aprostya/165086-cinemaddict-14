import dayjs from 'dayjs';
import {
  USER_RATING,
  RENDER_POSITION
} from '../consts';
import Abstract from '../view/abstract.js';

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
  container.insertAdjacentHTML(place, template);
};

const destroyElement = (element) => {
  element.remove();
};

const removeBodyScroll = () => {
  const body = document.querySelector('body');
  body.classList.remove('hide-overflow');
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);
  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const renderElement = (container, element, place = RENDER_POSITION.BEFORE_END) => {
  switch (place) {
    case RENDER_POSITION.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFORE_END:
      container.append(element);
      break;
  }
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
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
  render,
  destroyElement,
  randomDate,
  renderElement,
  renderTemplate,
  createElement,
  formatDate,
  formatTime,
  removeBodyScroll,
  updateItem,
  generateRandomValue,
  getRandom,
  remove,
  generateNewArray
};
