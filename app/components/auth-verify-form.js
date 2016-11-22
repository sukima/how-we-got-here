/* globals md5 */
import Ember from 'ember';
import { task } from 'ember-concurrency';
import emailValidations from '../validations/email';
import verificationValidations from '../validations/verification';

const { Component, get, computed, isPresent, assign } = Ember;

export default Component.extend({
  baseProperty: 'verificationToken',

  verificationValidations: computed('emailHash', {
    get() {
      if (isPresent(get(this, 'emailHash'))) {
        return verificationValidations;
      } else {
        return assign({}, emailValidations, verificationValidations);
      }
    }
  }),

  verifyCode: task(function * (changeset) {
    let emailHash = this.emailHashFormChangeset(changeset);
    let verificationToken = get(changeset, 'verificationToken');
    try {
      yield get(this, 'onverify')(emailHash, verificationToken);
      changeset.rollback();
    } catch (error) {
      changeset.pushErrors('verificationToken', `${error}`);
    }
  }).restartable(),

  emailHashFormChangeset(changeset) {
    let emailHash = get(this, 'emailHash');
    if (isPresent(emailHash)) {
      return emailHash;
    } else {
      return md5(get(changeset, 'email'));
    }
  }
});
