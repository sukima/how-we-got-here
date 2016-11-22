import Ember from 'ember';
import { task } from 'ember-concurrency';

const { Controller, get, inject: { service } } = Ember;

export default Controller.extend({
  auth: service(),

  authenticateAndRedirect: task(function * () {
    yield get(this, 'auth.authenticate').perform(...arguments);
    yield this.transitionToRoute('entries');
  }).restartable()
});
