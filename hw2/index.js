const http = require('http');
const url = require('url');
const mongo = require('mongodb')
const dotenv = require('dotenv')

const interpreter = require('./res/interpret')

dotenv.config();

try {
    mongo.MongoClient.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        if (err) {
            throw err
        }

        console.log("Connected successfully to MongoDB.");

        let db = client.db(process.env.DB)

        http.createServer((req, res) => {
            switch (req.method) {
                case 'GET':
                    interpreter.get_request(req, res, db);
                    break;
                case 'POST':
                    interpreter.post_request();
                    break;
                case 'PUT':
                    interpreter.put_request();
                case 'DELETE':
                    interpreter.delete_request();
            }
        }).listen(process.env.PORT, process.env.HOSTNAME, () => {
            console.log(`Server is running at http://${process.env.HOSTNAME}:${process.env.PORT}`);
        });;
    });
} catch (error) {
    console.log('An error has occured: ' + error.name)
}