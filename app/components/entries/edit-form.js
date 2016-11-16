import Ember from 'ember';
import { POSTLUDE } from '../../utils/preludes';
import { makeStep } from '../../utils/steps';
import Form from 'ember-bootstrap/components/bs-form';

const { Component, get, computed, computed: { reads } } = Ember;

export default Component.extend({
  postlude: POSTLUDE,

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
    }
  }
});
