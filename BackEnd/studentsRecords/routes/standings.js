var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var standing = new models.Standings(request.body.standing);
        standing.save(function (error) {
            if (error) response.send(error);
            response.json({standing: standing});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Student = request.query.filter;
        if (!Student) {
            models.Standings.find(function (error, standings) {
                if (error) response.send(error);
                response.json({standing: standings});
            });
        } else {
            models.Standings.find({"student": Student.student}, function (error, students) {
                if (error) response.send(error);
                response.json({standing: students});
            });
        }
    });

router.route('/:standing_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.Standings.findById(request.params.standing_id, function (error, standing) {
            if (error) response.send(error);
            response.json({standing: standing});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.Standings.findById(request.params.standing_id, function (error, standing) {
            if (error) {
                response.send({error: error});
            }
            else {
                standing.course = request.body.standing.course;
                standing.description = request.body.standing.description;
                standing.units = request.body.standing.units;
                standing.grade = request.body.standing.grade;
                standing.location = request.body.standing.location;
                standing.student = request.body.standing.student;

                standing.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({standing: standing});
                    }
                });
            }
        })
    });

module.exports = router;
