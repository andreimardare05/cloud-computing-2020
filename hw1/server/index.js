const currencyService = require('./services/currency_service.js');
const test = require('./services/script.js')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();

var app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/currency', function(req, res) {
    if (req.query.ip !== undefined) {
        currencyService.getCurrencyFromIP(req.connection.remoteAddress).then(data => {
            res.status(200);
            res.send(data);
        });
    } else {
        currencyService.getCurrencyFromCountryName(req.query.country).then(data => {
            res.status(200);
            res.send(data);
        });
    }
})


app.get('/result', function(req, res) {
    currencyService.getExchangeBetween(req.query.from, req.query.to).then(data => {
        if (data.error) {
            res.status(404);
            res.send({ result: "NO SUPPORT" })
        } else {
            res.status(200);
            res.send({ result: data.rates[req.query.to] * req.query.amount });
        }
    });
})

app.get('/currencies', function(req, res) {
    currencyService.getCountryCodes().then(data => {
        res.status(200);
        res.send(data);
    });
})

app.get('/metrics', function(req, res) {
    const fs = require('fs');
    res.status(200);
    res.send(fs.readFileSync('app.log').toString())
})

app.get('/script', function(req, res) {
    const fs = require('fs');
    res.status(200);
    res.send(fs.readFileSync('app.log').toString())
    test.start()
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on PORT:', process.env.PORT, ':)');
});