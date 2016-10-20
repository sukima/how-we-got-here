import Ember from 'ember';
import DS from 'ember-data';
import { PRELUDES, POSTLUDE } from '../utils/preludes';

const { computed, get, isBlank } = Ember;
const { Model, attr } = DS;

function makeStep(prelude = '_start', text = '') {
  return {prelude, text};
}

export default Model.extend({
  createdAt: attr('date', {
    defaultValue() { return new Date(); }
  }),
  author: attr('string'),
  wittyTitle: attr('string'),
  avatar: attr('string'),
  steps: attr({defaultValue() { return [makeStep()]; }}),

  prose: computed('steps.@each.{prelude,text}', {
    get() {
      let prose = get(this, 'steps')
        .map(step => {
          if (isBlank(step.text)) {
            return null;
          }
          return `${PRELUDES[step.prelude]} ${step.text}.`;
        })
        .compact()
        .join(' ');
      return `${prose} ${POSTLUDE}`;
    }
  }),

  fullTitle: computed('author', 'wittyTitle', {
    get() {
      let author = get(this, 'author');
      let wittyTitle = get(this, 'wittyTitle');
      if (isBlank(wittyTitle)) {
        return author;
      } else {
        return `${author} (${wittyTitle})`;
      }
    }
  }),

  addNewStep(prelude, text) {
    get(this, 'steps').pushObject(makeStep(prelude, text));
    return this;
  }
});
