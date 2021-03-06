import {
  validatePresence, validateLength, validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  recoveryCode: [
    validatePresence(true),
    validateLength({min: 6})
  ],
  recoveryCodeConfirm: validateConfirmation({on: 'recoveryCode'})
};
