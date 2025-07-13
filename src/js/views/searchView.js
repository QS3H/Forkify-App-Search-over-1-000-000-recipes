import { debounce } from '../helpers.js';
import { DEBOUNCE_DELAY } from '../config.js';

class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });

    // Add debounced search for real-time suggestions
    const debouncedHandler = debounce(handler, DEBOUNCE_DELAY);
    this._parentEl
      .querySelector('.search__field')
      .addEventListener('input', debouncedHandler);
  }
}

export default new SearchView();
