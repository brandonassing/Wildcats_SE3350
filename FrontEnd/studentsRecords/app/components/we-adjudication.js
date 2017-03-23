import Ember from 'ember';

/* global $ */

export default Ember.Component.extend({
  store: Ember.inject.service(),
  adjudicationModel: null,
  assessmentModel: null,
  faculty: null,
  department: null,
  pAdministration: null,
  deleteModalShowing: false,
  editModalShowing: false,
  addModalShowing: false,

  didRender() {
    Ember.$('.menu .item').tab();
  },
  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('assessment-code').then(function (records) {
      self.set('assessmentModel', records);
    });
  },
});
