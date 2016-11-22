import Ember from 'ember';

const { Route, get, set, inject: { service } } = Ember;

export default Route.extend({
  session: service(),

  model() {
    // return {emailHash: 'bada55', secret: 'JBSWY3DPEHPK3PXP'};
    return this.transitionTo('login');
  },

  setupController() {
    this._super(...arguments);
    window.onbeforeunload = () => {
      set(this, 'controller.warnNotLoggedin', true);
      return `You can not view this authentication code again. Are you sure you \
wish to leave?`;
    };
  },

  rollbackHistory() {
    Ember.deprecate(`transition.abort() incorrectly modifies URL history. \
Temporary hack in use.`, false, {
      id: 'transition.abort.history',
      until: '2.10.0',
      url: 'https://github.com/emberjs/ember.js/issues/5210'
    });
    let model = this.controller.get('model');
    let oldUrl = this.router.generate(this.routeName, model);
    let newUrl = this.router.location.getURL();
    if (oldUrl !== newUrl) {
      this.router.location.setURL(oldUrl);
    }
  },

  didTransition() {
    window.onbeforeunload = null;
  },

  actions: {
    willTransition(transition) {
      if (get(this, 'session.isAuthenticated')) {
        return true;
      }
      set(this, 'controller.warnNotLoggedin', true);
      transition.abort();
      this.rollbackHistory();
    }
  }
});
