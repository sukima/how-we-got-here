import { Factory, faker } from 'ember-cli-mirage';
import { PRELUDE_KEYS } from '../../utils/preludes';

function sentenceFragment() {
  let size = faker.random.number({min: 3, max: 15});
  return faker.lorem.words(size).join(' ');
}

export default Factory.extend({
  createdAt() { return faker.date.past(); },
  author() { return faker.name.findName(); },
  wittyTitle() { return faker.name.title(); },
  avatar() { return faker.internet.avatar(); },
  steps() {
    let size = faker.random.number({min: 1, max: 10});
    let steps = [
      {prelude: '_start', text: sentenceFragment()}
    ];
    for (let i = 0; i < size; i++) {
      steps.push({
        prelude: faker.random.arrayElement(PRELUDE_KEYS),
        text: sentenceFragment()
      });
    }
    return steps;
  }
});
