import Ember from 'ember';

export default Ember.Component.extend({
    store:Ember.inject.service(),
    addAward: false,
    note: null,
    student: null,
    AwardModel: null,
    currentStudent:null,
    



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
    var self = this;
    this.get('store').findAll('award').then(function (records) {
      self.set('awardsModel', records);
    });
    },

      showStudentData: function (index) {
    this.set('currentStudent', this.get('studentsRecords').objectAt(index));

      },


    actions: {
        addAward (){
      this.set('addAward', true);
    },
        cancelAdd(){
      this.set('addAward', false);
    },

    saveAward(){
        console.log(this.get("awardsModel"));
        console.log(this.get("currentStudent.firstName"));


        this.get("store").createRecord('award', {
        "note": this.get("note"),
        "student": this.get("currentStudent"),
        
        }).save().then(() => {
            this.set("note",null);
        });
    }
    
    }
});
