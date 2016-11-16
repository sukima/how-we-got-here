/* globals md5 */
import Ember from 'ember';

const { Mixin, get, set } = Ember;

function gravatar(md5sum) {
  return `//www.gravatar.com/avatar/${md5sum}`;
}

export default Mixin.create({
  actions: {
    setAvatar(model) {
      let md5sum = md5(get(model, 'email'));
      set(model, 'avatar', gravatar(md5sum));
      set(model, 'emailHash', md5sum);
    }
  }
});
