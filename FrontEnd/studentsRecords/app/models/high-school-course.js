import DS from 'ember-data';

export default DS.Model.extend({
  level: DS.attr(),
  source: DS.attr(),
  unit: DS.attr(),
  school: DS.belongsTo('secondary-school'),
  course: DS.belongsTo('high-school-subject'),
  hsCourseGrades: DS.hasMany('hs-course-grades')


});
