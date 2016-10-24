/* globals md5 */
import Ember from 'ember';
import { POSTLUDE } from '../../utils/preludes';

const { Component, get, set, tryInvoke } = Ember;

function gravatar(md5sum) {
  return `//www.gravatar.com/avatar/${md5sum}`;
}

export default Component.extend({
  postlude: POSTLUDE,
  needsEmail: true,

  actions: {
    moveStepUp(index) {
      let steps = get(this, 'entry.steps');
      if (index <= 1) {
        return;
      }
      let step = steps.objectAt(index);
      steps.removeAt(index);
      steps.insertAt(index - 1, step);
    },

    moveStepDown(index) {
      let steps = get(this, 'entry.steps');
      if (index >= steps.length - 1) {
        return;
      }
      let step = steps.objectAt(index);
      steps.removeAt(index);
      steps.insertAt(index + 1, step);
    },

    removeStep(index) {
      get(this, 'entry.steps').removeAt(index);
    },

    addStep() {
      get(this, 'entry').addNewStep('andThen');
    },

    setAvatar() {
      let md5sum = md5(get(this, 'entry.email'));
      set(this, 'entry.avatar', gravatar(md5sum));
      set(this, 'entry.emailHash', md5sum);
      tryInvoke(this, 'checkValidity');
    }
  }
});
