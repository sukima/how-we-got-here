import Ember from 'ember';
import { task } from 'ember-concurrency';
import EntryValidations from '../../validations/entry';
import NewEntryValidations from '../../validations/new-entry';
import validateUniqueHash from '../../validators/validate-unique-hash';

const {
  Controller, getProperties, assign,
  computed, computed: { reads }
} = Ember;

export default Controller.extend({
  entryValidations: computed('emailHashes', {
    get() {
      let validations = assign({}, EntryValidations, NewEntryValidations);
      let uniqueHash = validateUniqueHash(getProperties(this, 'emailHashes'));
      validations.email.push(uniqueHash);
      return validations;
    }
  }),

  error: reads('save.last.error'),
  saving: reads('save.isRunning'),

  save: task(function * (changeset) {
    let model = yield changeset.save();
    yield this.transitionToRoute('login.verify', model);
  }).drop(),

  actions: {
    cancel() {
      this.transitionToRoute('entries.index');
    }
  }
});
