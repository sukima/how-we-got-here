import Ember from 'ember';
import { PRELUDES, PRELUDE_KEYS } from '../utils/preludes';

const { Component } = Ember;

export default Component.extend({
  tagName: 'span',
  preludes: PRELUDES,
  preludeKeys: PRELUDE_KEYS
});
