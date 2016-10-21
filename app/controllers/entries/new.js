/* globals md5 */
import Ember from 'ember';
import { task } from 'ember-concurrency';
import { POSTLUDE } from '../../utils/preludes';

const { Controller, get, set, computed: { alias } } = Ember;

function gravatar(email) {
  return `//www.gravatar.com/avatar/${md5(email)}`;
}

export default Controller.extend({
  postlude: POSTLUDE,
  error: alias('save.last.error'),
  saving: alias('save.isRunning'),

  save: task(function * () {
    let model = get(this, 'model');
    set(model, 'createdAt', new Date());
    yield model.save();
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
    },

    setAvatar() {
      let email = get(this, 'model.email');
      set(this, 'model.avatar', gravatar(email));
    },

    cancel() {
      this.transitionToRoute('entries.index');
    }
  }
});
