import Ember from 'ember';

/* global $ */

export default Ember.Component.extend({
  store: Ember.inject.service(),
  note: null,
  student: null,
  AwardModel: null,
  currentStudent: null,
  isEditing: false,
  deleteModalShowing: false,
  thisAward: null,

  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('award').then(function (records) {
      self.set('awardsModel', records);
    });
  },

  actions: {
    addAward() {
      if (this.get("note") === null) {
        $('#error-modal').modal('show');
        return;
      }

      this.get("store").createRecord('award', {
        "note": this.get("note"),
        "student": this.get("currentStudent"),

      }).save().then(() => {
        this.set("note", null);
      });
    },
    toggleDeleteModal(thisAward) {
      if (this.get("deleteModalShowing")) {
        $('#delete-modal-award')
          .modal('hide');
        this.set("deleteModalShowing", false);
        this.set("thisAward", null);
      } else {
        $('#delete-modal-award')
          .modal('show');
        this.set("deleteModalShowing", true);
        this.set("thisAward", thisAward);
      }
    },
    closeErrorModal() {
      $('#error-modal').modal('hide');
    },
    deleteAward() {
      this.get("thisAward").set('student', null);
      this.get("thisAward").destroyRecord();
      //thisAward.save();
    },
    editAward() {
      this.set('isEditing', true);
    },
    saveAward(thisAward) {
      thisAward.save();
      this.set('isEditing', false);
    },
    cancelEdit() {
      this.set('isEditing', false);
    }
  }
});
