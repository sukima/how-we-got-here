import { validatePresence, validateFormat } from 'ember-changeset-validations/validators';

export default {
  author: validatePresence({presence: true, description: 'Name'}),
  href: validateFormat({type: 'url', allowBlank: true, description: 'Personal Website'})
};
