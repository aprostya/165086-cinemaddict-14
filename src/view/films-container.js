import AbstractView from './abstract';

export const createFilmsContainer = () => {
  return `<section class="films">
</section>`;
};

class FilmsContainer extends AbstractView {
  constructor() {
    super();
  }
  getTemplate() {
    return createFilmsContainer();
  }
}

export {
  FilmsContainer
};
