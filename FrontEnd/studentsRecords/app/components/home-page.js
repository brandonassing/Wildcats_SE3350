import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    //    Ember.$('.tabular.menu .item').tab();
    Ember.$(document).ready(function () {
      Ember.$('.ui .item').on('click', function () {
        Ember.$('.ui .item').removeClass('active');
        Ember.$(this).addClass('active');
      });
    });
  },

  ADM01IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ADM01") >= 0);
    }
  }),
  ID001IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ID001") >= 0);
    }
  }),
  EUP01IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("EUP01") >= 0);
    }
  }),

  routing: Ember.inject.service('-routing'),
  store: Ember.inject.service(),
  name: null,

  isHomeShowing: true,
  isStudentsRecordsDataEntry: false,
  isAddStudShowing: false,
  isEditSysShowing: false,
  isImportRecordsShowing: false,
  isAdminShowing: false,
  isProfileShowing: false,

  actions: {
    logout() {
      this.get('oudaAuth').close();
      this.get('routing').transitionTo('login');
    },
    home() {
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', true);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isEditSysShowing', false);
      this.set('isImportRecordsShowing', false);
      this.set('isAdminShowing', false);
      this.set('isProfileShowing', false);
    },

    studentsDataEntry() {
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', true);
      this.set('isEditSysShowing', false);
      this.set('isImportRecordsShowing', false);
      this.set('isAdminShowing', false);
      this.set('isProfileShowing', false);
    },

    addStudent() {
      this.set('isAddStudShowing', true);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isEditSysShowing', false);
      this.set('isImportRecordsShowing', false);
      this.set('isAdminShowing', false);
      this.set('isProfileShowing', false);
    },
    editSystemCode() {
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isEditSysShowing', true);
      this.set('isImportRecordsShowing', false);
      this.set('isAdminShowing', false);
      this.set('isProfileShowing', false);
    },
    importStudentRecords() {
      this.set('isImportRecordsShowing', true);
      this.set('isAddStudShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isHomeShowing', false);
      this.set('isEditSysShowing', false);
      this.set('isAdminShowing', false);
      this.set('isProfileShowing', false);
    },
    admin() {
      this.set('isImportRecordsShowing', false);
      this.set('isAddStudShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isHomeShowing', false);
      this.set('isEditSysShowing', false);
      this.set('isAdminShowing', true);
      this.set('isProfileShowing', false);
    },
    profile() {
      this.set('isImportRecordsShowing', false);
      this.set('isAddStudShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isHomeShowing', false);
      this.set('isEditSysShowing', false);
      this.set('isAdminShowing', false);
      this.set('isProfileShowing', true);
    }
  }
});
