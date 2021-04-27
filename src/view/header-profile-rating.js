import {
  countUserRating
} from '../utils/utils';
import AbstractView from './abstract';

const createHeaderProfileRating = (films) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${countUserRating(films) || ''}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

class HeaderProfileRatingView extends AbstractView {
  constructor(films) {
    super();
    this.films = films;
  }
  getTemplate() {
    return createHeaderProfileRating(this.films);
  }
}

export {
  HeaderProfileRatingView
};
