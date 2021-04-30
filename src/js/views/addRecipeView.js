import icons from 'url:../../img/icons.svg';
import View from './View.js';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = 'Your recipe is uploaded seccessfully';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpdate = document.querySelector('.upload__btn');

  constructor() {
    super();
    this._addhandlerOpenAddRecipeWindow();
    this._addhandlerCloseAddRecipeWindow();
  }

  toggleWindow() {
    console.log('check');
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addhandlerOpenAddRecipeWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addhandlerCloseAddRecipeWindow() {
    [this._btnClose, this._overlay].forEach(btn =>
      btn.addEventListener('click', this.toggleWindow.bind(this))
    );
  }

  addhandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  uploadRecipe(newRecipe) {}

  _generateMarkup() {}
}

export default new AddRecipeView();
