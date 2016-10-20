import Ember from 'ember';
import { faker } from 'ember-cli-mirage';

const { Helper } = Ember;

export function fakeWords(__, {min = 3, max = 10}) {
  return faker.lorem.words(faker.random.number({min, max})).join(' ');
}

export default Helper.helper(fakeWords);
