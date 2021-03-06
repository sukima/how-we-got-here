import Ember from 'ember';
import { CanMixin } from 'ember-can';

const { Route, get, set, inject: { service }, RSVP } = Ember;

export default Route.extend(CanMixin, {
  store: service(),

  model() {
    if (!this.can('create entry')) {
      return this.transitionTo('entries');
    }
    return RSVP.hash({
      emailHashes: this.modelFor('entries').mapBy('emailHash'),
      newEntry: get(this, 'store').createRecord('entry')
    });
  },

  setupController(controller, {emailHashes, newEntry}) {
    set(controller, 'model', newEntry);
    set(controller, 'emailHashes', emailHashes);
  },

  resetController(controller, isExiting) {
    // When exiting the route.
    if (isExiting) {
      let model = get(controller, 'model');

      // Because we are leaving the route, we verify if the model is in 'isNew'
      // state, which means it wasn't saved to the backend.
      if (get(model, 'isNew')) {
        model.destroyRecord();
      }
    }
  }
});
