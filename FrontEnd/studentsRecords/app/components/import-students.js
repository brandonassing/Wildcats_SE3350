import Ember from 'ember';
/* global XLSX */

export default Ember.Component.extend({

  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),
  tableHeader: [],
  tableData: null,
  isLoading: false,

  ID001IsPermitted: Ember.computed(function () { //Manage system roles
    var authentication = this.get('oudaAuth');
    if (authentication.getName === "Root") {
      return true;
    } else {
      return (authentication.get('userCList').indexOf("ID001") >= 0);
    }
  }),

  actions: {

    fileImported: function (file) {
      this.set('isLoading', true);
      var workbook = XLSX.read(file.data, {type: 'binary'});
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

    deleteGender: function () {
      var myStore = this.get('store');
      myStore.findAll('gender').then(function (genders) {
        genders.forEach(function (sex) {
          sex.set('students', []);
          sex.save().then(function () {
            sex.destroyRecord();
          });
        });
      });
    },

    getGenderData: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            var newGender = myStore.createRecord('gender', {
              name: row[0]
            });
            newGender.save();
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
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            newResidency.save();
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
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            myStore.queryRecord('gender', {filter: {name: row[3]}}).then(function (sex) {
              myStore.queryRecord('residency', {filter: {name: row[5]}}).then(function (res) {
                var newStudents = myStore.createRecord('student', {
                  number: row[0],
                  firstName: row[1],
                  lastName: row[2],
                  gender: sex,
                  DOB: new Date(row[4]),
                  photo: "",
                  registrationComments: "NONE FOUND",
                  basisOfAdmission: "NONE FOUND",
                  admissionAverage: "NONE FOUND",
                  admissionComments: "NONE FOUND",
                  residency: res
                });
                newStudents.save();
              });
            });
          }
        });

      this.set('isLoading', true);
    },

    deleteTermCodes: function () {
      this.get('store').findAll('termCode').then(function (codes) {
        codes.forEach(function (codes) {
          codes.set('terms', []);
          codes.save().then(function () {
            codes.destroyRecord();
          });
        });
      });
    },

    getTermCodesData: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            var newCode = myStore.createRecord('termCode', {
              name: row[0]
            });
            newCode.save();
          }
        });

      this.set('isLoading', true);
    },

    done: function () {
      this.set('isLoading', false);
    },

    cancel: function () {
      this.get('routing').transitionTo('posts');
    }

  },
  deleteAdvancedStandings: function () {
      this.get('store').findAll('standing').then(function (standings) {
        standings.forEach(function (oneStanding) {
          oneStanding.set('student', null);
          oneStanding.set('course', null);
          oneStanding.set('description', null);
          oneStanding.set('units', null);
          oneStanding.set('grade', null);
          oneStanding.set('from', null);
          oneStanding.save().then(function () {
            oneStanding.destroyRecord();
          });
        });
      });
    },

    getAdvancedStandingData: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            myStore.queryRecord('student', {filter: {number: row[0]}}).then(function (num) {
                var newAdvancedStanding = myStore.createRecord('standing', {
                  student: num,
                  course: row[1],
                  description: row[2],
                  units: row[3],
                  grade: row[4],
                  from: row[5]
                });
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
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            myStore.queryRecord('student', {filter: {number: row[0]}}).then(function (num) {
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
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            myStore.queryRecord('student', {filter: {number: row[0]}}).then(function (num) {
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
      this.get('store').findAll('hsCourseGrade').then(function (awards) {
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

    gethsCourseGradeData: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            myStore.queryRecord('student', {filter: {number: row[0]}}).then(function (num) {
              myStore.queryRecord('hsCourseGrade', {filter: {source: row[4]}}), then(function (sourced) {
                var newhsCourseGrade = myStore.createRecord('hsCourseGrade', {
                  student: num,
                  source: sourced,
                  mark: row[7]
                });
                newhsCourseGrade.save();
              });
            });
          }
        });

      this.set('isLoading', true);
    },

    deleteHighSchoolCourses: function () {
      this.get('store').findAll('highSchoolCourse').then(function (highSchoolCourses) {
        highSchoolCourses.forEach(function (oneHighSchoolCourse) {
          oneHighSchoolCourse.set('level', null);
          oneHighSchoolCourse.set('source', null);
          oneHighSchoolCourse.set('unit', null);
          oneHighSchoolCourse.set('school', null);
          oneHighSchoolCourse.set('course',null);
          oneHighSchoolCourse.set('hsCourseGrades', null);
          oneHighSchoolCourse.save().then(function () {
            oneHighSchoolCourse.destroyRecord();
          });
        });
      });
    },

    getHighSchoolCoursesData: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            myStore.queryRecord('secondarySchool', {filter: { name: row[1]}}).then(function (named) {
              myStore.queryRecord('highSchoolSubject', {filter: { name: row[3]}}).then(function (subs) {
              myStore.queryRecord('hsCourseGrade', {filter: { mark: [7]}}).then(function (marked) {
                var newhsCourse = myStore.createRecord('highSchoolCourse', {
                  level: row[2],
                  source: row[5],
                  unit: row[6],
                  school: named,
                  course: subs,
                  hsCourseGrades: marked

                });
                newhsCourse.save();
            });
              });
            });
          }
        });

      this.set('isLoading', true);
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
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
                var newHS = myStore.createRecord('secondarySchool', {
                  name: row[0]
                });
                newHS.save();
          }
        });

      this.set('isLoading', true);
    },

    deleteHighSchoolSubject: function () {
      this.get('store').findAll('highSchoolSubject').then(function (highSchoolSubjects) {
        highSchoolSubjects.forEach(function (oneHighSchoolSubject) {
          oneHighSchoolSubject.set('name', null);
          oneHighSchoolSubject.set('description', null)
          oneHighSchoolSubject.set('highSchoolCourses', []);
          oneHighSchoolSubject.save().then(function () {
            oneHighSchoolSubject.destroyRecord();
          });
        });
      });
    },

    getHighSchoolData: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
                var newHSSub = myStore.createRecord('highSchoolSubject', {
                  name: row[3],
                  description: "NO DESCRIPTION"
                });
                newHSSub.save();
          }
        });

      this.set('isLoading', true);
    },

    deleteAdjudication: function () {
      this.get('store').findAll('adjudication').then(function (adjudications) {
        adjudications.forEach(function (oneAdjudication) {
          oneAdjudication.set('date', null);
          oneAdjudication.set('termAVG', null)
          oneAdjudication.set('termUnitPassed', null);
          oneAdjudication.set('termUnitsTotal', null);
          oneAdjudication.set('note',null);
          oneAdjudication.save().then(function () {
            oneAdjudication.destroyRecord();
          });
        });
      });
    },

    getAdjudication: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
            myStore.queryRecord('student', {filter: { number: row[0]}}).then(function (num) {
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
          oneAssess.set('name', null)
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
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
      this.get('store').findAll('faculty').then(function (facultys) {
        facultys.forEach(function (oneFaculty) {
          oneFaculty.set('name', null);
          oneFaculty.set('assess', null)
          oneFaculty.set('faculty', []);
          oneFaculty.save().then(function () {
            oneFaculty.destroyRecord();
          });
        });
      });
    },

    getFaculty: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
                newAssess.save();
          }
        });

      this.set('isLoading', true);
    },

    deleteDepartment: function () {
      this.get('store').findAll('department').then(function (departments) {
        departments.forEach(function (oneDepartment) {
          oneDepartment.set('name', null);
          oneDepartment.set('faculty', null)
          oneDepartment.set('dept', []);
          oneDepartment.save().then(function () {
            oneDepartment.destroyRecord();
          });
        });
      });
    },

    getDepartment: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
              myStore.queryRecord('faculty', {filter: { name: row[1]}}).then(function (named) {
                var newDept = myStore.createRecord('assessmentCode', {
                  name: row[0],
                  faculty: named
                });
                newDept.save();
              });
          }
        });

      this.set('isLoading', true);
    },

    deleteDepartment: function () {
      this.get('store').findAll('programAdministration').then(function (programAdministrations) {
        programAdministrations.forEach(function (oneProgAdmin) {
          oneProgAdmin.set('name', null);
          oneProgAdmin.set('position', null)
          oneProgAdmin.set('dept', null);
          oneProgAdmin.save().then(function () {
            oneProgAdmin.destroyRecord();
          });
        });
      });
    },

    getProgramAdministration: function (file) {
      var workbook = XLSX.read(file.data, {type: 'binary'});
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
              myStore.queryRecord('department', {filter: { name: row[2]}}).then(function (named) {
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

});