import Ember from 'ember';
import defaultMessages from 'ember-changeset-validations/utils/messages';

const { assign } = Ember;

export default assign({}, defaultMessages, {
  uniqueHash: '{description} must be unique'
});
