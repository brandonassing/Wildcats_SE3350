import Ember from 'ember';

export default Ember.Component.extend({
    store:Ember.inject.service(),

    actions: {
        deleteAward(thisAward){
            thisAward.set('student',null);
            thisAward.save();
            thisAward.destroyRecord();
        }
    }
});
