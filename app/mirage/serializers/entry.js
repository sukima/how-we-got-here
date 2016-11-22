import Ember from 'ember';
import { JSONAPISerializer } from 'ember-cli-mirage';

const { set } = Ember;

export const AUTH_SECRET = 'JBSWY3DPEHPK3PXP';

export default JSONAPISerializer.extend({
  serialize(models, request) {
    let payload = this.buildPayload(models);
    if (request.method === 'POST') {
      set(payload, 'data.meta', {secret: AUTH_SECRET});
    }
    return payload;
  }
});
