import Ember from 'ember';

export default Ember.Component.extend({
    didInsertElement() {
        //    Ember.$('.tabular.menu .item').tab();
        Ember.$(document).ready(function() {
            Ember.$('.ui .item').on('click', function() {
                Ember.$('.ui .item').removeClass('active');
                Ember.$(this).addClass('active');
            });
        });
    },

    routing: Ember.inject.service('-routing'),
    store: Ember.inject.service(),
    name: null,

    isHomeShowing: true,
    isStudentsRecordsDataEntry: false,
    isAddStudShowing: false,
    isEditSysShowing: false,
    isImportRecordsShowing: false,

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
        },

        studentsDataEntry() {
            this.set('isAddStudShowing', false);
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', true);
            this.set('isEditSysShowing', false);
            this.set('isImportRecordsShowing', false);
        },

        addStudent() {
            this.set('isAddStudShowing', true);
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isEditSysShowing', false);
            this.set('isImportRecordsShowing', false);
        },
        editSystemCode() {
            this.set('isAddStudShowing', false);
            this.set('isHomeShowing', false);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isEditSysShowing', true);
            this.set('isImportRecordsShowing', false);
        },
        importStudentRecords() {
            this.set('isImportRecordsShowing', true);
            this.set('isAddStudShowing', false);
            this.set('isStudentsRecordsDataEntry', false);
            this.set('isHomeShowing', false);
            this.set('isEditSysShowing', false);
        }
    }
});