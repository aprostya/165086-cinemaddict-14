import AbstractView from './abstract';

export const createFooterStatistics = (totalFilms) => {
  const showTotalFilms = totalFilms > 0 ? `${totalFilms} movies inside` : '';
  return `<section class="footer__statistics">
  <p>${showTotalFilms}</p>
</section>`;
};

class FooterStatistics extends AbstractView {
  constructor(totalFilms) {
    super();
    this.totalFilms = totalFilms;
  }
  getTemplate() {
    return createFooterStatistics(this.totalFilms);
  }
}

export {
  FooterStatistics
};
