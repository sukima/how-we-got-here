import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    deleteRecord() {
      Ember.debug('Delete entry');
    }
  }
});
