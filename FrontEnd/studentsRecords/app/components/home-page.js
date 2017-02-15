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

  isHomeShowing: true,
  isStudentsRecordsDataEntry: false,
  isAddStudShowing: false,
  isEditSysShowing: false,

  actions: {
    home() {
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', true);
      this.set('isStudentsRecordsDataEntry', false);      
      this.set('isEditSysShowing', false);
    },

    studentsDataEntry() {
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', true);      
      this.set('isEditSysShowing', false);
    },

    addStudent() {
      this.set('isAddStudShowing', true);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isEditSysShowing', false);
    },
    editSystemCode() {
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isEditSysShowing', true);
    }
  }
});
