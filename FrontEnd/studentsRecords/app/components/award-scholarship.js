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
        deleteAward(){
      /*
               ///TODO STILL GETS ERRORS
    this.get("store").findRecord('award',  this.get("currentStudent.id"))
    .then(function (aw) {
      aw.destroyRecord();
    });
    */
    }
    }
});
