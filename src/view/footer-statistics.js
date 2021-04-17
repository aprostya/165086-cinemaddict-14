import {
  createElement
} from '../utils/utils';

export const createFooterStatistics = (totalFilms) => {
  const showTotalFilms = totalFilms > 0 ? `${totalFilms} movies inside`:'';
  return `<section class="footer__statistics">
  <p>${showTotalFilms}</p>
</section>`;
};

class FooterStatistics {
  constructor(totalFilms) {
    this._element = null;
    this.totalFilms = totalFilms;
  }
  getTemplate() {
    return createFooterStatistics(this.totalFilms);
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
