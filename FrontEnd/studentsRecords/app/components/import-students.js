import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    //TODO streamline this to one class
    importGenders() {
      var file = $("#import-gender")[0].files[0];
      //var file = document.querySelector('#gender-import > input[type=file]').files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        $.ajax({
          type: "POST",
          url: "http://localhost:3700/genders/import",
          dataType: 'json',
          async: false,
          data: '{"file": "' + btoa(event.target.result) + '"}',
          success: function () {
            alert('Thanks for your comment!');
          }
        });
      };

      if (file) {
        reader.readAsBinaryString(file);
      }

    },

    importAdvancedStanding() {

    },

    importHSCourse() {

    },

    importHighSchools() {

    },

    importResidencies() {

    },

    importScholarshipsAwards() {

    },

    importStudents() {

    },

    importUndergradCourses() {

    },

    importRecordPlans() {

    },

    importRecordCourses() {

    },

    importTermCodes() {

    }
  }
});
