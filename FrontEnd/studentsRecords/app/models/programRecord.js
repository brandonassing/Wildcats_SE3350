import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  level: DS.attr(),
  load: DS.attr(),
  status: DS.attr(),
  program: DS.hasMany('courseCode'),
  plan: DS.hasMany('planCode'),
});
