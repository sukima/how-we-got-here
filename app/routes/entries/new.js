import Ember from 'ember';

const { Route, get, inject: { service } } = Ember;

export default Route.extend({
  store: service(),

  model() {
    return get(this, 'store').createRecord('entry');
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
