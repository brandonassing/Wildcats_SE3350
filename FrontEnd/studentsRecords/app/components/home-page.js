import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
//    Ember.$('.tabular.menu .item').tab();
    Ember.$(document).ready(function(){
      Ember.$('.ui .item').on('click', function() {
        Ember.$('.ui .item').removeClass('active');
        Ember.$(this).addClass('active');
      });
    });
  },





  isHomeShowing: true,
  isStudentsRecordsDataEntry: false,
  isAboutShowing: false,
  isAddStudShowing: false,
  isEditRes: false,
  isEditGen: false,

  actions: {
    home () {
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', true);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAboutShowing', false);
      this.set('isEditResShowing', false);
      this.set('isEditGenShowing', false);
    },

    studentsDataEntry (){
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', true);
      this.set('isAboutShowing', false);
      this.set('isEditResShowing', false);
      this.set('isEditGenShowing', false);
    },

    about (){
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAboutShowing', true);
      this.set('isEditResShowing', false);
      this.set('isEditGenShowing', false);
    },

    addStudent(){
      this.set('isAddStudShowing', true);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAboutShowing', false);
      this.set('isEditResShowing', false);
      this.set('isEditGenShowing', false);
    },
    editResidency(){
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAboutShowing', false);
      this.set('isEditResShowing', true);
      this.set('isEditGenShowing', false);
    },
    editGender(){
      this.set('isAddStudShowing', false);
      this.set('isHomeShowing', false);
      this.set('isStudentsRecordsDataEntry', false);
      this.set('isAboutShowing', false);
      this.set('isEditResShowing', false);
      this.set('isEditGenShowing', true);
    }
  }
});
