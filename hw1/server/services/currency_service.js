const https = require('https');
const fs = require('fs');
var prettyHtml = require('json-pretty-html').default;

function getCurrencyFromIP(ip_address) {
    return new Promise((resolve, reject) => {
        let options = {
            "method": "GET",
            "hostname": process.env.API_HOSTNAME_IP_GEOLOCATION,
            "path": `/ipgeo?apiKey=${process.env.API_KEY}`
        };
        let start = new Date()
        let end;
        const req = https.request(options, function(resp) {
            let chunks = [];

            resp.on("data", function(chunk) {
                end = Date.now() - start
                chunks.push(chunk);
            });

            resp.on("end", function() {
                var body = Buffer.concat(chunks);
                let data = JSON.parse(body.toString());
                if (process.env.SET_LOG == "true") {
                    logFile(resp, options, end);
                }
                resolve(data)
            });
        });
        req.on('error', error => {
            reject(error.message)
        });
        req.end();
    })
}

function getCurrencies(ip_address) {
    return new Promise((resolve, reject) => {
        let options = {
            "method": "GET",
            "hostname": process.env.API_HOSTNAME_IP_GEOLOCATION,
            "path": `/ipgeo?apiKey=${process.env.API_KEY}`
        };
        let start = new Date()
        let end;
        const req = https.request(options, function(resp) {
            let chunks = [];

            resp.on("data", function(chunk) {
                end = Date.now() - start
                chunks.push(chunk);
            });

            resp.on("end", function() {
                var body = Buffer.concat(chunks);
                let data = JSON.parse(body.toString());
                if (process.env.SET_LOG == "true") {
                    logFile(resp, options, end);
                }
                resolve(data)
            });
        });
        req.on('error', error => {
            reject(error.message)
        });
        req.end();
    })
}

function getSVG(path) {
    return new Promise((resolve, reject) => {
        let options = {
            "method": "GET",
            "hostname": process.env.API_HOSTNAME_REST_COUNTRIES,
            "path": `${path}`
        };
        const req = https.request(options, function(resp) {
            let chunks = [];

            resp.on("data", function(chunk) {
                end = Date.now() - start
                chunks.push(chunk);
            });

            resp.on("end", function() {
                var body = Buffer.concat(chunks);
                let data = body.toString();
                console.log(data);
                if (process.env.SET_LOG == "true") {
                    logFile(resp, options, end);
                }
                resolve(data)
            });
        });
        req.on('error', error => {
            reject(error.message)
        });
        req.end();
    })
}

function getCountryCodes() {
    return new Promise((resolve, reject) => {
        let options = {
            "method": "GET",
            "hostname": process.env.API_HOSTNAME_REST_COUNTRIES,
            "path": `/rest/v2/all?fields=currencies`
        };
        let start = new Date()
        let end;
        const req = https.request(options, function(resp) {
            let chunks = [];

            resp.on("data", function(chunk) {
                end = Date.now() - start
                chunks.push(chunk);
            });

            resp.on("end", function() {
                let body = Buffer.concat(chunks);
                let data = JSON.parse(body.toString());
                if (process.env.SET_LOG == "true") {
                    logFile(resp, options, end);
                }
                resolve(data)
            });
        });
        req.on('error', error => {
            reject(error.message)
        });
        req.end();
    })
}

function getCurrencyFromCountryName(countryName) {
    return new Promise((resolve, reject) => {
        let options = {
            "method": "GET",
            "hostname": process.env.API_HOSTNAME_REST_COUNTRIES,
            "path": `/rest/v2/name/${countryName}`
        };
        let start = new Date()
        let end;
        const req = https.request(options, function(resp) {
            let chunks = [];

            resp.on("data", function(chunk) {
                end = Date.now() - start
                chunks.push(chunk);
            });

            resp.on("end", function() {
                var body = Buffer.concat(chunks);
                let data = JSON.parse(body.toString());
                if (process.env.SET_LOG == "true") {
                    logFile(resp, options, end);
                }
                resolve(data)
            });
        });
        req.on('error', error => {
            reject(error.message)
        });
        req.end();
    })
}

function getExchangeBetween(from, to) {
    return new Promise((resolve, reject) => {
        let options = {
            "method": "GET",
            "hostname": process.env.API_HOSTNAME_RATES,
            "path": `/api/latest?base=${from}&symbols=${to}`,
        }
        let start = new Date()
        let end;
        const req = https.request(options, function(resp) {
            let chunks = [];

            resp.on("data", function(chunk) {
                end = Date.now() - start;
                chunks.push(chunk);
            });

            resp.on("end", function() {
                var body = Buffer.concat(chunks);
                let data = JSON.parse(body.toString());
                if (process.env.SET_LOG == "true") {
                    logFile(resp, options, end);
                }
                resolve(data);
            });
        });
        req.on('error', error => {
            reject(error.message)
        });
        req.end();
    })
}

function logFile(resp, options, end) {
    let log = {
        date: resp.headers.date,
        request: {
            method: options.method,
            hostname: options.hostname,
            path: options.path,
        },
        response: {
            statusCode: resp.statusCode,
            statusMessage: resp.statusMessage,
            contentType: resp.headers["content-type"],
        },
        latency: end
    }
    let html = prettyHtml(log);
    html = html.replace('/</g', "&lt")
    html = html.replace('/>/g', "&rt")
    html = html.replace(process.env.API_KEY, 'SECRET_KEY')
    fs.appendFile('app.log', `${html}`, (err) => {
        if (err)
            console.log(err);
    });
}

module.exports = {
    getCurrencyFromIP,
    getCurrencyFromCountryName,
    getExchangeBetween,
    getCountryCodes,
    getSVG
}