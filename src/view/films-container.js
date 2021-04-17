import {
  createElement
} from '../utils/utils';

export const createFilmsContainer = () => {
  return `<section class="films">
</section>`;
};

class FilmsContainer {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createFilmsContainer();
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

export{FilmsContainer};
