import Ember from 'ember';
import { PRELUDES, POSTLUDE } from '../utils/preludes';

const { Component, get, isBlank, computed } = Ember;

export default Component.extend({
  classNames: ['entry-card'],

  prose: computed('entry.steps.@each.{prelude,text}', {
    get() {
      let prose = get(this, 'entry.steps')
        .map(step => {
          if (isBlank(step.text)) {
            return null;
          }
          return `${PRELUDES[step.prelude]} ${step.text}.`;
        })
        .compact()
        .join(' ');
      return `${prose} ${POSTLUDE}.`;
    }
  }),

  fullTitle: computed('entry.author', 'entry.wittyTitle', {
    get() {
      let author = get(this, 'entry.author');
      let wittyTitle = get(this, 'entry.wittyTitle');
      if (isBlank(wittyTitle)) {
        return author;
      } else {
        return `${author} (${wittyTitle})`;
      }
    }
  })
});
