import AbstractView from './abstract';

const createShowMoreBtn = () => {
  return `<button class="films-list__show-more">
  Show more</button>`;
};

class ShowMoreButton extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createShowMoreBtn();
  }
}

export {
  ShowMoreButton
};
