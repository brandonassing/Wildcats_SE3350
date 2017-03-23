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
  actions: {
    toggleDeleteModal() {
      if (this.get("deleteModalShowing")) {
        $('#delete-modal-adj')
          .modal('hide');
        this.set("deleteModalShowing", false);
      } else {
        $('#delete-modal-adj')
          .modal('show');
        this.set("deleteModalShowing", true);
      }
    },
    deleteAssessment(thisCode) {
      //TODO prob need to nullify references
      //thisCode.set('student', null);
      thisCode.destroyRecord();
    },
    toggleAddModal() {
      if (this.get("addModalShowing")) {
        $('#add-modal-adj')
          .modal('hide');
        this.set("addModalShowing", false);
      } else {
        $('#add-modal-adj')
          .modal('show');
        this.set("addModalShowing", true);
      }
    },
    toggleEditModal() {
      if (this.get("editModalShowing")) {
        $('#edit-modal-adj')
          .modal('hide');
        this.set("editModalShowing", false);
      } else {
        $('#edit-modal-adj')
          .modal('show');
        this.set("editModalShowing", true);
      }
    },
    deleteCode() {

    }
  }
});
