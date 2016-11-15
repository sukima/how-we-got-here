import Ember from 'ember';
import { task } from 'ember-concurrency';
import { validatePresence, validateFormat } from 'ember-changeset-validations/validators';
import EntryValidations from '../../validations/entry';
import validateUniqueHash from '../../validators/validate-unique-hash';

const {
  Controller, get, set, getProperties, assign,
  computed, computed: { alias, mapBy }
} = Ember;

export default Controller.extend({
  entryValidations: computed('emailHashes', {
    get() {
      return assign({}, EntryValidations, {
        email: [
          validatePresence(true),
          validateFormat({type: 'email'}),
          validateUniqueHash(getProperties(this, 'emailHashes'))
        ]
      });
    }
  }),

  error: alias('save.last.error'),
  saving: alias('save.isRunning'),

  emailHashes: mapBy('entries', 'emailHash'),

  save: task(function * (model) {
    set(model, 'createdAt', new Date());
    let result = yield model.save();
    if (get(model, 'isValid')) {
      this.transitionToRoute('entries');
    }
  }).drop(),

  actions: {
    cancel() {
      this.transitionToRoute('entries.index');
    },

    validateUniqueEmail() {
      let errors = get(this, 'model.errors');
      try {
        this.validatePresenceOfEmail();
        this.validateUniquenessOfEmail();
        errors.remove('email');
      } catch (error) {
        errors.add('email', error);
      }
    }
  }
});
