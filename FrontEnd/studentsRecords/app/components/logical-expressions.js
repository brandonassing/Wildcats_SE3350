import Ember from 'ember';

export default Ember.Component.extend({
  thisCode: null,
  logicalModel: null,
  operators: ["==", "!=", ">", "<", ">=", "<="],
  selectedOperator: null,
  expValue: null,

  init() {
    this._super(...arguments);
    var self = this;
    /*this.get('store').findAll('logical-expression').then(function (records) {
      self.set('logicalModel', records);
    });*/
  },
  actions: {
    addExpression() {

      /*this.get("store").createRecord('logical-expression', {
          
      }).save().then(() => {
      this.get("thisCode").save();
      });*/
    },
    selectOperator(op) {
      this.set("selectedOperator", op);
    },
    editExpression() {

    },
    deleteExpression(thisExp) {
      thisExp.destroyRecord();
    }
  }
});
