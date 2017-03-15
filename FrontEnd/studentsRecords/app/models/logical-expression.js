import DS from 'ember-data';

export default DS.Model.extend({
  booleanExp: DS.attr(),
  logicalLink: DS.attr(),
  testExpression: DS.belongsTo ('assessment-code')
});
