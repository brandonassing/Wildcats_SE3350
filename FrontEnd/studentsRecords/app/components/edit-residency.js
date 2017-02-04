import Ember from 'ember';

export default Ember.Component.extend({
store: Ember.inject.service(),
residencyName: null,

  actions: {
    saveResidency() {

if (this.get("residencyName") != null) {
this.get("store").createRecord('residency', {
  "name": this.get("residencyName")
}).save().then(() => {
  this.set("residencyName", null);
});
  
}
}
  }
});
