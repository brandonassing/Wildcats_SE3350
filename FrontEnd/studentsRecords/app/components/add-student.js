import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  notDONE: true,
  number: null,
  firstname: null,
  lastname: null,
  geninfo: null,
  resinfo: null,
  newStudent: null,
  residencyModel: null,
  selectedResidency: null,
  genderModel: null,
  selectedGender: null,
  selectedDate: null,
  //studentsRecords: null,
  studentPhoto: null,
  //isEmpty: true,
  nullNumber: false,
  nullFName: false,
  nullLName: false,
  nullGInfo: false,
  nullResInfo: false,
  nullDOB: false,




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
      //
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
  nullCheck() {
    //modal for student with null values
    if (this.get("number") === null) {
      this.set('nullNumber', true);
      console.log(this.get("number"));
    } else {
      this.set('nullNumber', false);
    }

    if (this.get("firstname") === null) {
      this.set('nullFName', true);
    } else {
      this.set('nullFName', false);
    }

    if (this.get("lastname") === null) {
      this.set('nullLName', true);
    } else {
      this.set('nullLName', false);
    }

    if (this.get("selectedGender") === null) {
      this.set("nullGInfo", true);
    } else {
      this.set("nullGInfo", false);
    }

    if (this.get("selectedDate") === null) {
      this.set("nullDOB", true);
    } else {
      this.set("nullDOB", false);
    }

    if (this.get("selectedResidency") === null) {
      this.set("nullResInfo", true);
    } else {
      this.set("nullResInfo", false);
    }

  },
  actions: {
    saveStudent() {

      //TODO set default gender and residency
      //ERROR bc of offset, all students: selecting first student in list doesn't work.
      //ERROR offset in general throws everything off

      this.set('resInfo', this.get('store').peekRecord('residency', this.get('selectedResidency')));
      this.set("genInfo", this.get('store').peekRecord('gender', this.get('selectedGender')));

      if (this.get("genInfo.name") === "Male") {
        this.set('studentPhoto', "/assets/studentsPhotos/male.png");
      } else if (this.get("genInfo.name") === "Female") {
        this.set('studentPhoto', "/assets/studentsPhotos/female.png");
      }



      this.nullCheck();
      if ((this.get('nullNumber') === true) || (this.get('nullFName') === true) || (this.get('nullLName') === true) || (this.get('nullGInfo') === true) || (this.get('nullResInfo') === true)) {
        $('#error-Modal').modal('show');
        return;
      }

      this.get("store").createRecord('student', {
        "number": this.get("number"),
        "firstName": this.get("firstname"),
        "lastName": this.get("lastname"),
        "photo": this.get('studentPhoto'),
        "DOB": new Date(this.get('selectedDate')),
        "resInfo": this.get('resInfo'),
        "genInfo": this.get('genInfo'),
        "regComments": "NONE FOUND",
        "basis": "NONE FOUND",
        "admissionAvg": "NONE FOUND",
        "admissionComments": "NONE FOUND"
      }).save().then(() => {
        this.set("number", null);
        this.set("firstname", null);
        this.set("lastname", null);
        this.set("studentPhoto", null);
        this.set("selectedDate", null);
        this.set("selectedGender", null);
        this.set("selectedResidency", null);
        this.set('notDONE', false);

      });

      /*
              window.alert(this.get("newStudent"));
            var updatedStudent = this.get('newStudent');
            var res = this.get('store').peekRecord('residency', this.get('selectedResidency'));
            var gen = this.get('store').peekRecord('gender', this.get('selectedGender'));
            updatedStudent.set('genInfo', gen);
            updatedStudent.set('DOB', new Date(this.get('selectedDate')));
            updatedStudent.set('resInfo', res);
            */

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
    closeErrorModal() {
      $("#error-Modal").modal('hide');
    },

    exit() {
      this.set('notDONE', false);
    }

  }
});
