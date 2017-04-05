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
  deleteModalAdjShowing: false,
  editModalShowing: false,
  addModalShowing: false,
  thisModel: null,
  newName: null,
  newCode: null,
  length: 0,
  keep: true,

  didRender() {
    Ember.$('.menu .item').tab();
  },
  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('assessment-code').then(function (records) {
      self.set('assessmentModel', records);
    });
    this.get("store").findAll("adjudication").then(function (records) {
      self.set("adjudicationModel", records);
    });
  },
  actions: {
    adjudicate() {

    },
    toggleDeleteAdjModal() {
      if (this.get("deleteModalAdjShowing")) {
        $('#clear-adj-modal')
          .modal('hide');
        this.set('deleteModalAdjShowing', false);
      } else {
        $('#clear-adj-modal')
          .modal('show');
        this.set('deleteModalAdjShowing', true);
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
    },
    toggleDeleteModal(thisCode) {
      if (this.get("deleteModalShowing")) {
        $('#delete-modal-adj')
          .modal('hide');
        this.set("deleteModalShowing", false);
        this.set("thisModel", null);
      } else {
        $('#delete-modal-adj')
          .modal('show');
        this.set("deleteModalShowing", true);
        this.set("thisModel", thisCode);
      }
    },
    deleteAssessment() {
      //TODO prob need to nullify references
      //thisCode.set('student', null);
      this.get("thisModel").destroyRecord();
      this.set("thisModel", null);
    },
    addAssessment() {
      /*if (this.get("note") === null) {
        $('#error-modal').modal('show');
        return;
      }*/

      this.get("store").createRecord('assessmentCode', {
        "code": this.get("newCode"),
        "name": this.get("newName")
      }).save().then(() => {
        this.set("newCode", null);
        this.set("newName", null);
      });
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
    editAssessment() {
      this.get("thisModel").save();
    },
    toggleEditModal(thisCode) {
      if (this.get("editModalShowing")) {
        $('#edit-modal-adj')
          .modal('hide');
        this.set("editModalShowing", false);
        this.set("thisModel", null);
      } else {
        $('#edit-modal-adj')
          .modal('show');
        this.set("editModalShowing", true);
        this.set("thisModel", thisCode);
      }
    },
    incrementCode(comment) {
      /*  console.log(comment);
        switch (comment) {
          case '55': var newLength = this.get('length');
            newLength += 1;
            this.set('length', newLength);
            break;
          default: break;
        }*/
       // let array=this.get('store').peekAll('assessment-code');
        //console.log(array.get('comment'));
        
        
         
   
    }
  }
}
);
