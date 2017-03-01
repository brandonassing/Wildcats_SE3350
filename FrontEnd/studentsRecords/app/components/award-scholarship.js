import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  note: null,
  student: null,
  AwardModel: null,
  currentStudent: null,
  isEditing: false,
  deleteModalShowing: false,

  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('award').then(function (records) {
      self.set('awardsModel', records);
    });
  },

  actions: {
    addAward() {
      this.get("store").createRecord('award', {
        "note": this.get("note"),
        "student": this.get("currentStudent"),

      }).save().then(() => {
        this.set("note", null);
      });
    },
    toggleDeleteModal() {
      if (this.get("deleteModalShowing")) {
        $('#delete-modal-award')
          .modal('hide');
        this.set("deleteModalShowing", false);
      } else {
        $('#delete-modal-award')
          .modal('show');
        this.set("deleteModalShowing", true);
      }
    },
    deleteAward(thisAward) {
      thisAward.set('student', null);
      thisAward.save();
      thisAward.destroyRecord();
    },
    editAward(thisAward) {
      this.set('isEditing', true);
    },
    saveAward(thisAward) {
      if (confirm("Are you sure you want to save? \n All previous information will be lost.")) {
        thisAward.save();
        this.set('isEditing', false);
      } else {
        return;
      }

    },
    cancelEdit() {
      this.set('isEditing', false);
    }
  }
});
