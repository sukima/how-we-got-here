import Ember from 'ember';
import { PRELUDES, POSTLUDE } from '../utils/preludes';

const { Mixin, get, isBlank, computed } = Ember;

function makeStep(prelude = '_start', text = '') {
  return {prelude, text};
}

export default Mixin.create({
  prose: computed('model.steps.@each.{prelude,text}', {
    get() {
      let prose = get(this, 'steps')
        .map(step => {
          if (isBlank(step.text)) {
            return null;
          }
          return `${PRELUDES[step.prelude]} ${step.text}.`;
        })
        .compact()
        .join(' ');
      return `${prose} ${POSTLUDE}.`;
    }
  }),

  addNewStep(prelude, text) {
    get(this, 'model.steps').pushObject(makeStep(prelude, text));
    return this;
  }
});
