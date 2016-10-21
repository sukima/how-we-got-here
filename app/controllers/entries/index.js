import Ember from 'ember';
import { POSTLUDE } from '../../utils/preludes';

const {
  Controller, get, isBlank,
  computed, computed: { sort, empty }
} = Ember;

export default Controller.extend({
  postlude: POSTLUDE,
  queryParams: ['query'],
  sortingBy: ['createdAt:desc'],
  entries: sort('filtered', 'sortingBy'),
  hideSearch: empty('query'),
  filtered: computed('model', 'query', function () {
    let entries = get(this, 'model');
    let query = get(this, 'query');
    if (isBlank(query) || query.length < 3) {
      return entries;
    }
    return entries.filter(entry => entry.hasTerm(query));
  })
});
