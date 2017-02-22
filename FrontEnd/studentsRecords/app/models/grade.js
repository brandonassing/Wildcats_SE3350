import DS from 'ember-data';

export default DS.Model.extend({
  mark: DS.attr(),
  note: DS.attr(),
  level: DS.belongsTo('programRecord'),
  student: DS.belongsTo('student')
});
