import Ember from 'ember';
//import XLSX from 'xlsx';


/* global XLSX */


export default Ember.Component.extend({

  tableHeader: [],
  tableData: null,
  isLoading: false,

  actions: {

    fileImport: function (file) {
      this.set('isLoading', true);
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        if (cellName[0] === '!') {
          continue;
        }
        row = cellName.slice(1) - 1;
        col = cellName.charCodeAt(0) - 65;
        data[size++] = [];
        if (row === 0) {
          header[col] = worksheet[cellName].v;

        } else {
          data[row][col] = worksheet[cellName].v;
        }
      }
      this.set('tableHeader', header);
      this.set('tableData', data);
    },

    

    done: function () {
      this.set('isLoading', false);
    },

    cancel: function () {
      this.get('routing').transitionTo('posts');
    }
  }
});
