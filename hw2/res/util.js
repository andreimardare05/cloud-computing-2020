const url = require('url');

exports.get_collection = function(req, res, db, name_of_collection) {
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }

    db.collection(name_of_collection).find().toArray(function(err, results) {
        if (results.length) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            console.log(results)
        } else {
            res.statusCode = 204;
            res.end(JSON.stringify({ result: "There aren't any results for the momentin the DB" }));
            console.log(results)
        }
    });
};

exports.get_specific_item = function(req, res, db, name_of_collection) {
    const reqUrl = url.parse(req.url, true);
    var name = 'World';
    if (reqUrl.query.name) {
        name = reqUrl.query.name
    }

    db.collection(name_of_collection).find().toArray(function(err, results) {
        if (results.length) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            console.log(results)
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ result: "Your id is invalid or not found." }));
            console.log(results)
        }
    });
};


exports.testRequest = function(req, res) {
    body = '';
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {
        postBody = JSON.parse(body);
        var response = {
            "text": "Post Request Value is  " + postBody.value
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.invalid_request = function(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end('The request you\'ve entered is invalid');
};