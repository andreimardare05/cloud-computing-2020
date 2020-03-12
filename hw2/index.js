const hostname = '127.0.0.1';
const port = 8080;

const http = require('http');
const url = require('url');
var service = require('./res/util.js');
var MongoClient = require('mongodb').MongoClient

const mongo_url = 'mongodb://localhost:27017'

MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    if (err) {
        throw err
    }

    console.log("Connected successfully to mongoDB server");

    let db = client.db('pharma')

    http.createServer((req, res) => {
        const request_url = url.parse(req.url, true);

        if (request_url.pathname == '/persons/:id' && req.method === 'GET') {
            console.log(request_url)
            log_request(req.method, request_url.pathname)
            service.get_collection(req, res, db, 'persons');
        } else if (request_url.pathname == '/drugs' && req.method === 'GET') {
            log_request(req.method, request_url.pathname)
            service.get_collection(req, res, db, 'drugs');
        } else {
            console.log(request_url)
            log_request(req.method, request_url.pathname)
            service.invalid_request(req, res);
        }
    }).listen(port, hostname, () => {
        console.log(`Server is running at http://${hostname}:${port}`);
    });;
});

function log_request(method, pathname) {
    console.log('Request Type: ' + method + '\nEndpoint: ' + pathname);
}