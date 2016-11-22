import Ember from 'ember';
import { validateConfirmation } from 'ember-changeset-validations/validators';
import recoveryValidations from './recovery';
import emailValidations from './email';

const { assign } = Ember;

export default assign({}, recoveryValidations, emailValidations, {
  recoveryCodeConfirm: validateConfirmation({on: 'recoveryCode'})
});
