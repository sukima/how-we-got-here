/* globals md5 */
import Ember from 'ember';
import { rollbackSingleProp } from '../utils/changeset';

const { Mixin, get, set, isBlank } = Ember;

const MODEL_BACKUP_PROPS = w('email avatar emailHash');

function gravatar(md5sum) {
  return `//www.gravatar.com/avatar/${md5sum}`;
}

export default Mixin.create({
  didRecieveAttrs() {
    set(this, '_origEmailValues', getProperties(...MODEL_BACKUP_PROPS));
  },

  actions: {
    setAvatar(model) {
      if (isBlank(get(model, 'email'))) {
        rollbackSingleProp(model, 'email');
        rollbackSingleProp(model, 'avatar');
        rollbackSingleProp(model, 'emailHash');
      }
      let md5sum = md5(get(model, 'email'));
      set(model, 'avatar', gravatar(md5sum));
      set(model, 'emailHash', md5sum);
    }
  }
});
