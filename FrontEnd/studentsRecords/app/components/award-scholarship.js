import Ember from 'ember';

export default Ember.Component.extend({
    store:Ember.inject.service(),
    note: null,
    student: null,
    AwardModel: null,
    currentStudent:null,
    
    init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('award').then(function (records) {
      self.set('awardsModel', records);
    });
    },

    actions: {
        addAward (){
      this.get("store").createRecord('award', {
        "note": this.get("note"),
        "student": this.get("currentStudent"),
        
        }).save().then(() => {
            this.set("note",null);
        });
    },
        deleteAward(thisAward){
            if(confirm('Are you sure that you want to delete this file? \n This cannot be undone.')){
                thisAward.set('student',null);
                thisAward.save();
                thisAward.destroyRecord();
            }else{
                return;
            }









/*
            thisAward.set('student',null);
                thisAward.save();
                thisAward.destroyRecord();*/
            
        }
    }
});
