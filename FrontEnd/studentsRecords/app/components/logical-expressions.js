import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  thisCode: null,
  logicalModel: null,
  operators: ["==", "!=", ">", "<", ">=", "<="],
  parameters: ["Weighted Average", "Overall Average"],
  selectedOperator: null,
  selectedParameter: null,
  expValue: null,
  thisExp: null,
  deleteModalShowing: false,

  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('logical-expression').then(function (records) {
      self.set('logicalModel', records);
    });
  },
  actions: {
    addExpression() {
      var expression = this.get("selectedParameter").toString() + this.get("selectedOperator").toString() + this.get("expValue").toString();
      this.get("store").createRecord('logical-expression', {
        "testExpression": this.get("thisCode"),
        "booleanExp": expression
      }).save().then(() => {
        this.get("thisCode").save();
        this.set("selectedOperator", null);
        this.set("selectedParameter", null);
        this.set("expValue", null);
      });
    },
    appendExpression() {

    },
    selectParameter(par) {
      this.set("selectedParameter", par);
    },
    selectOperator(op) {
      this.set("selectedOperator", op);
    },
    editExpression() {

    },
    toggleDeleteModal(exp) {
      if (this.get("deleteModalShowing")) {
        $('#delete-modal-exp')
          .modal('hide');
        this.set("deleteModalShowing", false);
        this.set("thisExp", null);
      } else {
        $('#delete-modal-exp')
          .modal('show');
        this.set("deleteModalShowing", true);
        this.set("thisExp", exp);
      }
    },
    deleteExpression(exp) {
      //this.get("thisExp").destroyRecord();
      exp.destroyRecord();
      this.set("thisExp", null);
    }
  }
});
