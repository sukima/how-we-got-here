import {
  validatePresence, validateLength
} from 'ember-changeset-validations/validators';

export default {
  recoveryCode: [
    validatePresence(true),
    validateLength({min: 6})
  ]
};
