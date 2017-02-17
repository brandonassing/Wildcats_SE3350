import Ember from 'ember';

export default Ember.Component.extend({

  store: Ember.inject.service(),
  limit: 10,
  OFFSET: 0,
  pageSize: 10,
  prevOffset: 0,

  studentsModel: null,
  INDEX: null,
  notDONE: null,

  init(){
    this._super(...arguments);

    this.set("prevOffset", this.get("OFFSET"));
  },
  actions: {
    loadNext: function () {
      this.set('OFFSET', this.get('OFFSET') + this.get('pageSize'));
    },

    loadPrevious: function () {
      if (this.get('OFFSET') >= this.get('pageSize')) {
        this.set('OFFSET', this.get('OFFSET') - this.get('pageSize'));
      }
    },

    getStudent: function (student) {
      var index = this.get('studentsModel').indexOf(student);
      this.set('INDEX', index);
      this.set('notDONE', false);

    },
    exit: function () {
      this.set('OFFSET', this.get("prevOffset"));
      this.set('notDONE', false);
    }
  }
});
