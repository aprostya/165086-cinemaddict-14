import {
  createElement
} from '../utils/utils';

const createSiteHeader = () => {
  return `<header class="header">
  <h1 class="header__logo logo">Cinemaddict</h1>
</header>`;
};

class HeaderComponent {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createSiteHeader();
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

export {HeaderComponent};


