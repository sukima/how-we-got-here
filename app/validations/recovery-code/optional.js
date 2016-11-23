import {
  validateLength, validateConfirmation
} from 'ember-changeset-validations/validators';

export default {
  recoveryCode: validateLength({min: 6, allowBlank: true}),
  recoveryCodeConfirm: validateConfirmation({
    on: 'recoveryCode',
    allowBlank: true
  })
};
