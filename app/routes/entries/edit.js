import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, get, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  store: service(),

  model({id}) {
    return get(this, 'store').findRecord('entry', id);
  }
});
