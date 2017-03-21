import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  faculty: DS.belongsTo('faculty'),
  dept: DS.hasMany('program-administration')
});
