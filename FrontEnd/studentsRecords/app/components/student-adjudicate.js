import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    addModalShowing: false,
    assessmentModel: null,
    adjudicationModel: null,
    aCode: null,
    currentStudent: null,


    didRender() {
        Ember.$('.menu .item').tab();
    },
    init() {
        this._super(...arguments);
        var self = this;
        this.get('store').findAll('adjudication').then(function (records) {
            self.set('adjudicationModel', records);
        });
        this.get('store').findAll('assessment-code').then(function (records) {
            self.set('assessmentModel', records);
        });
    },
    actions: {
        addThisCode() {
            window.alert(this.get("aCode"));
                this.get("store").createRecord('adjudication', {
                "student": this.get("currentStudent"),
                "assessment-code": this.get("aCode"),
                "date": '200'

            }).save().then(()=>{
                this.send('toggleAddModal');
            });            
        },
        removeCode(adjudes){
            adjudes.set('student',null);
            adjudes.set('assessment-code',null);
            adjudes.destroyRecord();
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
        clearStore(){
            this.get('store').findAll('adjudication').then(function(record){
            record.content.forEach(function(rec) {
            Ember.run.once(this, function() {
           rec.deleteRecord();
           rec.save();
        });
     }, this);
  });
        }
    }
});
