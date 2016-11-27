var db = require("./db");

var RequestApi = {
    getAll: function(callback) {
        callback = callback || ()=>{};
        db.Request.findAll({
            attributes: ['id', 'title']
        }).then(function(requests) {
            callback(requests);
        });
    },
    findById: function(id, callback) {
        callback = callback || ()=>{};
        db.Request.findById(id)
            .then(function(request) {
                callback(request);
            });
    },
    create: function(requestFields, callback) {
        callback = callback || ()=>{};
        db.Request.create(requestFields)
            .then(function(newRequest) {
                callback(newRequest);
            });
    },
    edit: function(request, callback) {
        callback = callback || ()=>{};
        var data = Object.assign({}, request);
        delete data.id;
        db.Request.update(data, { where: { id: request.id }})
            .then(function(count) {
                callback(count);
            });
    }
}

module.exports = RequestApi;
