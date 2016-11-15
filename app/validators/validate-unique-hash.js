/* globals md5 */
import buildMessage from 'ember-changeset-validations/utils/validation-errors';

export default function validateUniqueHash(options) {
  let { emailHashes } = options;
  return (key, newValue /*, oldValue, changes, content */) => {
    let hash = md5(newValue);
    if (emailHashes.indexOf(hash) > -1) {
      return buildMessage(key, 'uniqueHash', hash, options);
    }
    return true;
  };
}
