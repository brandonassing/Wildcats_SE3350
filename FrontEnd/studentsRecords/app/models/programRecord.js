import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  level: DS.attr(),
  load: DS.attr(),
  status: DS.attr(),
  courseIno: DS.belongsTo('courseCode'),
  plans: DS.hasMany('planCode'),
  semester: DS.belongsTo('termCode'),
  marks: DS.hasMany('grade')
});
