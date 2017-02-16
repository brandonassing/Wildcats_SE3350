import Ember from 'ember';

export default Ember.Component.extend({
  
  store: Ember.inject.service(),
  limit: 10,
  offset: 0,
  pageSize: 10,

  studentsModel: null,
  INDEX: null,
  notDONE: null,
  firstNameSearch: null,
  idSearch: null,
  lastNameSearch: null,
  searchedRecords: null,

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
      var offset = 20;
      this.set('offset', offset);
      var index = this.get('studentsModel').indexOf(student);
      //ERROR TODO can only get student if on the same offset!!!
      //set index and offset here
      this.set('INDEX', index);
    },

    exit: function () {
      this.set('notDONE', false);
    }
  }
});
