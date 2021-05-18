const SITE_ELEMENTS_SELECTORS = {
  BODY: 'body',
  MAIN: '.main',
  HEADER: '.header',
  FOOTER: '.footer',
  FILMS: '.films',
  FILMS_LIST: '.films-list',
  FILM_BLOCK_TOP_RATED: 'film-list--top-rated',
  FILMS_BLOCK_TOP_COMMENT: 'film-list--top-commented',
  FILMS_LIST_EXTRA: '.films-list--extra',
  FILMS_LIST_CONTAINER: '.films-list__container',
  FILM_POPUP: '.film-details',
  FILM_POPUP_CLOSE_BTN: '.film-details__close-btn',
  SHOW_MORE_BTN: '.films-list__show-more',
  FILM_POSTER: '.film-card__poster',
};

const SITE_TITLES = {
  DEFAULT: 'All movies. Upcoming',
  EXTRA_BLOCKS: {
    TOP: 'Top rated',
    COMMENTS: 'Most commented',
  },
};

const RENDER_POSITION = {
  AFTER_BEGIN : 'afterbegin',
  BEFORE_END: 'beforeend',
};

const USER_RATING = {
  JUNIOR: 'novice',
  MIDDLE: 'fan',
  SENIOR: 'movie buff',
};

export {
  SITE_ELEMENTS_SELECTORS,
  USER_RATING,
  RENDER_POSITION,
  SITE_TITLES
};
