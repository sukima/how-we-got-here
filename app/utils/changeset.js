import Ember from 'ember';
import { isChangeset } from 'ember-changeset/-private/internals';

const { assert } = Ember;

export function rollbackSingleProp(changeset, prop) {
  assert('changeset must be a Changeset', isChangeset(changeset));
  let snapshot = changeset.snapshot();
  delete snapshot.changes[prop];
  return changeset.restore(snapshot);
}
