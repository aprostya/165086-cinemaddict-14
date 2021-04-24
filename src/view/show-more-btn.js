import AbstractView from './abstract';

const createShowMoreBtn = () => {
  return `<button class="films-list__show-more">
  Show more</button>`;
};

class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreBtn();
  }
  _clickHandler(event) {
    event.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}

export {
  ShowMoreButton
};
