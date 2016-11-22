import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  get, computed, computed: { reads, empty },
  isNone, assert, typeOf, inject: { service }
} = Ember;

export default Ability.extend({
  auth: service(),

  canCreate: empty('auth.tokenData.entryId'),
  canDelete: reads('canEdit'),

  canEdit: computed('auth.tokenData.entryId', 'model.id', {
    get() {
      let sessionEntryId = get(this, 'auth.tokenData.entryId');
      assert('auth.tokenData.entryId must be a string',
        isNone(sessionEntryId) || typeOf(sessionEntryId) === 'string');
      return sessionEntryId === get(this, 'model.id');
    }
  })
});
