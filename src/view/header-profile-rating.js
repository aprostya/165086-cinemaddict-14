import {countUserRating} from '../utils/utils';
export const createHeaderProfileRating = (countedFilms) => {
  return `<section class="header__profile profile">
  <p class="profile__rating">${countUserRating(countedFilms) || ''}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};
