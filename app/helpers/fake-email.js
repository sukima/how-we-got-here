import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

const { Helper } = Ember;

export function fakeTitle() {
  return faker.internet.email();
}

export default Helper.helper(fakeTitle);
