var express = require('express');
var router = express.Router();

var RequestApi = require('../logic/request');
var ProductApi = require('../logic/product');


/* INTERNAL API */
router.get('/request/getAll', (req, res, next) => {
    RequestApi.getAll(function(requests) {
        res.send(requests);
    });
});

// req.body: request
router.post('/request/new', (req, res, next) => {
    RequestApi.create(
        req.body,
        function(request) {
            res.send(request);
        });
});

// req.body: request
router.post('/request/edit', (req, res, next) => {
    RequestApi.edit(req.body, function(count) {
        console.log(count + " rows updated");
        res.send(count > 0);
    })

});

// req.body : { request_id: INT }
router.post('/request/get', (req, res, next) => {
    RequestApi.findById(req.body.request_id, function(request) {
        res.send(request);
    })
});

router.post('/product/autocomplete', (req, res, next) => {
    ProductApi.autocomplete(
        req.body.text,
        (products)=> {
            res.send(products);
        })
});
router.post('/product/getExtraFields', (req, res, next) => {
    ProductApi.getExtraFields(
        req.body.product_id,
        (fields) => {
            res.send(fields);
        })
});

module.exports = router;
