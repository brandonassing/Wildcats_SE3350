var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL 
var url = 'mongodb://main:main@ds139909.mlab.com:39909/se3350_wildcats';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    updateStudentNumbers(db, function() {

        db.close();
    });
});

var updateStudentNumbers = function(db, callback) {
    var cursor = db.collection("students").find({}).each(function(err, item) {
        // if (typeof item.number == "number") {
        console.log(item.number);
        var x = item.number;
        console.log(x);
        db.collection("students").updateOne({
            number: item.number
        }, {
            $set: {
                number: item.number.toString()
            }
        }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });

        //}
    });
}