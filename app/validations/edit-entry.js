import Ember from 'ember';
import recoveryValidations from './recovery-code/optional';
import emailValidations from './email';

const { assign } = Ember;

export default assign({}, recoveryValidations, emailValidations);
