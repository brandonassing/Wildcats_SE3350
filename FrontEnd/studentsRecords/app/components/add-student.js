import Ember from 'ember';

export default Ember.Component.extend({
store: Ember.inject.service(),
newStudent: null,
  residencyModel: null,
  selectedResidency: null,
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
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });

    var self = this;
  },
  actions: {
    saveStudent() {
      var updatedStudent = this.get('newStudent');
      var res = this.get('store').peekRecord('residency', this.get('selectedResidency'));
      ///////////////////////////////
      var gen = this.get('store').peekRecord('gender', this.get('selectedGender'));
      ///////////////////////////////
      //updatedStudent.set('gender', this.get('selectedGender'));
      updatedStudent.set('genInfo', gen);
      updatedStudent.set('DOB', new Date(this.get('selectedDate')));
      updatedStudent.set('resInfo', res);

      //updatedStudent.set('transInfo', trans);
      ///add transcript saves here too


      updatedStudent.save().then(() => {
        //     this.set('isStudentFormEditing', false);
      });
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
  }
    
});
