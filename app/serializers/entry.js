import Ember from 'ember';
import DS from 'ember-data';

const { get, set, isPresent } = Ember;

export default DS.JSONAPISerializer.extend({
  normalize(modelClass, resourceHash) {
    let secret = get(resourceHash, 'meta.secret');
    if (isPresent(secret)) {
      set(resourceHash, 'attributes.secret', secret);
    }
    return this._super(modelClass, resourceHash);
  }
});
