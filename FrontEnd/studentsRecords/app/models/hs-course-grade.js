import DS from 'ember-data';

export default DS.Model.extend({
  mark: DS.attr(),
  source: DS.belongsTo('high-school-course'),
  student: DS.belongsTo('student')

});
