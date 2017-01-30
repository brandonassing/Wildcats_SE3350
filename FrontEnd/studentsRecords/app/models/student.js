import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr(),
  firstName: DS.attr(),
  lastName: DS.attr(),
  DOB: DS.attr('date'),
  regComments: DS.attr(),
  basis: DS.attr(),
  admissionAvg: DS.attr(),
  admissionComments: DS.attr(),
  photo: DS.attr(),
  genInfo: DS.belongsTo('gender'),
  resInfo: DS.belongsTo('residency'),
  transInfo: DS.hasMany('standing'),
  awardInfo: DS.hasMany('award')
});
