import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

const { Helper } = Ember;

export function fakeName() {
  return faker.name.findName();
}

export default Helper.helper(fakeName);
