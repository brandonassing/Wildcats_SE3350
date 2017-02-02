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

  actions:{
    search: function() {

    },
  },

  didRender() {
    Ember.$('.ui.modal')
      .modal({
        closable: true,
      })
      .modal('show');
  }
});
