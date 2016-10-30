import Ember from 'ember';

const { Mixin, get, isBlank, computed } = Ember;

export default Mixin.create({
  fullTitle: computed('model.author', 'model.wittyTitle', {
    get() {
      let author = get(this, 'model.author');
      let wittyTitle = get(this, 'model.wittyTitle');
      if (isBlank(wittyTitle)) {
        return author;
      } else {
        return `${author} (${wittyTitle})`;
      }
    }
  })
});
