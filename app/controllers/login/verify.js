import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, get, computed, inject: { service } } = Ember;

const ISSUER = encodeURIComponent('how-i-got-here');

// https://github.com/google/google-authenticator/wiki/Key-Uri-Format
export default Controller.extend({
  auth: service(),

  qrCodeData: computed('model.{email,secret}', {
    get() {
      let email = encodeURIComponent(get(this, 'model.email'));
      let secret = encodeURIComponent(get(this, 'model.secret'));
      return `otpauth://totp/${ISSUER}:${email}?secret=${secret}&issuer=${ISSUER}&algorithm=SHA1&digits=6&period=30`;
    }
  }),

  authenticate: task(function * () {
    yield get(this, 'auth.authenticate').perform(...arguments);
    yield this.transitionToRoute('entries');
  })
});
