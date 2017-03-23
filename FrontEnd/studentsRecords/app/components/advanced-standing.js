import Ember from 'ember';

/* global $ */

export default Ember.Component.extend({
  store: Ember.inject.service(),
  course: null,
  description: null,
  units: null,
  grade: null,
  location: null,
  student: null,
  standingModel: null,
  currentStudent: null,
  isEditing: false,
  standings: null,
  deleteModalShowing: false,

  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('standing').then(function (records) {
      self.set('standingModel', records);
    });
  },

  actions: {
    addCourse() {
      if(this.get("course")===null||this.get("description")===null||this.get("units")===null||this.get("grade")===null||this.get("location")===null){
        //window.alert("sorry, you cant add a course with empty values");
        $('#error-modal').modal('show');
        return;
      }
      this.get("store").createRecord('standing', {
        "course": this.get("course"),
        "description": this.get("description"),
        "units": this.get("units"),
        "grade": this.get("grade"),
        "location": this.get("location"),
        "student": this.get("currentStudent"),

      }).save().then(() => {
        this.set("course", null);
        this.set("description", null);
        this.set("units", null);
        this.set("grade", null);
        this.set("location", null);
      });
    },
    toggleDeleteModal() {
      if (this.get("deleteModalShowing")) {
        $('#delete-modal-standing')
          .modal('hide');
        this.set("deleteModalShowing", false);
      } else {
        $('#delete-modal-standing')
          .modal('show');
        this.set("deleteModalShowing", true);
      }
    },
    deleteCourse(standing) {
      standing.set('student', null);
      standing.destroyRecord();
      //standing.save();
      //console.log(standing.get('isDeleted'));
    },
    editCourse() {
      this.set('isEditing', true);

    },
    saveCourse(thisCourse) {
      thisCourse.save();
      this.set('isEditing', false);

    },
    cancelEdit() {
      this.set('isEditing', false);
    },
    closeErrorModal(){
      $("#error-modal").modal('hide');
    }




  }
});
