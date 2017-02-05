import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  residencyName: null,
  residencyModel: null,
  resInfo:null,
  selectedResidency: null,
  deletable: false,
init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });
  },
  actions: {
    saveResidency() {

      if (this.get("residencyName") != null) {
        this.get("store").createRecord('residency', {
          "name": this.get("residencyName")
        }).save().then(() => {
          this.set("residencyName", null);
        });
      }
    },
    deleteResidency(){

      ///TODO STILL GETS ERRORS


    if (this.get("deletable")){
    this.get("store").findRecord('residency',  this.get("resInfo.id")
    ).then(function (res) {
    res.destroyRecord();
    //res.save();
});

    this.set('deletable', false);
      }
    },
    selectResidency(residency) {
      this.set('selectedResidency', residency);

      //TODO: maybe move this? idk
      this.set("resInfo", this.get('store').peekRecord('residency', this.get('selectedResidency')));
      if(this.get('resInfo') != null){
        this.set("deletable", true);
      }
      else{
        this.set("deletable", false);
      }
    }
    
  }
});

