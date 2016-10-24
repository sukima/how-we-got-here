import Ember from 'ember';

const { Component, get, computed, isNone, tryInvoke } = Ember;

function getMostSignificantValue(obj, selector) {
  let value = get(obj, selector);
  let lastIndex = selector.lastIndexOf('.');
  if (isNone(value)) {
    if (lastIndex < 1) {
      return null;
    }
    let parentSelector = selector.substring(0, lastIndex);
    return getMostSignificantValue(obj, parentSelector);
  }
  return value;
}

export default Component.extend({
  type: 'text',

  errorMessages: computed('errors.[]', {
    get() {
      let errors = get(this, 'errors') || [];
      return errors.map(error => {
        return getMostSignificantValue(error, 'message.message');
      });
    }
  }),

  actions: {
    optionalChange(value) {
      tryInvoke(this, 'update', value);
    }
  }
});
