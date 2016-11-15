import Ember from 'ember';
import EntryValidations from '../../validations/entry';

const { Controller } = Ember;

export default Controller.extend({
  entryValidations: EntryValidations,

  actions: {
    deleteRecord() {
      Ember.debug('Delete entry');
    }
  }
});
