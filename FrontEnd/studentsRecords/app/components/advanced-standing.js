import Ember from 'ember';

export default Ember.Component.extend({
        store:Ember.inject.service(),
    course: null,
    description: null,
    units: null,
    grade: null,
    location: null,
    student: null,
    standingModel: null,
    currentStudent:null,

    init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('standing').then(function (records) {
      self.set('standingModel', records);
    });
    },

    actions: {
        addCourse (){
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
    },



    /*
    deleteCourse(){
        /*
               ///TODO STILL GETS ERRORS
    this.get("store").findRecord('standing',  this.get("currentStudent.id"))
    .then(function (stand) {
      stand.destroyRecord();
      //stand.save();
    });
    

    //console.log(this.get("store").findRecord('standing', this.get('currentStudent.id')));
    console.log(this.get('store').findRecord('standing',this.get(id)));

    }  */  
    }
});
