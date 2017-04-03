import Ember from 'ember';

export default Ember.Component.extend({
  isUserFormEditing: false,
  isAssignRole: false,
  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  selectedDate: null,

  ANU01IsPermitted: Ember.computed(function () { //Add new user
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ANU01") >= 0);
    }
  }),

  didRender() {
    this._super(...arguments);
    Ember.$('#add-user-modal').modal('show');

  },


  actions: {
    saveAccount() {
      var myStore = this.get('store');
      var newUser = myStore.createRecord('user', {
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        email: this.get('email')
      });
      var self = this;
      var authentication = this.get('oudaAuth');
      newUser.save().then(function (user) {
        var newUserShadow = myStore.createRecord('password', {
          userName: self.get('userName'),
          encryptedPassword: authentication.hash(self.get('password')),
          userAccountExpiryDate: new Date(self.get('selectedDate')),
          passwordMustChanged: false,
          passwordReset: false,
          user: user
        });
        newUserShadow.save();
      });
      this.set('isUserFormEditing', false);
      Ember.$('#add-user-modal').modal('hide');
      Ember.$('#add-user-modal').remove();
    },

    assignDate(date) {
      this.set('selectedDate', date);
    },

    addNewAccount() {
      var datestring = (new Date()).toISOString().substring(0, 10);
      this.set('selectedDate', datestring);
      this.set('firstName', "");
      this.set('lastName', "");
      this.set('email', "");
      this.set('userName', "");
      this.set('password', "");
      this.set('isUserFormEditing', true);
    },

    cancel() {
      this.set('isUserFormEditing', false);
      $('add-user-modal').modal('hide');

    }
  }
});
