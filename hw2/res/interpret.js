const service = require('./service')
const parser = require('url')

exports.get_request = function(req, res, db) {
    const url = parser.parse(req.url, true)
    const url_items = get_url_items(req.url)
    let query = JSON.parse(JSON.stringify(url.query));
    if (url_items.length > 1 && !Object.keys(query).length) {
        query['_id'] = url_items[1]
        console.log(query)
        service.get_specific_item(res, db, url_items[0], query)
    } else if (url_items.length == 1 && !Object.keys(query).length) {
        console.log(query)
        service.get_collection(res, db, url_items[0]);
    } else if (url_items.length == 1 && Object.keys(query).length) {
        console.log(query)
        service.get_specific_item(res, db, url_items[0], query);
    } else
        invalid_request(res)
};

exports.post_request = function(req, res, db, object) {
    const url_items = get_url_items(req.url)
    if (url_items.length == 1)
        service.add_item_collection(res, db, url_items[0], object)
    else invalid_request(res)
}

exports.put_request = function(req, res, db, object) {
    const url_items = get_url_items(req.url)
    if (url_items.length == 2) {
        service.edit_item_collection(res, db, url_items[0], url_items[1], object)
    } else if (url_items == 1)
        not_allowed(res)
    else invalid_request(res)
}

exports.delete_request = function(req, res, db) {
    const url_items = get_url_items(req.url)
    if (url_items.length == 2) {
        service.delete_item_collection(res, db, url_items[0], url_items[1])
    } else if (url_items == 1)
        not_allowed(res)
    else invalid_request(res)
}

exports.invalid_request = function(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('The request you\'ve entered is invalid');
};

exports.not_allowed = function(res) {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('The request you\'ve entered could not be done on a collection!');
}

exports.log_request = function(method, pathname) {
    console.log('Endpoint: ' + pathname + ', Request type: ' + method);
}

function get_url_items(request_url) {
    const url = parser.parse(request_url, true)
    return url.pathname.split('/')
        .filter(item => item.length > 0);
}