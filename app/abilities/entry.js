import Ember from 'ember';
import { Ability } from 'ember-can';
import SessionTokenDecoder from '../mixins/session-token-decoder';

const {
  get, computed, computed: { alias, empty },
  isNone, assert, typeOf
} = Ember;

export default Ability.extend(SessionTokenDecoder, {
  canCreate: empty('sessionToken.entryId'),
  canDelete: alias('canEdit'),

  canEdit: computed('sessionToken.entryId', 'model.id', {
    get() {
      let sessionEntryId = get(this, 'sessionToken.entryId');
      assert('sessionToken.entryId must be a string',
        isNone(sessionEntryId) || typeOf(sessionEntryId) === 'string');
      return sessionEntryId === get(this, 'model.id');
    }
  })
});
