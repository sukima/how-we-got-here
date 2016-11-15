import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

const { Helper } = Ember;

export function fakeUrl() {
  return faker.internet.url();
}

export default Helper.helper(fakeUrl);
