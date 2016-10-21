import Ember from 'ember';
import { PRELUDES, PRELUDE_KEYS } from '../utils/preludes';

const { Component, get } = Ember;

export default Component.extend({
  tagName: '',
  preludes: PRELUDES,
  preludeKeys: PRELUDE_KEYS,

  actions: {
    updatePrelude(preludeKey) {
      get(this, 'update')(preludeKey);
      return false;
    }
  }
});
