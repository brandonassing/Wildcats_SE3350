import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  program: DS.hasMany('programRecord'),
  courseNo: DS.hasMany('courseCode'),
  student: DS.belongsTo('student')

});
