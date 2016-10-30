import Ember from 'ember';
import DS from 'ember-data';
import { makeStep } from '../utils/steps';

const { get } = Ember;
const { Model, attr } = DS;

export default Model.extend({
  createdAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  author: attr('string'),
  wittyTitle: attr('string'),
  avatar: attr('string'),
  emailHash: attr('string'),
  steps: attr({defaultValue() { return [makeStep()]; }}),

  hasTerm(term) {
    return get(this, 'author').indexOf(term) > -1 ||
      get(this, 'wittyTitle').indexOf(term) > -1 ||
      get(this, 'steps').some(({text}) => text.indexOf(term) > -1);
  }
});
