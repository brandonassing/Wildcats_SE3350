import Ember from 'ember';

export default Ember.Component.extend({
  
  store: Ember.inject.service(),
  limit: 10,
  OFFSET: 0,
  pageSize: 10,
  prevOffset: 0,

  studentsModel: null,
  INDEX: null,
  notDONE: null,
  firstNameSearch: null,
  idSearch: null,
  lastNameSearch: null,
  searchedRecords: null,

  init(){
    this._super(...arguments);

    this.set("prevOffset", this.get("OFFSET"));
  },
  actions:{
    search: function () {
    //TODO try printing out studentsModel or records or store.get('student') or SOMETHING

    //doesn't work bc Ouda's student num is an int and every save/addition is a string
    var self = this;
    this.get('store').query('student', {
      firstName: self.get('firstNameSearch'),
      lastName: self.get('lastNameSearch'),
      number: self.get('idSearch')
    }).then(function (records) {
      console.log(records);
      self.set('searchedRecords', records);
    });
  },

    getStudent: function (student) {
     // var offset = 60;
      //this.set('OFFSET', offset);
      var index = this.get('studentsModel').indexOf(student);
      //ERROR TODO can only get student if on the same offset!!!
      //ERROR first search sets index to 0 and the second one works??????? only when hard-setting index???
      this.set('INDEX', index);
      this.set('notDONE', false);
    },

    exit: function () {
      this.set('offset', this.get("prevOffset"));
      this.set('notDONE', false);
    }
  }
});