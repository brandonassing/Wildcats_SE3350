import Ember from 'ember';

export default Ember.Component.extend({
store: Ember.inject.service(),
  newStudent: null,
  residencyModel: null,
  selectedResidency: null,
  genderModel: null,
  selectedGender: null,
  selectedDate: null,
  //studentsRecords: null,
  studentPhoto: null,

studentModel: Ember.observer('offset', function () {
    var self = this;
    /*
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {
      self.set('studentsRecords', records);
      self.set('firstIndex', records.indexOf(records.get("firstObject")));
      self.set('lastIndex', records.indexOf(records.get("lastObject")));
      if (self.get('movingBackword')) {
        self.set('currentIndex', records.indexOf(records.get("lastObject")));
      } else {
        self.set('currentIndex', records.indexOf(records.get("firstObject")));
      }
});*/
  }),


init() {
    this._super(...arguments);
    var self = this;
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });

    this.get('store').findAll('gender').then(function (records) {
      self.set('genderModel', records);
    });
  },
  actions: {
    saveStudent() {
        ///PROBLEM: newStudent isn't assigned anything
        //MAYBE try to create empty student and then fill it with updatedStudent data

        window.alert(this.get("newStudent"));
      var updatedStudent = this.get('newStudent');
      window.alert(updatedStudent);
      window.alert("1");
      var res = this.get('store').peekRecord('residency', this.get('selectedResidency'));
      window.alert("2");
      var gen = this.get('store').peekRecord('gender', this.get('selectedGender'));
      window.alert("3");
      updatedStudent.set('genInfo', gen);
      window.alert("4");
      updatedStudent.set('DOB', new Date(this.get('selectedDate')));
      window.alert("5");
      updatedStudent.set('resInfo', res);
      window.alert("6");
/*
window.alert(updatedStudent.get('geninfo.name'));
        if(selectedGender == "Male"){
            updateStudent.set("photo", "/assets/studentsPhotos/male.png");
            window.alert("male");
        }
        else if(selectedGender == "Female"){
updateStudent.set("photo", "/assets/studentsPhotos/female.png");
window.alert("female");
        }*/

      //updatedStudent.set('transInfo', trans);
      ///add transcript saves here too


      //updatedStudent.save().then(() => {
        //     this.set('isStudentFormEditing', false);
     // });
    },
    selectGender(gender) {
      this.set('selectedGender', gender);
      //window.alert(this.get("selectedGender"));
      
    },

    selectResidency(residency) {
      this.set('selectedResidency', residency);
      //window.alert(this.get("selectedResidency"));
    },

    assignDate(date) {
      this.set('selectedDate', date);
    },
  }
    
});
