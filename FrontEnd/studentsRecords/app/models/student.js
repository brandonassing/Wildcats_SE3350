import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  regComments: DS.attr(),
  basis: DS.attr(),
  admissionAvg: DS.attr(),
  admissionComments: DS.attr(),
  photo: DS.attr(),
  DOB: DS.attr('date'),
  resInfo: DS.belongsTo('residency'),
  genInfo: DS.belongsTo('gender'),
  transInfo: DS.hasMany('standing'),
  awardInfo: DS.hasMany('award'),
  //============ERROR
  highSchoolCourse: DS.hasMany('hs-course-grade'),
  term: DS.hasMany('term-code')
});
