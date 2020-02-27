const currencyService = require('./currency_service.js');

async function getMetricsForCountries() {
    let finalresult = []
    for (let iteration = 1; iteration <= 5; iteration++) {
        let instances = []
        let start = new Date();
        let success = 0;
        let failure = 0;
        for (let count = 1; count <= 10; count++) {
            instances.push(currencyService.getCountryCodes())
        }
        await Promise.all(instances).then(results => success = results.map(item => item[0]).length).catch(results => failure = results.length);
        let partialresult = {
            duration: new Date() - start,
            successfull: success,
            failure: failure
        }
        finalresult.push(partialresult)
        instances = []
    }
    console.log(finalresult)
    return finalresult;
}

async function getMetricsForIP() {
    let instances = []
    let finalresult = []
    for (let i = 1; i <= 5; i++) {
        let start = new Date();
        let success = 0;
        let failure = 0;
        for (let count = 1; count <= 10; count++) {
            instances.push(currencyService.getCurrencyFromIP('79.112.111.214'))
        }
        await Promise.all(instances).then(results => success = results.map(item => item[0]).length).catch(results => failure = results.length);
        let partialresult = {
            duration: new Date() - start,
            successfull: success,
            failure: failure
        }
        finalresult.push(partialresult)
        instances = []
    }
    console.log(finalresult)
    return finalresult;
}

async function getMetricsForExchange() {
    let instances = []
    let finalresult = []
    for (let i = 1; i <= 5; i++) {
        let start = new Date();
        let success = 0;
        let failure = 0;
        for (let count = 1; count <= 10; count++) {
            instances.push(currencyService.getExchangeBetween('RON', 'USD'))
        }
        await Promise.all(instances).then(results => success = results.map(item => item[0]).length).catch(results => failure = results.length);
        let partialresult = {
            duration: new Date() - start,
            successfull: success,
            failure: failure
        }
        finalresult.push(partialresult)
        instances = []
    }
    console.log(finalresult)
    return finalresult;
}

async function start() {
    // await getMetricsForIP()
    await getMetricsForCountries()
    await getMetricsForExchange()
}

module.exports = { start };