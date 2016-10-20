import Ember from 'ember';

const { Controller, computed: { sort } } = Ember;

export default Controller.extend({
  entriesSorting: ['createdAt:desc'],
  entries: sort('model', 'entriesSorting')
});
