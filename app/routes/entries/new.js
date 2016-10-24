import Ember from 'ember';

const { Route, get, set, inject: { service }, RSVP } = Ember;

export default Route.extend({
  store: service(),

  model() {
    return RSVP.hash({
      entries: this.modelFor('entries'),
      newEntry: get(this, 'store').createRecord('entry')
    });
  },

  setupController(controller, {entries, newEntry}) {
    set(controller, 'model', newEntry);
    set(controller, 'entries', entries);
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
