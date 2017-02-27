import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    //TODO streamline this to one class
    importGenders() {
      var file = $("#import-gender")[0].files[0];
      //var file = document.querySelector('#gender-import > input[type=file]').files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        /*$post('./genders/import', {
          file: btoa(event.target.result)
        });*/
        //window.alert("4");
        //window.alert(event.target.result);
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
