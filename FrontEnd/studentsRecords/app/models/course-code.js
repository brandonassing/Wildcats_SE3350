import DS from 'ember-data';

export default DS.Model.extend({
  courseLetter: DS.attr(),
  courseNumber: DS.attr(),
  name: DS.attr(),
  unit: DS.attr(),
  mark: DS.belongsTo('grade'),
  term: DS.belongsTo('term-code')

});
