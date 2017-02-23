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
  ///////////////ERROR for some reason when this is "hsCourseGrades" with an S and it matches the studentsRecordsDB.js model it doesn't work idk why
  //hsInfo: DS.hasMany('hsCourseGrade'),
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  marks: DS.hasMany('grade')
  
});
