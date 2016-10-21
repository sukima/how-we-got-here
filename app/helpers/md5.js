/* globals md5 */
import Ember from 'ember';

const { Helper } = Ember;

export function md5sum([data]) {
  return md5(data);
}

export default Helper.helper(md5sum);
