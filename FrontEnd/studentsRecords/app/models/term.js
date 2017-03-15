import DS from 'ember-data';

export default DS.Model.extend({
  program: DS.hasMany('program-record'),
  courseInfo: DS.hasMany('course-code'),
  student: DS.belongsTo('student'),
  term: DS.belongsTo('term')

});
