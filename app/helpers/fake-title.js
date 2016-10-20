import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

const { Helper } = Ember;

export function fakeTitle() {
  return faker.name.title();
}

export default Helper.helper(fakeTitle);
