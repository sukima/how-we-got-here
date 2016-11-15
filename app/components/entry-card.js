import Ember from 'ember';

const { Component, get, isBlank, computed } = Ember;

export default Component.extend({
  classNames: ['entry-card'],

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
