import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  term: DS.hasMany('term')

});
