import Ember from 'ember';

const {
  Helper
} = Ember;

export function isLast([index, array]) {
  return index === (array.length - 1);
}

export default Helper.helper(isLast);
