var express = require('express');
var router = express.Router();
var models = require('../models/studentsRecordsDB');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var programRecord = new models.ProgramRecords(request.body.programRecord);
        programRecord.save(function (error) {
            if (error) response.send(error);
            response.json({programRecord: programRecord});
        });
    })
    .get(parseUrlencoded, parseJSON, function (request, response) {
        var Term = request.query.filter;
        if (!Term) {
            models.ProgramRecords.find(function (error, programRecord) {
                if (error) response.send(error);
                response.json({programRecord: programRecords});
            });
        } else {
            models.ProgramRecords.find({"term": Term.term}, function (error, terms) {
                if (error) response.send(error);
                response.json({programRecord: terms});
            });
        }
    });

router.route('/:programRecord_id')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramRecords.findById(request.params.programRecord_id, function (error, programRecord) {
            if (error) response.send(error);
            response.json({programRecord: programRecord});
        })
    })
    .put(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramRecords.findById(request.params.programRecord_id, function (error, programRecord) {
            if (error) {
                response.send({error: error});
            }
            else {
                programRecord.name = request.body.programRecord.name;
                programRecord.level = request.body.programRecord.level;
                programRecord.load = request.body.programRecord.load;
                programRecord.status = request.body.programRecord.status;
                programRecord.term = request.body.programRecord.term;
                programRecord.plan = request.body.programRecord.plan;
                programRecord.save(function (error) {
                    if (error) {
                        response.send({error: error});
                    }
                    else {
                        response.json({programRecord: programRecord});
                    }
                });
            }
        })
    })
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        models.ProgramRecords.findByIdAndRemove(request.params.programRecord_id,
            function (error, deleted) {
                if (!error) {
                    response.json({programRecord: deleted});
                }
            }
        );
    });

module.exports = router;
