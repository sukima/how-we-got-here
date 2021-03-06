import Ember from 'ember';
import { POSTLUDE } from '../../utils/preludes';

const {
  Controller, get, isBlank,
  computed, computed: { sort, empty },
  inject: { service }
} = Ember;

const NullEntryModel = Ember.Object.extend({
  id: 'record-not-found'
});

export default Controller.extend({
  auth: service(),
  store: service(),

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
  }),

  myEntry: computed('auth.tokenData.entryId', 'model.@each.id', {
    get() {
      let myEntryId = get(this, 'auth.tokenData.entryId');
      if (isBlank(myEntryId)) {
        return NullEntryModel.create();
      }
      return get(this, 'model').findBy('id', myEntryId);
    }
  })
});
