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
      var index = this.get('studentsModel').indexOf(student);
      this.set('INDEX', index);

    },

    exit: function () {
      this.set('notDONE', false);
      Ember.$('.ui.modal').modal('hide');
      $(this).data('modal', null);
    }
  },

  didRender() {
    Ember.$('.ui.modal')
      .modal({
        closable: true,
      })
      .modal('show');
  }
});
