var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var programAdministration = new models.ProgramAdministrations(request.body.programAdministration);
        programAdministration.save(function (error) {
            if (error) response.send(error);
            response.json({programAdministration: programAdministration});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Department = request.query.filter;
        console.log("1");
        if (!Department) {
            console.log("2");
            models.ProgramAdministrations.find(function (error, programAdministrations) {
                if (error) response.send(error);
                response.json({programAdministration: programAdministrations});
            });
        } else {
            console.log("3");
            models.ProgramAdministrations.find({"department": Department.department}, function (error, departments) {
                if (error) response.send(error);
                response.json({programAdministration: departments});
            });
        }
    });

router.route('/:programAdministration_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramAdministrations.findById(request.params.programAdministration_id, function (error, programAdministration) {
            if (error) response.send(error);
            response.json({programAdministration: programAdministration});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramAdministrations.findById(request.params.programAdministration_id, function (error, programAdministration) {
            if (error) {
                response.send({error: error});
            }
            else {
                programAdministration.name = request.body.programAdministration.name;
                programAdministration.position = request.body.programAdministration.position;
                programAdministration.dept = request.body.programAdministration.dept;
                programAdministration.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({programAdministration: programAdministration});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramAdministrations.findByIdAndRemove(request.params.programAdministration_id,
            function (error, deleted) {
                if (!error) {
                    response.json({programAdministration: deleted});
                }
            }
        );
    });

module.exports = router;
