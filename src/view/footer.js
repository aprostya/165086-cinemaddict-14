import {
  createElement
} from '../utils/utils';

export const createSiteFooter = () => {
  return `<footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
</footer>`;
};

class FooterComponent {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createSiteFooter();
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

export {FooterComponent};
