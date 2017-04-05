import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  adjudicationModel: null,
  assessmentModel: null,
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
