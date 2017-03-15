import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  assess: DS.belongsTo('assessment-code'),
  faculty: DS.hasMany('department')

});
