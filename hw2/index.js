const http = require('http');
const url = require('url');
const mongo = require('mongodb')
const dotenv = require('dotenv')

const interpreter = require('./res/interpret')

// Get env. variables
dotenv.config();

try {
    // Connecting to MongoDB database.
    mongo.MongoClient.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        if (err) {
            throw err
        }

        console.log("Connected successfully to MongoDB.");

        let db = client.db(process.env.DB)

        // Create http server
        http.createServer((req, res) => {
            let body = '';
            if (process.env.SET_LOG == "true")
                interpreter.log_request(req.method, req.url)
                // Handler of request GET/POST/PUT/DELETE
            switch (req.method) {
                case 'GET':
                    interpreter.get_request(req, res, db);
                    break;
                case 'POST':
                    // Listeners for request body: 'data', 'end'
                    req.on('data', function(data) {
                        body += data;
                    });

                    req.on('end', function() {
                        interpreter.post_request(req, res, db, JSON.parse(body));
                    });
                    break;
                case 'PUT':
                    // Listeners for request body: 'data', 'end'
                    req.on('data', function(data) {
                        body += data;
                    });

                    req.on('end', function() {
                        interpreter.put_request(req, res, db, JSON.parse(body));
                    });
                    break;
                case 'DELETE':
                    interpreter.delete_request(req, res, db);
                default:
                    interpreter.invalid_request(req, res)
                    break;
            }
        }).listen(process.env.PORT, process.env.HOSTNAME, () => {
            console.log(`Server is running at http://${process.env.HOSTNAME}:${process.env.PORT}`);
        });;
    });
} catch (error) {
    console.log('An error has occured: ' + error.name)
}