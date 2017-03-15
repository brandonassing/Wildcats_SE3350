import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr(),
  termAVG: DS.attr(),
  termUnitPassed: DS.attr(),
  termUnitsTotal: DS.attr(),
  note: DS.attr(),
  semester: DS.belongsTo('term'),
  student: DS.belongsTo('student'),
  comment: DS.belongsTo('assessment-code')
});
