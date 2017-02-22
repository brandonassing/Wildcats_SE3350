import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  level: DS.attr(),
  load: DS.attr(),
  status: DS.attr(),
  courseIno: DS.belongsTo('courseCode'),
  plan: DS.hasMany('planCode'),
  semester: DS.belongsTo('termCode'),
  mark: DS.hasMany('grade')
});
