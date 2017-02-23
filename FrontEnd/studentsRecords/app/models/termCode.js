import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  program: DS.hasMany('programRecord'),
  courseInfo: DS.hasMany('courseCode'),
  student: DS.belongsTo('student')

});
