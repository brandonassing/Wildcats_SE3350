import Ember from 'ember';
/* global XLSX */
/* global $ */

export default Ember.Component.extend({

  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  tableHeader: [],
  tableData: null,
  isLoading: false,
  noticeModalShowing: false,
  firstRender: true,
  deleteModalShowing: false,

  ID001IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ID001") >= 0);
    }
  }),

  init() {
    this._super(...arguments);
    var self = this;
    this.get('store').findAll('residency');
    this.get('store').findAll('gender');
  },
  didRender() {
    if (this.get("firstRender")) {
      this.set("noticeModalShowing", true);
      $("#import-notice-modal").modal("show");
    }
    this.set("firstRender", false);
  },
  actions: {
    clearDatabase() {

    },
    toggleDeleteModal() {
      if (this.get("deleteModalShowing")) {
        $('#clear-db-modal')
          .modal('hide');
        this.set('deleteModalShowing', false);
      } else {
        $('#clear-db-modal')
          .modal('show');
        this.set('deleteModalShowing', true);
      }
    },
    toggleNoticeModal() {
      if (this.get("noticeModalShowing")) {
        $("#import-notice-modal").modal("hide");
        this.set("noticeModalShowing", false);
      } else {
        $("#import-notice-modal").modal("show");
        this.set("noticeModalShowing", true);
      }
    },
    done() {
      this.set("isLoading", false);
    },
    fileImported: function (file) {
      this.set('isLoading', true);
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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

    getGenderData: function (file) {
      var myStore = this.get('store');
      /*
      myStore.findAll('gender').then(function (genders) {
        genders.forEach(function (sex) {
          sex.set('name', null);
          sex.save().then(function () {
            sex.destroyRecord();
          });
        });
      });
      */
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
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);

      data.forEach(function (row) {
        if (row[0]) {
          var newGender = myStore.createRecord('gender', {
            name: row[0]
          });
          newGender.save().then(function () {
            myStore.findAll('gender');
          });
        }
      });
      this.set('isLoading', true);
    },

    deleteResidency: function () {
      this.get('store').findAll('residency').then(function (residencies) {
        residencies.forEach(function (oneResidency) {
          oneResidency.set('students', []);
          oneResidency.save().then(function () {
            oneResidency.destroyRecord();
          });
        });
      });
    },

    getResidencyData: function (file) {
      /*
      this.get('store').findAll('residency').then(function (residencies) {
        residencies.forEach(function (oneResidency) {
          oneResidency.set('students', []);
          oneResidency.save().then(function () {
            oneResidency.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');
      data.forEach(function (row) {
        if (row[0]) {
          var newResidency = myStore.createRecord('residency', {
            name: row[0]
          });
          newResidency.save().then(function () {
            myStore.findAll('residency');
          });
        }
      });

      this.set('isLoading', true);
    },

    deleteStudents: function () {
      this.get('store').findAll('student').then(function (students) {
        students.forEach(function (oneStudent) {
          oneStudent.set('residency', null);
          oneStudent.set('gender', null);
          oneStudent.set('advancedStanding', []);
          oneStudent.set('scholarshipAndAward', []);
          oneStudent.set('term', []);
          oneStudent.save().then(function () {
            oneStudent.destroyRecord();
          });
        });
      });
    },

    getStudentsData: function (file) {
      /*
      this.get('store').findAll('student').then(function (students) {
        students.forEach(function (oneStudent) {
          oneStudent.set('residency', null);
          oneStudent.set('gender', null);
          oneStudent.set('advancedStanding', []);
          oneStudent.set('scholarshipAndAward', []);
          oneStudent.set('term', []);
          oneStudent.save().then(function () {
            oneStudent.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');

      var genderModel = myStore.peekAll('gender');
      console.log(genderModel);
      var resModel = myStore.peekAll('residency');


      var genderMap = {};
      genderModel.forEach(function (gender) {
        genderMap[JSON.parse(JSON.stringify(gender)).name] = gender;
      });
      console.log (genderMap);
      var resMap = {};
      resModel.forEach(function (res) {
        resMap[JSON.parse(JSON.stringify(res)).name] = res;
      });

      data.forEach(function (row) {
        if (row[0]) {
          var newStudents = myStore.createRecord('student', {
            number: row[0],
            firstName: row[1],
            lastName: row[2],
            genInfo: genderMap[row[3]],
            DOB: new Date(row[4]),
            photo: "",
            regComments: "NONE FOUND",
            basis: "NONE FOUND",
            admissionAvg: "NONE FOUND",
            admissionComments: "NONE FOUND",
            resInfo: resMap[row[5]]
          });
          newStudents.save();
        }
      });

      this.set('isLoading', true);
    },

    deleteTermCodes: function () {
      this.get('store').findAll('termCode').then(function (codes) {
        codes.forEach(function (codes) {
          codes.set('name', null);
          codes.save().then(function () {
            codes.destroyRecord();
          });
        });
      });
    },

    deleteAdvancedStandings: function () {
      this.get('store').findAll('standing').then(function (standings) {
        standings.forEach(function (oneStanding) {
          oneStanding.set('student', null);
          oneStanding.set('course', null);
          oneStanding.set('description', null);
          oneStanding.set('units', null);
          oneStanding.set('grade', null);
          oneStanding.set('location', null);
          oneStanding.save().then(function () {
            oneStanding.destroyRecord();
          });
        });
      });
    },

    getAdvancedStandingData: function (file) {
      /*
      this.get('store').findAll('standing').then(function (standings) {
        standings.forEach(function (oneStanding) {
          oneStanding.set('student', null);
          oneStanding.set('course', null);
          oneStanding.set('description', null);
          oneStanding.set('units', null);
          oneStanding.set('grade', null);
          oneStanding.set('location', null);
          oneStanding.save().then(function () {
            oneStanding.destroyRecord();
          });
        });
      });
      */
      console.log("Entered Advanced");
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      console.log("Part2");
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');

      console.log("Part3");
      data.forEach(function (row) {
        if (row[0]) {
          console.log("Part 5");
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (num) {
            var newAdvancedStanding = myStore.createRecord('standing', {
              course: row[1],
              description: row[2],
              units: row[3],
              grade: row[4],
              location: row[5],
              student: num,
            });
            console.log("Part4");
            newAdvancedStanding.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    deleteAwards: function () {
      this.get('store').findAll('award').then(function (awards) {
        awards.forEach(function (oneAward) {
          oneAward.set('student', null);
          oneAward.set('note', null);
          oneAward.save().then(function () {
            oneAward.destroyRecord();
          });
        });
      });
    },

    getAwardsData: function (file) {
      /*
      this.get('store').findAll('award').then(function (awards) {
        awards.forEach(function (oneAward) {
          oneAward.set('student', null);
          oneAward.set('note', null);
          oneAward.save().then(function () {
            oneAward.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (num) {
            var newAward = myStore.createRecord('award', {
              student: num,
              note: row[1],
            });
            newAward.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    deleteCourseGrades: function () {
      this.get('store').findAll('hsCourseGrade').then(function (hsCourseGrade) {
        hsCourseGrade.forEach(function (onehsCourseGrade) {
          onehsCourseGrade.set('student', null);
          onehsCourseGrade.set('source', null);
          onehsCourseGrade.set('mark', null);
          onehsCourseGrade.save().then(function () {
            onehsCourseGrade.destroyRecord();
          });
        });
      });
    },


    deleteHighSchoolCourses: function () {
      this.get('store').findAll('highSchoolCourse').then(function (highSchoolCourses) {
        highSchoolCourses.forEach(function (oneHighSchoolCourse) {
          oneHighSchoolCourse.set('level', null);
          oneHighSchoolCourse.set('source', null);
          oneHighSchoolCourse.set('unit', null);
          oneHighSchoolCourse.set('school', null);
          oneHighSchoolCourse.set('course', null);
          oneHighSchoolCourse.set('hsCourseGrades', null);
          oneHighSchoolCourse.save().then(function () {
            oneHighSchoolCourse.destroyRecord();
          });
        });
      });
    },



    deleteHighSchool: function () {
      this.get('store').findAll('secondarySchool').then(function (highSchools) {
        highSchools.forEach(function (oneHighSchool) {
          oneHighSchool.set('name', null);
          oneHighSchool.set('highSchoolCourses', []);
          oneHighSchool.save().then(function () {
            oneHighSchool.destroyRecord();
          });
        });
      });
    },

    getHighSchoolData: function (file) {
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
        if (cellName[0] === '!') {
          continue;
        }
        row = cellName.slice(1) - 1;
        col = cellName.charCodeAt(0) - 65;
        data[size++] = [];
        console.log(data.length);
        if (row === 0) {
          header[col] = worksheet[cellName].v;
        } else {
          data[row][col] = worksheet[cellName].v;
        }
      }
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        console.log(row[0]);
        if (row[0]) {
          var newHS = myStore.createRecord('secondarySchool', {
            name: row[0],

          });
          console.log("worked1");
          newHS.save();
        }
      });

      this.set('isLoading', true);
    },

    deleteHighSchoolSubject: function () {
      this.get('store').findAll('highSchoolSubject').then(function (highSchoolSubjects) {
        highSchoolSubjects.forEach(function (oneHighSchoolSubject) {
          oneHighSchoolSubject.set('name', null);
          oneHighSchoolSubject.set('description', null);
          oneHighSchoolSubject.set('highSchoolCourses', []);
          oneHighSchoolSubject.save().then(function () {
            oneHighSchoolSubject.destroyRecord();
          });
        });
      });
    },



    deleteAdjudication: function () {
      this.get('store').findAll('adjudication').then(function (adjudications) {
        adjudications.forEach(function (oneAdjudication) {
          oneAdjudication.set('date', null);
          oneAdjudication.set('termAVG', null);
          oneAdjudication.set('termUnitPassed', null);
          oneAdjudication.set('termUnitsTotal', null);
          oneAdjudication.set('note', null);
          oneAdjudication.save().then(function () {
            oneAdjudication.destroyRecord();
          });
        });
      });
    },

    getAdjudication: function (file) {
      /*
      this.get('store').findAll('adjudication').then(function (adjudications) {
        adjudications.forEach(function (oneAdjudication) {
          oneAdjudication.set('date', null);
          oneAdjudication.set('termAVG', null);
          oneAdjudication.set('termUnitPassed', null);
          oneAdjudication.set('termUnitsTotal', null);
          oneAdjudication.set('note', null);
          oneAdjudication.save().then(function () {
            oneAdjudication.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (num) {
            var newAdjudication = myStore.createRecord('adjudication', {
              date: row[1],
              termAVG: row[2],
              termUnitPassed: row[3],
              termUnitsTotal: row[4],
              note: row[5],
              student: num
            });
            newAdjudication.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    deleteAssessCode: function () {
      this.get('store').findAll('assessmentCode').then(function (assessmentCodes) {
        assessmentCodes.forEach(function (oneAssess) {
          oneAssess.set('code', null);
          oneAssess.set('name', null);
          oneAssess.set('comment', []);
          oneAssess.set('testExpression', []);
          oneAssess.set('assess', []);
          oneAssess.save().then(function () {
            oneAssess.destroyRecord();
          });
        });
      });
    },

    getAssessCode: function (file) {
      /*
      this.get('store').findAll('assessmentCode').then(function (assessmentCodes) {
        assessmentCodes.forEach(function (oneAssess) {
          oneAssess.set('code', null);
          oneAssess.set('name', null);
          oneAssess.set('comment', []);
          oneAssess.set('testExpression', []);
          oneAssess.set('assess', []);
          oneAssess.save().then(function () {
            oneAssess.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          var newAssess = myStore.createRecord('assessmentCode', {
            code: row[0],
            name: row[1]
          });
          newAssess.save();
        }
      });

      this.set('isLoading', true);
    },

    deleteFaculty: function () {
      this.get('store').findAll('faculty').then(function (faculties) {
        faculties.forEach(function (oneFaculty) {
          oneFaculty.set('name', null);
          oneFaculty.set('assess', null);
          oneFaculty.set('faculty', []);
          oneFaculty.save().then(function () {
            oneFaculty.destroyRecord();
          });
        });
      });
    },

    getFaculty: function (file) {
      /*
      this.get('store').findAll('faculty').then(function (faculties) {
        faculties.forEach(function (oneFaculty) {
          oneFaculty.set('name', null);
          oneFaculty.set('assess', null);
          oneFaculty.set('faculty', []);
          oneFaculty.save().then(function () {
            oneFaculty.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          var newFaculty = myStore.createRecord('faculty', {
            name: row[0]
          });
          newFaculty.save();
        }
      });

      this.set('isLoading', true);
    },

    deleteDepartment: function () {
      console.log("Called to delete");
      this.get('store').findAll('department').then(function (departments) {
        departments.forEach(function (oneDepartment) {
          oneDepartment.set('name', null);
          oneDepartment.set('faculty', null);
          oneDepartment.set('dept', []);
          oneDepartment.save().then(function () {
            oneDepartment.destroyRecord();
          });
        });
      });
    },

    getDepartment: function (file) {
      /*
      this.get('store').findAll('department').then(function (departments) {
        departments.forEach(function (oneDepartment) {
          oneDepartment.set('name', null);
          oneDepartment.set('faculty', null);
          oneDepartment.set('dept', []);
          oneDepartment.save().then(function () {
            oneDepartment.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('faculty', {
            filter: {
              name: row[1]
            }
          }).then(function (named) {
            var newDept = myStore.createRecord('department', {
              name: row[0],
              faculty: named
            });
            newDept.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    deleteProgramAdministration: function () {
      this.get('store').findAll('programAdministration').then(function (programAdministrations) {
        programAdministrations.forEach(function (oneProgAdmin) {
          oneProgAdmin.set('name', null);
          oneProgAdmin.set('position', null);
          oneProgAdmin.set('dept', null);
          oneProgAdmin.save().then(function () {
            oneProgAdmin.destroyRecord();
          });
        });
      });
    },

    getProgramAdministration: function (file) {
      /*
      this.get('store').findAll('programAdministration').then(function (programAdministrations) {
        programAdministrations.forEach(function (oneProgAdmin) {
          oneProgAdmin.set('name', null);
          oneProgAdmin.set('position', null);
          oneProgAdmin.set('dept', null);
          oneProgAdmin.save().then(function () {
            oneProgAdmin.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('department', {
            filter: {
              name: row[2]
            }
          }).then(function (named) {
            var newProgAdmin = myStore.createRecord('programAdministration', {
              name: row[0],
              position: row[1],
              dept: named
            });
            newProgAdmin.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    getTermCodeData: function (file) {
      /*
      this.get('store').findAll('termCode').then(function (codes) {
        codes.forEach(function (codes) {
          codes.set('terms', []);
          codes.save().then(function () {
            codes.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          var newTermCode = myStore.createRecord('termCode', {
            name: row[0],
          });

          newTermCode.save();
        }
      });

      this.set('isLoading', true);

    },

    getUndergraduateRecordCourses: function (file) {
      /*
      this.get('store').findAll('courseCode').then(function (courseCodes) {
        courseCodes.forEach(function (courseCodes) {
          courseCodes.set('courseLetter', null);
          courseCodes.set('courseNumber', null);
          courseCodes.set('unit', null);
          courseCodes.save().then(function () {
            courseCodes.destroyRecord();
          });
        });
      });

      this.get('store').findAll('grade').then(function (grades) {
        grades.forEach(function (grades) {
          grades.set('mark', null);
          grades.set('note', null);
          grades.save().then(function () {
            grades.destroyRecord();
          });
        });
      });
      */
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('termCode', {
            filter: {
              name: row[1]
            }
          }).then(function (term) {
            myStore.queryRecord('student', {
              filter: {
                number: row[0]
              }
            }).then(function (student) {
              var newCourseCodes = myStore.createRecord('courseCode', {
                courseLetter: row[2],
                courseNumber: row[3],
                unit: row[4],
              });
              newCourseCodes.save();
              var newGrades = myStore.createRecord('grade', {
                mark: row[5],
                note: row[6],
              });
              newGrades.save();
            });
          });
        }
      });

      this.set('isLoading', true);

    },

    getUndergraduateRecordPlanData: function (file) {
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');


      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (num) {
            myStore.queryRecord('termCode', {
              filter: {
                name: row[1]
              }
            }).then(function (tc) {
              var programRecord = myStore.createRecord('programRecord', {
                name: row[2],
                level: row[3],
                load: row[4],
              });

              programRecord.save();

              var planCode = myStore.createRecord('planCode', {
                name: row[5],
              });

              planCode.save();
            });
          });
        }
      });

      this.set('isLoading', true);

    },

    getHighSchoolCourseData: function (file) {
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');

      var studentModel = myStore.peekAll('student');
      var schoolModel = myStore.peekAll('secondarySchool');
      console.log(studentModel);

      var studentMap = {};
      studentModel.forEach(function (student) {
        window.alert('loop');
        studentMap[JSON.parse(JSON.stringify(student)).number] = student;
        window.alert(JSON.parse(JSON.stringify(student)).number);
      });
      console.log(studentMap);
      var schoolMap = {};
      schoolModel.forEach(function (school) {
        schoolMap[JSON.parse(JSON.stringify(school)).name] = school;
      });
      data.forEach(function (row) {
        if (row[0]) {
          /*myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (num) {
            console.log(num);
            myStore.queryRecord('secondarySchool', {
              filter: {
                name: row[1]
              }
            }).then(function (tc) {
              console.log(tc);
              console.log(row[0]);*/
              var programRecord = myStore.createRecord('highSchoolSubject', {
                name: row[3],
                description: row[4],
              });
              programRecord.save();
              /*myStore.queryRecord('highSchoolSubject', {
                filter: {
                  name: row[3]
                }
              }).then(function (hs) {*/
              var subjectModel = myStore.peekAll('highSchoolSubject');


              var subjectMap = {};
              subjectModel.forEach(function (subject) {
                subjectMap[JSON.parse(JSON.stringify(subject)).name] = subject;
              });
                var hscourse = myStore.createRecord('highSchoolCourse', {
                  level: row[2],
                  source: row[5],
                  unit: row[6],
                  school: schoolMap[row[1]],
                  course: subjectMap[row[3]],
                });
                hscourse.save();

              /*});*/

              /*myStore.queryRecord('highSchoolCourse', {
                filter: {
                  source: row[5]
                }
              }).then(function (hscourse) {*/
                var courseModel = myStore.peekAll('highSchoolCourse');


              var courseMap = {};
              courseModel.forEach(function (course) {
                courseMap[JSON.parse(JSON.stringify(course)).name] = course;
              });
                var hscoursegrade = myStore.createRecord('hsCourseGrade', {
                  mark: row[7],
                  source: courseMap[row[5]],
                  student: studentMap[row[0]],
                });
                hscoursegrade.save();
              /*});



            });
          });*/
        }
      });

      this.set('isLoading', true);

    },

    getRegistrationComments: function (file) {
      console.log("Entered Advanced");
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      console.log("Part2");
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');

      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (student) {
            student.set('regComments', row[1]);
            student.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    getBasis: function (file) {
      console.log("Entered Advanced");
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      console.log("Part2");
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');

      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (student) {
            student.set('basis', row[1]);
            student.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    getAdmissionAverage: function (file) {
      console.log("Entered Advanced");
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      console.log("Part2");
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');

      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (student) {
            student.set('admissionAvg', row[1]);
            student.save();
          });
        }
      });

      this.set('isLoading', true);
    },

    getAdmissionComments: function (file) {
      console.log("Entered Advanced");
      var workbook = XLSX.read(file.data, {
        type: 'binary'
      });
      var row = 0;
      var col = null;
      var data = [];
      var header = [];
      var first_sheet_name = workbook.SheetNames[0];

      /* Get worksheet */
      console.log("Part2");
      var worksheet = workbook.Sheets[first_sheet_name];
      var size = 0;
      for (var cellName in worksheet) {
        //all keys that do not begin with "!" correspond to cell addresses
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
      this.set('tableHeader', header); //just in case I need it
      this.set('tableData', data);
      var myStore = this.get('store');

      data.forEach(function (row) {
        if (row[0]) {
          myStore.queryRecord('student', {
            filter: {
              number: row[0]
            }
          }).then(function (student) {
            student.set('admissionComments', row[1]);
            student.save();
          });
        }
      });

      this.set('isLoading', true);
    },

  }
});
