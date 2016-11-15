import Ember from 'ember';
import { PRELUDES, POSTLUDE } from '../utils/preludes';

const { Component } = Ember;

export default Component.extend({
  tagName: 'p',
  classNames: ['entry-prose'],
  preludes: PRELUDES,
  postlude: POSTLUDE
});
