import { RENDER_POSITION } from '../consts';
import {
  renderElement, replace, remove
} from '../utils/utils';
import {
  MainNavigation
} from '../view/main-navigation';
import {
  generateFilter
} from '../utils/filters';

// вынести на уровень main.js
export default class MainNavigationPresenter {
  constructor(container) {
    this._container = container;
    this._component = null;
  }

  init(films) {
    this._films = films;
    const prevComponent = this._component;
    this._component = new MainNavigation(generateFilter(this._films));
    if(prevComponent === null) {
      renderElement(this._container, this._component.getElement(), RENDER_POSITION.AFTER_BEGIN);
      return;
    }
    if (this._container.contains(prevComponent.getElement())) {
      replace(this._component, prevComponent);
    }
  }

  destroy() {
    remove(this._component);
  }
}
