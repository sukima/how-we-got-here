import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

const { Helper } = Ember;

export function fakeEmail() {
  return faker.internet.email();
}

export default Helper.helper(fakeEmail);
