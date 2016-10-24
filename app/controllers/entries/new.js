import Ember from 'ember';
import DS from 'ember-data';
import { task } from 'ember-concurrency';

const {
  Controller, get, set,
  computed: { alias }
} = Ember;

const { InvalidError } = DS;

export default Controller.extend({
  error: alias('save.last.error'),
  saving: alias('save.isRunning'),

  save: task(function * () {
    let model = get(this, 'model');
    set(model, 'createdAt', new Date());
    yield model.save();
    this.transitionToRoute('entries');
  }).drop(),

  actions: {
    cancel() {
      this.transitionToRoute('entries.index');
    },

    validateUniqueEmail() {
      let errors = get(this, 'model.errors');
      let md5hash = get(this, 'model.emailHash');
      let entries = get(this, 'entries') || [];
      let hashMatches = entries.filterBy('emailHash', md5hash);
      if (hashMatches.length > 1) {
        errors.add('email', new InvalidError(null, 'Email is already taken'));
      } else {
        errors.remove('email');
      }
    }
  }
});
