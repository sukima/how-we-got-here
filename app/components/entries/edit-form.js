/* globals md5 */
import Ember from 'ember';
import { POSTLUDE } from '../../utils/preludes';
import { makeStep } from '../../utils/steps';
import Form from 'ember-bootstrap/components/bs-form';

const { Component, get, set, computed, computed: { reads } } = Ember;

function gravatar(md5sum) {
  return `//www.gravatar.com/avatar/${md5sum}`;
}

export default Component.extend({
  postlude: POSTLUDE,
  needsEmail: true,

  model: reads('form.model'),
  form: computed(function() {
    return this.nearestOfType(Form);
  }),

  actions: {
    moveStepUp(index) {
      let steps = get(this, 'model.steps');
      if (index <= 1) {
        return;
      }
      let step = steps.objectAt(index);
      steps.removeAt(index);
      steps.insertAt(index - 1, step);
    },

    moveStepDown(index) {
      let steps = get(this, 'model.steps');
      if (index >= steps.length - 1) {
        return;
      }
      let step = steps.objectAt(index);
      steps.removeAt(index);
      steps.insertAt(index + 1, step);
    },

    removeStep(index) {
      get(this, 'model.steps').removeAt(index);
    },

    addStep() {
      get(this, 'model.steps').pushObject(makeStep('andThen'));
    },

    setAvatar() {
      let md5sum = md5(get(this, 'model.email'));
      set(this, 'model.avatar', gravatar(md5sum));
      set(this, 'model.emailHash', md5sum);
    }
  }
});
