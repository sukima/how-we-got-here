import Ember from 'ember';
import { task } from 'ember-concurrency';
import { validatePresence, validateFormat } from 'ember-changeset-validations/validators';
import EntryValidations from '../../validations/entry';
import validateUniqueHash from '../../validators/validate-unique-hash';
import AvatarUpdaterMixin from '../../mixins/avatar-updater';

const {
  Controller, getProperties, assign,
  computed, computed: { alias, mapBy }
} = Ember;

export default Controller.extend(AvatarUpdaterMixin, {
  entryValidations: computed('emailHashes', {
    get() {
      return assign({}, EntryValidations, {
        email: [
          validatePresence(true),
          validateFormat({type: 'email'}),
          validateUniqueHash(getProperties(this, 'emailHashes'))
        ]
      });
    }
  }),

  error: alias('save.last.error'),
  saving: alias('save.isRunning'),

  emailHashes: mapBy('entries', 'emailHash'),

  save: task(function * (model) {
    let result = yield model.save();
    let routeModel = getProperties(result, 'emailHash', 'secret');
    this.transitionToRoute('login.verify', routeModel);
  }).drop(),

  actions: {
    cancel() {
      this.transitionToRoute('entries.index');
    }
  }
});
