import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  level: DS.attr(),
  load: DS.attr(),
  status: DS.attr(),
  term: DS.hasMany('termCode'),
  plan: DS.hasMany('planCode')
});
