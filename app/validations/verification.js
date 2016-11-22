import {
  validatePresence, validateLength, validateNumber
} from 'ember-changeset-validations/validators';

export default {
  verificationToken: [
    validatePresence(true),
    validateNumber({integer: true}),
    validateLength({is: 6})
  ]
};
