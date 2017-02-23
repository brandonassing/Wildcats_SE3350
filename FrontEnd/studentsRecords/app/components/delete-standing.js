import Ember from 'ember';

export default Ember.Component.extend({

    store:Ember.inject.service(),
    
    actions: {
        deleteCourse (thisCourse){
            thisCourse.set('student', null);
            thisCourse.save();
            thisCourse.destroyRecord();
        }
    }

});
