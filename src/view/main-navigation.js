import {
  createElement,
  isElementExist
} from '../utils/utils';

const createSiteMenuTemplate = (filteredFilms) => {
  const findFavoriteFilter = filteredFilms.find((filter) => filter.name === 'favorites');
  const findHistoryFilter = filteredFilms.find((filter) => filter.name === 'history');
  const findWatchListFilter = filteredFilms.find((filter) => filter.name === 'watch');
  const {
    count: favoriteFilmsCount,
  } = findFavoriteFilter;
  const {
    count: historyFilmsCount,
  } = findHistoryFilter;
  const {
    count: watchListFilmsCount,
  } = findWatchListFilter;
  return `<nav class="main-navigation">
 <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchList" class="main-navigation__item">WatchList ${isElementExist(watchListFilmsCount) > 0 ? `<span class="main-navigation__item-count">${watchListFilmsCount}</span>` : ''}</a>
     <a href="#history" class="main-navigation__item">History ${isElementExist(historyFilmsCount) > 0 ? `<span class="main-navigation__item-count">${historyFilmsCount}</span>` : ''}</a>
   <a href="#favorites" class="main-navigation__item">Favorites ${isElementExist(favoriteFilmsCount) > 0 ? `<span class="main-navigation__item-count">${favoriteFilmsCount}</span>` : ''}</a>
  </div>
   <a href="#stats" class="main-navigation__additional">Stats</a>
 </nav>`;
};

class MainNavigation {
  constructor(films) {
    this._element = null;
    this.films = films;
  }
  getTemplate() {
    return createSiteMenuTemplate(this.films);
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

export {MainNavigation};

