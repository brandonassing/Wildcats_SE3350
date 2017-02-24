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
    isEditing:false,
    standings: null,

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
    deleteCourse(thisCourse){
        if(confirm('Are you sure that you want to delete this course? \n This cannot be undone')){
            thisCourse.set('student', null);
            thisCourse.save();
            thisCourse.destroyRecord();
        }else{
            return;
        }
    },
    editCourse(){
        this.set('isEditing',true);

    },
    saveCourse(thisCourse){
        if(confirm('Are you sure you want to save? \n All previous information will be lost.')){
            thisCourse.save();
            this.set('isEditing', false);
        }else{
            return;
        }

    },
    cancelEdit(){
        this.set('isEditing',false);
    }




    }
});
