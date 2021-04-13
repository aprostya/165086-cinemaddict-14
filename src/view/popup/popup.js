import {
  popupBottomContainer
} from './film-details-bottom-container';
import {
  popupControls
} from './fim-details-controls';
import {formatDate, formatTime} from '../../utils/utils';

export const popup = (film) => {
  const {
    film_info: {
      title,
      description,
      poster,
      directors,
      alternative_title,
      age_rating,
      actors,
      writers,
      release: {
        date,
        release_country,
      },
      total_rating: rating,
      duration,
      genre: genres,
    },
    comments,
  } = film;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">
          <p class="film-details__age">${age_rating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternative_title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${directors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${formatDate(date, 'DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${formatTime(duration).hours}h ${formatTime(duration).minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
              ${genres.map((genre) => {return`<span class="film-details__genre">${genre}</span>`;}).join('')}
            </tr>
          </table>
          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>
     ${popupControls()}
    </div>
    ${popupBottomContainer(comments)}
  </form>
</section>`;
};
