import dayjs from 'dayjs';
import {formatDate} from '../../utils/utils';
export const comment = (comments) => {
  return (`<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${comments.emotion}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${comments.comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${comments.author}</span>
      <span class="film-details__comment-day">${formatDate(comments.date, 'DD/MM/YYYY')} ${dayjs(comments.date).format('HH:mm')}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`);
};
