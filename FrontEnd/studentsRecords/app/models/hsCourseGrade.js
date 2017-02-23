import DS from 'ember-data';

export default DS.Model.extend({
  mark: DS.attr(),
  source: DS.belongsTo('highSchoolCourse'),
  students: DS.belongsTo('student')

});
