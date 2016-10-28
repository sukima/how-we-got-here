import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('authorize', function () {
    this.route('recover');
  });

  this.route('entries', function () {
    this.route('new');
    this.route('edit', {path: ':id/edit'});
  });
});

export default Router;
