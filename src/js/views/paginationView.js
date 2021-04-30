import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1 and ther are other pages
    if (this._data.page === 1 && numPages > 1) {
      return (
        this._generateMarkupButton(this._data.page + 1, 'next', 'right') +
        `<h1>page ${numPages}</h1>`
      );
    }

    //last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButton(this._data.page - 1, 'prev', 'left');
    }
    //other page
    if (this._data.page > 1 && this._data.page < numPages) {
      return (
        this._generateMarkupButton(this._data.page + 1, 'next', 'right') +
        `<h1>page ${numPages}</h1>` +
        this._generateMarkupButton(this._data.page - 1, 'prev', 'left')
      );
    }

    //page 1 and no other pages
    return '';
  }

  _generateMarkupButton(page, type, directions) {
    return ` <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-${directions}"></use>
    </svg>
    <span>page ${page}</span>
    </button>`;
  }
}

export default new PaginationView();
