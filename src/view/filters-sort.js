import {
  createElement
} from '../utils/utils';

export const createSortFilters = () => {
  return `
  <ul class="sort">
    <li><a href="#" class="sort__button">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button--active">Sort by rating</a></li>
  </ul>`;
};

class SortFilmsComponent {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createSortFilters();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {SortFilmsComponent};
