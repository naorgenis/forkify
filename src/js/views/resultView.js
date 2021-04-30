import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

import View from './View.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No recpies found, please try again`;
  _message = '';

  _generateMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}
export default new ResultView();
