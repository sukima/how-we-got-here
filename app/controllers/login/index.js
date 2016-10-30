import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    authenticate() {
      this.transitionToRoute('login.verify', Ember.Object.create({emailHash: 'bada55'}));
    }
  }
});
