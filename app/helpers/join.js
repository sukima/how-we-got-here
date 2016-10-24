import Ember from 'ember';

const {
  Helper
} = Ember;

export function joinValues(values, {delim = ', '}) {
  return [].concat(...values).join(delim);
}

export default Helper.helper(joinValues);
