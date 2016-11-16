import Ember from 'ember';
import { JSONAPISerializer } from 'ember-cli-mirage';

const { set } = Ember;

export default JSONAPISerializer.extend({
  serialize(models, request) {
    let payload = this.buildPayload(models);
    if (request.method === 'POST') {
      set(payload, 'data.meta', {secret: 'bada55'});
    }
    return payload;
  }
});
