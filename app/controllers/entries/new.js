import Ember from 'ember';
import DS from 'ember-data';
import { task } from 'ember-concurrency';

const {
  Controller, get, set, isBlank,
  computed: { alias }
} = Ember;

const { InvalidError } = DS;

export default Controller.extend({
  error: alias('save.last.error'),
  saving: alias('save.isRunning'),

  save: task(function * () {
    let model = get(this, 'model');
    set(model, 'createdAt', new Date());

    this.validateForm();

    if (get(model, 'isValid')) {
      yield model.save();
    }

    if (get(model, 'isValid')) {
      this.transitionToRoute('entries');
    }
  }).drop(),

  validatePresenceOfEmail() {
    if (isBlank(get(this, 'model.email'))) {
      throw new InvalidError(null, 'Email is required');
    }
  },

  validateUniquenessOfEmail() {
    let md5hash = get(this, 'model.emailHash');
    let entries = get(this, 'entries') || [];
    let hashMatches = entries.filterBy('emailHash', md5hash);
    if (hashMatches.length > 1) {
      throw new InvalidError(null, 'Email is already taken');
    }
  },

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
