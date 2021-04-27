import AbstractView from './abstract';

export const createFilmsContainer = () => {
  return `<section class="films">
</section>`;
};

class FilmsContainerView extends AbstractView {
  constructor() {
    super();
  }
  getTemplate() {
    return createFilmsContainer();
  }
}

export {
  FilmsContainerView
};
