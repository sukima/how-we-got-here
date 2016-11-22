import Ember from 'ember';
import { task } from 'ember-concurrency';
import { jwt_decode as jwtDecode } from 'ember-cli-jwt-decode';

const {
  Service, get, isPresent,
  computed: { reads }, inject: { service }
} = Ember;

const TOKEN_RECOVER_URL = '/api/token-recover';

export default Service.extend({
  ajax: service(),
  session: service(),

  isLoggedIn: reads('session.isAuthenticated'),
  jwtData: reads('session.session.content.authenticated.token'),

  tokenData: Ember.computed('jwtData', {
    get() {
      let jwtData = get(this, 'jwtData');
      if (isPresent(jwtData)) {
        return jwtDecode(jwtData);
      } else {
        return {};
      }
    }
  }),

  authenticate: task(function * (identification, verificationToken) {
    const session = get(this, 'session');
    let credentials = {identification, password: verificationToken};
    yield session.authenticate('authenticator:token', credentials);
  }).restartable(),

  invalidate: task(function * () {
    const session = get(this, 'session');
    yield session.invalidate();
  }).drop(),

  recoverIdentity: task(function * (identification, recoveryCode) {
    const ajax = get(this, 'ajax');
    let data = {identification, recoveryCode};
    return yield ajax.post(TOKEN_RECOVER_URL, {data});
  }).restartable()
});
