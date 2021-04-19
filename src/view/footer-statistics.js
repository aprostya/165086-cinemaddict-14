import {
  createElement
} from '../utils/utils';

export const createFooterStatistics = () => {
  return `<section class="footer__statistics">
  <p>130 291 movies inside</p>
</section>`;
};

class FooterStatistics {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createFooterStatistics();
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

export{FooterStatistics};
