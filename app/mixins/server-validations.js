import Ember from 'ember';

const { Mixin, get } = Ember;

export default Mixin.create({
  baseProperty: 'base',

  addValidationErrorsToChangeset(changeset, error) {
    let baseProperty = get(this, 'baseProperty');
    changeset.addError(baseProperty, `${error}`);
  }
});
