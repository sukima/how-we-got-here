import {
  validatePresence, validateFormat, validateLength, validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  email: [
    validatePresence(true),
    validateFormat({type: 'email'})
  ],
  recoveryCode: [
    validatePresence(true),
    validateLength({min: 6})
  ],
  recoveryCodeConfirm: validateConfirmation({on: 'recoveryCode'})
};
