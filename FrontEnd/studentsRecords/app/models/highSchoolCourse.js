import DS from 'ember-data';

export default DS.Model.extend({
  level: DS.attr(),
  source: DS.attr(),
  unit: DS.attr(),
  school: DS.belongsTo('secondarySchool'),
  course: DS.belongsTo('highSchoolSubject'),
  hsCourseGrades: DS.hasMany('hsCourseGrade'),
  

});
