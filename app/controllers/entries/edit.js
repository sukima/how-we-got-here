import Ember from 'ember';
import { validatePresence } from 'ember-changeset-validations/validators';

const { Controller } = Ember;

export default Controller.extend({
  entryValidations: {
    author: validatePresence(true)
  },

  actions: {
    deleteRecord() {
      Ember.debug('Delete entry');
    }
  }
});
