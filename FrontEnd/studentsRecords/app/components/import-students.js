import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        //TODO streamline this to one class
        importGenders(file) {
            mongoxlsx = require('mongo-xlsx');
            var model = null;
            mongoxlsx.xlsx2MongoData(file,model,function(err, data){
                console.log(data);
            });
        },

        importAdvancedStanding() {
        
        },

        importHSCourse() {
        
        },

        importHighSchools() {
        
        },

        importResidencies() {
        
        },

        importScholarshipsAwards() {
        
        },

        importStudents() {
        
        },

        importUndergradCourses() {
        
        },

        importRecordPlans() {
        
        },

        importRecordCourses() {
        
        },

        importTermCodes() {
        
        }
    }
});
