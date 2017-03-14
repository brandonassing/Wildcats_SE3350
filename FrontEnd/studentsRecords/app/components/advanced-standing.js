import Ember from 'ember';

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
    deleteCourse(standings) {
      standings.set('student',null);
      standings.save();
      standings.destroyRecord();
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
    }




  }
});
