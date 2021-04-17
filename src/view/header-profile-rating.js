import {countUserRating, createElement} from '../utils/utils';

const createHeaderProfileRating = (countedFilms) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${countUserRating(countedFilms) || ''}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

class HeaderProfileRating {
  constructor(userFilms) {
    this._element = null;
    this.userFilms = userFilms;
  }
  getTemplate() {
    return createHeaderProfileRating(this.userFilms);
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

export {HeaderProfileRating};
