/* globals md5 */
import Ember from 'ember';
import { module, test } from 'qunit';
import validateValidateUniqueHash from 'how-we-got-here/validators/validate-unique-hash';

const { typeOf } = Ember;

const UNIQUE_EMAIL = 'foobar';
const UNIQUE_HASH = md5(UNIQUE_EMAIL);

module('Unit | Validator | validate-unique-hash');

test('returns true if not in list of hashes', function(assert) {
  let subject = validateValidateUniqueHash({emailHashes: [UNIQUE_HASH]});
  let result = subject('email', 'bazfoo');
  assert.equal(result, true, 'expected validation to return true');
});

test('returns error message if in list of hashes', function(assert) {
  let subject = validateValidateUniqueHash({emailHashes: [UNIQUE_HASH]});
  let result = subject('email', UNIQUE_EMAIL);
  assert.equal(typeOf(result), 'string', 'expected validation to return a string message');
});
