import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    currentStudent: null,
    sSModel: null,
    subjectModel: null,
    courseModel: null,
    courseGradeModel: null,


    didRender() {
        Ember.$('.menu .item').tab();
    },
    init() {
        this._super(...arguments);
        var self = this;
        this.get('store').findAll('secondary-school').then(function (records) {
            self.set('sSModel', records);
        });
        this.get("store").findAll('high-school-subject').then(function (records) {
            self.set('subjectModel', records);
        });
        this.get("store").findAll('high-school-course').then(function (records) {
            self.set('courseModel', records);
        });
        this.get('store').findAll('hs-course-grade').then(function (records) {
            self.set('courseGradeModel', records);
        });
    },

});

