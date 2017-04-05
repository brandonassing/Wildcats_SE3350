import Ember from 'ember';

/* global $ */

export default Ember.Component.extend({
  store: Ember.inject.service(),
  addModalShowing: false,
  assessmentModel: null,
  adjudicationModel: null,
  aCode: null,
  currentStudent: null,


  didRender() {
    Ember.$('.menu .item').tab();
  },
  init() {
    this._super(...arguments);
    var self = this;
    this.get("store").findAll("assessmentCode").then(function (records) {
      self.set("assessmentModel", records);
    });
    this.get("store").findAll("adjudication").then(function (records) {
      self.set("adjudicationModel", records);
    });

  },
  actions: {
    addThisCode(code) {
      this.set("aCode", code);
      this.get("store").createRecord("adjudication", {
        "date": "200",
        "termAVG": null,
        "termUnitPassed": null,
        "termUnitsTotal": null,
        "note": null,
        "semester": null,
        "student": this.get("currentStudent"),
        "comment": this.get("aCode")
      }).save().then(() => {
        this.send("toggleAddModal");
      });
    },
    removeCode(code) {
      this.set("aCode", code);
      this.get("aCode").destroyRecord();
      this.set("aCode", null);
    },
    toggleAddModal() {
      if (this.get("addModalShowing")) {
        $('#add-modal-rec-adj')
          .modal('hide');
        this.set("addModalShowing", false);
      } else {
        $('#add-modal-rec-adj')
          .modal('show');
        this.set("addModalShowing", true);
      }
    }
  }
});
