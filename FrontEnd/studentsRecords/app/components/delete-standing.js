import Ember from 'ember';

export default Ember.Component.extend({

    store:Ember.inject.service(),
    
    isEditing:false,

    actions: {
        deleteCourse (thisCourse){
            this.set('isEditing',false);
            thisCourse.set('student', null);
            thisCourse.save();
            thisCourse.destroyRecord();
        }
    }

});
