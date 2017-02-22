import Ember from 'ember';

export default Ember.Component.extend({
    store:Ember.inject.service(),
    addCourse: false,
    course: null,
    description: null,
    units: null,
    grade: null,
    location: null,
    student: null,
    standingModel: null,
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
    this.get('store').findAll('standing').then(function (records) {
      self.set('standingModel', records);
    });
    },

      showStudentData: function (index) {
    this.set('currentStudent', this.get('studentsRecords').objectAt(index));

      },


    actions: {
        addCourse (){
      this.set('addCourse', true);
    },
        cancelAdd(){
      this.set('addCourse', false);
    },

    saveCourse(){
     //   console.log(studentInfo);
        this.get("store").createRecord('standing', {
        "course": this.get("course"),
        "description": this.get("description"),
        "units": this.get("units"),
        "grade": this.get("grade"),
        "location":this.get("location"),
        "student" : this.get("currentStudent"),
        
        }).save().then(() => {
            this.set("course",null);
            this.set("description", null);
            this.set("units",null);
            this.set("grade",null);
            this.set("location",null);
        });
    }
    
    }
});
