var db = require("./db");

var ProductApi = {
    autocomplete: function(text, callback) {
        callback = callback || ()=>{};
        db.Product.findAll({
            attributes: ['id', 'name'],
            where: {
                name: {
                    '$ilike' : '%' + text + '%'
                }
            }
        }).then(function(products) {
            callback(
                products.sort((a,b) => {
                    return a.name.indexOf(text) - b.name.indexOf(text);
                })
            );
        });
    },
    getExtraFields: function(product_id, callback) {
        callback = callback || ()=>{};
        db.Product.findById(product_id)
            .then(function(product) {
                callback(product.extraFields);
            });
    }
}

module.exports = ProductApi;
