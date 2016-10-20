import Ember from 'ember';
import { task } from 'ember-concurrency';
import { POSTLUDE } from '../../utils/preludes';

const { Controller, get, computed: { alias } } = Ember;

export default Controller.extend({
  postlude: POSTLUDE,
  error: alias('save.last.error'),
  saving: alias('save.isRunning'),

  save: task(function * () {
    yield get(this, 'model').save();
    this.transitionToRoute('entries');
  }).drop(),

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
      get(this, 'model').addNewStep('andThen');
    }
  }
});
