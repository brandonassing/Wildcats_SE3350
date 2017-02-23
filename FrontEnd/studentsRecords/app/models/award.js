import DS from 'ember-data';

export default DS.Model.extend({
  note: DS.attr(),
  students: DS.belongsTo('student')

});
