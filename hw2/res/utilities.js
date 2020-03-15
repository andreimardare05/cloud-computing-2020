const url = require('url');

exports.get_collection = function(res, db, name_of_collection) {
    db.collection(name_of_collection).find()
        .toArray(function(err, results) {
            if (results.length) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
            } else {
                res.statusCode = 204;
                res.end(JSON.stringify({ result: "There aren\'t any results for the momentin the DB" }));
            }
        });
};

exports.get_specific_item = function(res, db, name_of_collection, query) {
    if (query['id']) {
        query['id'] = parseInt(query['id'])
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

exports.invalid_request = function(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('The request you\'ve entered is invalid');
};