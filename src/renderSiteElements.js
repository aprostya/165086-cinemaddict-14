import FilmsPresenter from './presenter/films';
import {
  filmsMockArray
} from './mock/task';
import {
  FooterStatisticsView
} from './view/footer-statistics';
import {
  FooterComponentView
} from './view/footer';
import {
  HeaderProfileRatingView
} from './view/header-profile-rating';
import {
  renderElement
} from './utils/utils';
import {
  SITE_ELEMENTS_SELECTORS,
  RENDER_POSITION
} from './consts';
import {
  HeaderComponentView
} from './view/header';

const siteBody = document.querySelector(SITE_ELEMENTS_SELECTORS.BODY);
const siteMainElement = document.querySelector(SITE_ELEMENTS_SELECTORS.MAIN);
const footerStatisticsComponent = new FooterStatisticsView();
const footerComponent = new FooterComponentView();
const headerComponent = new HeaderComponentView();

export const renderSiteElements = () => {
  const filmsPresenter = new FilmsPresenter(siteMainElement);
  filmsPresenter.init(filmsMockArray);
  renderElement(siteBody, footerComponent.getElement());
  renderElement(footerComponent.getElement(), footerStatisticsComponent.getElement());
  renderElement(siteBody, headerComponent.getElement(), RENDER_POSITION.AFTER_BEGIN);
  renderElement(headerComponent.getElement(), new HeaderProfileRatingView(filmsMockArray.user_details.already_watched).getElement());
};
