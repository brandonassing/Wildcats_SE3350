import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  student: DS.belongsTo('student'),
  program: DS.hasMany('programRecord'),
  courseInfo: DS.hasMany('courseCode')
});
