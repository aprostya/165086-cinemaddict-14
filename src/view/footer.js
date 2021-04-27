import AbstractView from './abstract';


export const createSiteFooter = () => {
  return `<footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
</footer>`;
};

class FooterComponentView extends AbstractView {
  constructor() {
    super();
  }
  getTemplate() {
    return createSiteFooter();
  }

}

export {
  FooterComponentView
};
