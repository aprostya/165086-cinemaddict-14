import AbstractView from './abstract';

export const createFooterStatistics = (films) => {
  const showTotalFilms = films > 0 ? `${films} movies inside` : '';
  return `<section class="footer__statistics">
  <p>${showTotalFilms}</p>
</section>`;
};

class FooterStatisticsView extends AbstractView {
  constructor(films) {
    super();
    this.films = films;
  }
  getTemplate() {
    return createFooterStatistics(this.films);
  }
}

export {
  FooterStatisticsView
};
