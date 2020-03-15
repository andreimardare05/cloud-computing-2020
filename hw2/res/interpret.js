const service = require('./utilities')
const parser = require('url')

exports.get_request = function(req, res, db) {
    const url = parser.parse(req.url, true)
    const url_items = url.pathname.split('/')
        .filter(item => item.length > 0);
    let query = JSON.parse(JSON.stringify(url.query));
    console.log(query)
    if (url_items.length > 1 && !Object.keys(query).length) {
        query = {
            'id': url_items[1]
        }
        service.get_specific_item(res, db, url_items[0], query)
    } else if (url_items.length == 1 && !Object.keys(query).length)
        service.get_collection(res, db, url_items[0])
    else if (url_items.length == 1 && Object.keys(query).length)
        service.get_specific_item(res, db, url_items[0], query)
};



function log_request(method, pathname) {
    console.log('Request Type: ' +
        method + '\t Endpoint: ' + pathname);
}