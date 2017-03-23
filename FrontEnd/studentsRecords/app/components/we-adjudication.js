import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    adjudicationModel:null,
    assessmentModel:null,
    faculty:null,
    department:null,
    pAdministration:null,

    init(){
      this._super(...arguments);
    var self = this;
    this.get('store').findAll('assessment-code').then(function (records) {
      self.set('assessmentModel', records);
    });
    },
    didRender() {
    Ember.$('.menu .item').tab();
  },
  actions:{
    addNewCode(){
      
    },

  }
  
});
