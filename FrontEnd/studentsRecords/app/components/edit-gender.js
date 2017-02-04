import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  genderName: null,
  genderModel: null,
  genInfo:null,
  selectedGender: null,
  deletable: false,

  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('gender').then(function (records) {
      self.set('genderModel', records);
    });
  },

  actions: {
    saveGender() {
      //don't set if name already exists
      if (this.get("genderName") != null) {
        this.get("store").createRecord('gender', {
          "name": this.get("genderName")
        }).save().then(() => {
          this.set("genderName", null);
        });
      }
    },

    deleteGender(){

      ///TODO STILL GETS ERRORS


      //if (deletable){
    this.get("store").findRecord('gender',  this.get("genInfo.id")
    ).then(function (gen) {
    gen.deleteRecord();
    gen.save();
    this.set('deletable', false);
});
      //}
    },

    selectGender(gender) {
      this.set('selectedGender', gender);

      //TODO: maybe move this? idk
      this.set("genInfo", this.get('store').peekRecord('gender', this.get('selectedGender')));
      if(this.get('genInfo') != null){
        this.set("deletable", true);
      }
      else{
        this.set("deletable", false);
      }
    }

  }
});
