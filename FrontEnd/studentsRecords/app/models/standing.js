import DS from 'ember-data';

export default DS.Model.extend({
  course: DS.attr(),
  description: DS.attr(),
  units: DS.attr(),
  grade: DS.attr(),
  location: DS.attr(),
  student: DS.belongsTo('student')

});
