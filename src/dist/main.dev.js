"use strict";

var _header = require("./view/header");

var _footer = require("./view/footer");

var _mainNavigation = require("./view/main-navigation");

var _filtersSort = require("./view/filters-sort");

var _footerStatistics = require("./view/footer-statistics");

var render = function render(container, template, place) {
  container && container.insertAdjacentHTML(place, template);
};

var siteBody = document.querySelector('body');
var siteMainElement = document.querySelector('.main');
var siteFooter = document.querySelector('.footer'); // const siteHeaderElement = document.querySelector('.header');

render(siteBody, (0, _header.createSiteHeader)(), 'afterbegin');
render(siteBody, (0, _footer.createSiteFooter)(), 'beforeend');
render(siteFooter, (0, _footerStatistics.createFooterStatistics)(), 'beforeend');
render(siteMainElement, (0, _mainNavigation.createMainNavigation)(), 'afterbegin');
render(siteMainElement, (0, _filtersSort.createSortFilters)(), 'beforeend');