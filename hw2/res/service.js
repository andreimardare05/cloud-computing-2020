var ObjectID = require('mongodb').ObjectID;

exports.get_collection = function(res, db, name_of_collection) {
    db.collection(name_of_collection).find()
        .toArray(function(err, results) {
            if (results.length) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ result: "There aren\'t any results for the moment in DB." }));
            }
        });
};

exports.get_specific_item = function(res, db, name_of_collection, query) {
    if (query['_id']) {
        query['_id'] = new ObjectID(query['_id'])
    }
    db.collection(name_of_collection).find(query)
        .toArray(function(err, results) {
            if (results.length) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ result: "Your query is invalid or not found." }));
            }
        });
};

exports.add_item_collection = function(res, db, name_of_collection, object) {
    db.collection(name_of_collection).insertOne(object, function(err, results) {
        if (err) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result: "An error has occured!" }))
        } else {
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result: "Entry was inserted with success!" }))
        }
    });
}

exports.edit_item_collection = function(res, db, name_of_collection, id, object) {
    db.collection(name_of_collection).updateOne({ _id: new ObjectID(id) }, { $set: object }, function(err, results) {
        if (err) {
            console.log(err)
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result: "An error has occured!" }))
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result: "Entry was updated with success!" }))
        }
    });
}

exports.delete_item_collection = function(res, db, name_of_collection, id) {
    console.log(id, name_of_collection)
    db.collection(name_of_collection).deleteOne({ _id: new ObjectID(id) }, function(err, results) {
        console.log(results)
        if (err) {
            console.log(err)
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result: "An error has occured!" }))
        } else {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ result: "Entry was deleted with success!" }))
        }
    });
}