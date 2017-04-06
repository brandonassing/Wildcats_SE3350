var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var highSchoolSubject = new models.HighSchoolSubjects(request.body.highSchoolSubject);
        highSchoolSubject.save(function (error) {
            if (error) response.send(error);
            response.json({highSchoolSubject: highSchoolSubject});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var HighSchoolCourse = request.query.filter;
        if (!HighSchoolCourse) {
            console.log("one");
            models.HighSchoolSubjects.find(function (error, highSchoolSubjects) {
                if (error) response.send(error);
                response.json({highSchoolSubject: highSchoolSubjects});
            });
        } else {
            models.HighSchoolSubjects.find({"highSchoolCourse": HighSchoolCourse.highSchoolCourse}, function (error, highSchoolCourses) {
                if (error) response.send(error);
                response.json({highSchoolSubject: highSchoolCourses});
            });
        }
    });

router.route('/:highSchoolSubject_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.HighSchoolSubjects.findById(request.params.highSchoolSubject_id, function (error, highSchoolSubject) {
            if (error) response.send(error);
            response.json({highSchoolSubject: highSchoolSubject});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.HighSchoolSubjects.findById(request.params.highSchoolSubject_id, function (error, secondarySchool) {
            if (error) {
                response.send({error: error});
            }
            else {
                highSchoolSubject.name = request.body.highSchoolSubject.name;
                highSchoolSubject.description = request.body.highSchoolSubject.description;
                highSchoolSubject.highSchoolCourses = request.body.highSchoolCourses.highSchoolCourses;

                highSchoolSubject.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({highSchoolSubject: highSchoolSubject});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.HighSchoolSubjects.findByIdAndRemove(request.params.highSchoolSubject_id,
            function (error, deleted) {
                if (!error) {
                    response.json({highSchoolSubject: deleted});
                }
            }
        );
    });

module.exports = router;
