import DS from 'ember-data';

export default DS.Model.extend({
  code: DS.attr(),
  name: DS.attr(),
  comment: DS.hasMany('adjudication'),
  testExpression: DS.hasMany('logical-expression'),
  assess: DS.hasMany('faculty')

});

