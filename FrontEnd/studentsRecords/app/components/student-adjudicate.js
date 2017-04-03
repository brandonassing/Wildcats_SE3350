import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    addModalShowing: false,
    assessmentModel: null,

    didRender() {
        Ember.$('.menu .item').tab();
    },
    init() {
        this._super(...arguments);
        var self = this;
        this.get('store').findAll('assessment-code').then(function (records) {
            self.set('assessmentModel', records);
        });
    },
    actions: {
        addThisCode() {
                this.get("store").createRecord('adjudication', {
                "student": this.get("currentStudent"),
                "assessment-code": this.get("thisCode")
            });            
        },
        removeCode(thisOne){
            thisOne.set('student',null);
            thisOne.set('assessment-code',null);
            thisOne.destroyRecord();
            this.get("currentStudent").save();
        },
        toggleAddModal() {
            if (this.get("addModalShowing")) {
                $('#add-modal-adj')
                    .modal('hide');
                this.set("addModalShowing", false);
            } else {
                $('#add-modal-adj')
                    .modal('show');
                this.set("addModalShowing", true);
            }
        },
    }
});
