/* globals md5 */
import Ember from 'ember';
import { task } from 'ember-concurrency';
import recoveryValidations from '../../validations/recovery';
import emailValidations from '../../validations/email';
import { isNotFoundError } from 'ember-ajax/errors';

const { Controller, get, assign, inject: { service } } = Ember;

export default Controller.extend({
  auth: service(),

  recoveryValidations: assign({}, recoveryValidations, emailValidations),

  recoverIdentity: task(function * (changeset) {
    const recoverIdentity = get(this, 'auth.recoverIdentity');
    let emailHash = md5(get(changeset, 'email'));
    let recoveryCode = get(changeset, 'recoveryCode');
    try {
      let { secret } = yield recoverIdentity.perform(emailHash, recoveryCode);
      yield this.transitionToRoute('login.verify', {emailHash, secret});
    } catch (error) {
      this.addErrorsToChangeset(changeset, error);
    }
  }).restartable(),

  addErrorsToChangeset(changeset, error) {
    let property = isNotFoundError(error) ? 'email' : 'recoveryCode';
    changeset.pushErrors(property, `${error}`);
  }
});
