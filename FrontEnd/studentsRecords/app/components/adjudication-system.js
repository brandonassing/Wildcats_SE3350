import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  adjudicationModel: null,
  assessmentModel: null,
  deleteModalShowing: false,
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
    toggleDeleteModal() {
      if (this.get("deleteModalShowing")) {
        $('#clear-adj-modal')
          .modal('hide');
        this.set('deleteModalShowing', false);
      } else {
        $('#clear-adj-modal')
          .modal('show');
        this.set('deleteModalShowing', true);
      }
    },
    clearStore() {
      this.get('store').findAll('adjudication').then(function (record) {
        record.content.forEach(function (rec) {
          Ember.run.once(this, function () {
            rec.deleteRecord();
            rec.save();
          });
        }, this);
      });
    }
  }
});
