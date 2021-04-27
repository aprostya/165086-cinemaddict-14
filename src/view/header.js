import AbstractView from './abstract';

const createSiteHeader = () => {
  return `<header class="header">
  <h1 class="header__logo logo">Cinemaddict</h1>
</header>`;
};

class HeaderComponentView extends AbstractView {
  constructor() {
    super();
  }
  getTemplate() {
    return createSiteHeader();
  }
}

export {
  HeaderComponentView
};
