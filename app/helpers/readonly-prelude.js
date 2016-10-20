import Ember from 'ember';

const { Helper } = Ember;

export function readonlyPrelude([preludeKey = '_']) {
  return preludeKey.charAt(0) === '_';
}

export default Helper.helper(readonlyPrelude);
