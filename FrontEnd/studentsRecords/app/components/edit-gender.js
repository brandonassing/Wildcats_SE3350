import Ember from 'ember';

export default Ember.Component.extend({
store: Ember.inject.service(),
genderName: null,

  actions: {
    saveGender() {

if (this.get("genderName") != null) {
this.get("store").createRecord('gender', {
  "name": this.get("genderName")
}).save().then(() => {
  this.set("genderName", null);
});
  
}
}
  }
});