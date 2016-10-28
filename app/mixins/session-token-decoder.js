import Ember from 'ember';
import { jwt_decode } from 'ember-cli-jwt-decode';

const {
  Mixin, get, isPresent, Logger,
  computed, inject: { service }
} = Ember;

export default Mixin.create({
  session: service(),

  sessionToken: computed('session.token', {
    get() {
      let token = get(this, 'session.token');
      try {
        return jwt_decode(get(this, 'session.token'));
      } catch (err) {
        if (isPresent(token)) {
          Logger.error(err);
        }
        return {};
      }
    }
  })
});
