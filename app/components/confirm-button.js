import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, get, set, isPresent, computed, run: { throttle } } = Ember;

const THROTTLE_DELAY = 700;

export default Component.extend({
  tagName: 'button',
  classNameBindings: [':btn', 'askForConfirmation.isRunning:btn-danger:btn-warning'],

  confirmCount: 8,

  askForConfirmation: task(function * () {
    let confirmCount = get(this, 'confirmCount');
    this.attachDocumentClick();
    try {
      for (let step = confirmCount; step > 0; step--) {
        set(this, 'step', step);
        yield timeout(1000);
      }
    } finally {
      this.detachDocumentClick();
    }
  }).restartable(),

  click() {
    throttle(this, 'performConfirmation', THROTTLE_DELAY);
    return false;
  },

  performConfirmation() {
    let confirmTask = get(this, 'askForConfirmation');
    if (get(confirmTask, 'isIdle')) {
      confirmTask.perform();
    } else {
      confirmTask.cancelAll();
      get(this, 'confirmed')();
    }
  },

  attachDocumentClick() {
    Ember.$(document).on(`click.${get(this, 'elementId')}`, () => {
      get(this, 'askForConfirmation').cancelAll();
    });
  },

  detachDocumentClick() {
    Ember.$(document).off(`.${get(this, 'elementId')}`);
  }
});
