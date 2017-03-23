var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var faculty = new models.Facultys(request.body.faculty);
        faculty.save(function (error) {
            if (error) response.send(error);
            response.json({faculty: faculty});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var AssessmentCode = request.query.filter;
        if (!AssessmentCode) {
            models.Facultys.find(function (error, facultys) {
                if (error) response.send(error);
                response.json({faculty: facultys});
            });
        } else {
            models.LogicalExpressions.find({"assessmentCode": AssessmentCode.assessmentCode}, function (error, assessmentCodes) {
                if (error) response.send(error);
                response.json({faculty: assessmentCodes});
            });
        }
    });

router.route('/:faculty_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Facultys.findById(request.params.faculty_id, function (error, faculty) {
            if (error) response.send(error);
            response.json({faculty: faculty});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Facultys.findById(request.params.faculty_id, function (error, faculty) {
            if (error) {
                response.send({error: error});
            }
            else {
                faculty.name = request.body.faculty.name;
                faculty.assess = request.body.faculty.assess;
                faculty.faculty = request.body.faculty.faculty;                
                faculty.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({faculty: faculty});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.Facultys.findByIdAndRemove(request.params.faculty_id,
            function (error, deleted) {
                if (!error) {
                    response.json({faculty: deleted});
                }
            }
        );
    });

module.exports = router;
