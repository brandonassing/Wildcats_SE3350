import Ember from 'ember';

/* global $ */

export default Ember.Component.extend({
  store: Ember.inject.service(),
  showAllStudents: false,
  showFindStudents: false,
  showAddStudent: false,

  residencyModel: null,
  genderModel: null,
  selectedResidency: null,
  selectedGender: null,
  selectedDate: null,
  studentsRecords: null,
  currentStudent: null,
  currentIndex: null,
  firstIndex: 0,
  lastIndex: 0,
  studentPhoto: "",
  limit: null,
  offset: null,
  pageSize: null,
  movingBackword: false,

  tempnumber: null,
  tempfirstName: null,
  templastName: null,
  tempDOB: null,
  tempregComments: null,
  tempbasis: null,
  tempAvg: null,
  tempComments: null,
  tempPhoto: null,
  tempGen: null,
  tempRes: null,
  tempTrans: null,
  tempAward: null,
  tempHS: null,
  tempMarks: null,

  deleteModalShowing: false,

  studentModel: Ember.observer('offset', function () {
    var self = this;
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
    });

  }),

  fetchStudent: Ember.observer('currentIndex', function () {
    this.showStudentData(this.get('currentIndex'));
  }),

  init() {
    this._super(...arguments);
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });
    this.get('store').findAll('gender').then(function (records) {
      self.set('genderModel', records);
    });
    // load first page of the students records
    this.set('limit', 10);
    this.set('offset', 0);
    this.set('pageSize', 10);
    var self = this;
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {
      self.set('studentsRecords', records);
      self.set('firstIndex', records.indexOf(records.get("firstObject")));
      self.set('lastIndex', records.indexOf(records.get("lastObject")));

      // Show first student data
      self.set('currentIndex', self.get('firstIndex'));
    });
  },

  showStudentData: function (index) {
    this.set('currentStudent', this.get('studentsRecords').objectAt(index));

    this.set('tempnumber', this.get('currentStudent.number'));
    this.set('tempfirstName', this.get('currentStudent.firstName'));
    this.set('templastName', this.get('currentStudent.lastName'));
    this.set('tempDOB', this.get('currentStudent.DOB'));
    this.set('tempregComments', this.get('currentStudent.regComments'));
    this.set('tempbasis', this.get('currentStudent.basis'));
    this.set('tempAvg', this.get('current.admissionAvg'));
    this.set('tempComments', this.get('current.admissionComments'));
    this.set('tempPhoto', this.get('currentStudent.photo'));
    this.set('tempGen', this.get('currentStudent.genInfo'));
    this.set('tempRes', this.get('currentStudent.resInfo'));
    this.set('tempTrans', this.get('currentStudent.transInfo'));
    this.set('tempHS', this.get('currentStudent.highSchoolCourse'));
    this.set('tempMarks', this.get('currentStudent.term'));
    this.set('tempAward', this.get('currentStudent.awardInfo'));
    this.set('studentPhoto', this.get('currentStudent').get('photo'));
    var date = this.get('currentStudent').get('DOB');
    var datestring = date.toISOString().substring(0, 10);
    this.set('selectedDate', datestring);
  },

  didRender() {
    Ember.$('.menu .item').tab();
  },


  actions: {
    saveStudent() {
      var updatedStudent = this.get('currentStudent');

      //QUICK FIX for null selections
      if (this.get("selectedGender") == null) {
        this.set("selectedGender", this.get("currentStudent.genInfo.id"));
      }
      if (this.get("selectedResidency") == null) {
        this.set("selectedResidency", this.get("currentStudent.resInfo.id"));
      }
      /*SUPPOSED TO BE A NULL CHECK
            if( this.get('currentStudent.number')===null || this.get('currentStudent.firstName')===null || this.get('currentStudent.lastName')===null || this.get('currentStudent.DOB')===null || this.get('currentStudent.genInfo')===null || this.get('currentStudent.resInfo')===null){
                window.alert("Sorry, you cannot save a student with empty values. \n Please ensure all fields have a value.");
            }*/


      var res = this.get('store').peekRecord('residency', this.get('selectedResidency'));
      var gen = this.get('store').peekRecord('gender', this.get('selectedGender'));

      updatedStudent.set('genInfo', gen);
      updatedStudent.set('DOB', new Date(this.get('selectedDate')));
      updatedStudent.set('resInfo', res);


      updatedStudent.save().then(() => {

        //     this.set('isStudentFormEditing', false);
        this.set("selectedGender", null);
        this.set("selectedResidency", null);
        $('#save-modal').modal('show');


        /*
        $("#save-btn").popup({
            title: "Saved",
          })
          .popup('show');*/
      });
    },
    closeSaveModal() {
      $("#save-modal").modal('hide');
    },
    toggleDeleteModal() {
      if (this.get("deleteModalShowing")) {
        $('#delete-modal')
          .modal('hide');
        this.set('deleteModalShowing', false);
      } else {
        $('#delete-modal')
          .modal('show');
        this.set('deleteModalShowing', true);
      }
    },
    deleteStudent() {
      ///TODO STILL GETS ERRORS
      this.get("store").findRecord('student', this.get("currentStudent.id"))
        .then(function (stud) {
          stud.destroyRecord();
          //stud.save();
        });
      /*
         if (this.get("currentIndex") >= this.get("lastIndex")){
           this.currentIndex = this.firstIndex;
           //ERROR this will cause problems on the last offset
           this.offset +=10;
        }
        else{
          this.currentIndex += 1;
        }
        */
    },

    firstStudent() {
      this.set('currentIndex', this.get('firstIndex'));
    },

    nextStudent() {
      //ERROR: change gen/res -> next -> prev doesn't change gen/res back

      this.set('movingBackword', false);
      if (this.get('currentIndex') < this.get('lastIndex')) {
        this.set('currentIndex', this.get('currentIndex') + 1);
        //     console.log(JSON.stringify(this.get('currentStudent')));
      } else {
        this.set('offset', this.get('offset') + this.get('pageSize'));
      }
    },

    previousStudent() {
      this.set('movingBackword', true);
      if (this.get('currentIndex') > 0) {
        this.set('currentIndex', this.get('currentIndex') - 1);
      } else if (this.get('offset') > 0) {
        this.set('offset', this.get('offset') - this.get('pageSize'));
      }
    },

    lastStudent() {
      this.set('currentIndex', this.get('lastIndex'));
    },

    allStudents() {
      this.set('showAllStudents', true);
      this.set('showFindStudents', false);
      this.set('showAddStudent', false);
    },

    findStudent() {
      this.set('showFindStudents', true);
      this.set('showAllStudents', false);
      this.set('showAddStudent', false);
    },

    addStudent() {
      this.set('showFindStudents', false);
      this.set('showAllStudents', false);
      this.set('showAddStudent', true);
    },
    selectGender(gender) {
      this.set('selectedGender', gender);
    },

    selectResidency(residency) {
      this.set('selectedResidency', residency);
    },

    assignDate(date) {
      this.set('selectedDate', date);
    },

    undoSave() {
      this.set('currentStudent.number', this.get('tempnumber'));
      this.set('currentStudent.firstName', this.get('tempfirstName'));
      this.set('currentStudent.lastName', this.get('templastName'));
      this.set('currentStudent.DOB', this.get('tempDOB'));
      this.set('currentStudent.regComments', this.get('tempregComments'));
      this.set('currentStudent.basis', this.get('tempbasis'));
      this.set('currentStudent.admissionAvg', this.get('tempAvg'));
      this.set('currentStudent.admissionComments', this.get('tempComments'));
      this.set('currentStudent.photo', this.get('tempPhoto'));
      this.set('currentStudent.genInfo', this.get('tempGen'));
      this.set('currentStudent.resInfo', this.get('tempRes'));
      this.set('currentStudent.transInfo', this.get('tempTrans'));
      this.set('currentStudent.awardInfo', this.get('tempAward'));
      this.set('currentStudent.highSchoolCourse', this.get('tempHS'));
      this.set('currentStudent.term', this.get('tempMarks'));
    }
  }
});
