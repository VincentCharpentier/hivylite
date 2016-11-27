var Sequelize = require("sequelize");
var DbConfig = require("./config").db;

var sequelize = new Sequelize(
    DbConfig.name,
    DbConfig.user,
    DbConfig.pwd,
    {
        host: DbConfig.host,
        dialect: DbConfig.type,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

var Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    extraFields: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
    }
});

var Request = sequelize.define('request', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Product,
            key: 'id'
        }
    },
    extraFields: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
    }
});

// TODO : remove force in prod
var sync_jobs = [
    Product.sync({force: true}),
    Request.sync({force: true})
];

Promise.all(sync_jobs).then(function () {
    // Table created: default data
    Request.bulkCreate([
        {title: "New Printer"},
        {title: "More Coffee"},
        {title: "World Trip"}
    ], { validate: true });
    Product.bulkCreate([
        {
            name: "Plane Ticket",
            extraFields: [
                {
                    name: "dep_date",
                    required: true,
                    type: "Date",
                    label: "Departure Date"
                },
                {
                    name: "dep_air",
                    required: true,
                    type: "String",
                    label: "Departure Airport"
                },
                {
                    name: "ret_date",
                    required: true,
                    type: "Date",
                    label: "Return Date"
                },
                {
                    name: "ret_air",
                    required: true,
                    type: "String",
                    label: "Destination Airport"
                }
            ]
        },
        {
            name: "Hivy T-Shirt",
            extraFields: [
                {
                    name: "size",
                    required: true,
                    type: "Enum",
                    values: ["S", "M", "L", "XL"],
                    label: "Size"
                },
                {
                    name: "type",
                    required: true,
                    type: "Enum",
                    values: ["M", "F"],
                    label: "Gender"
                }
            ]
        },
        {
            name: "Madeleine",
            extraFields: [
                {
                    name: "type",
                    required: true,
                    type: "Enum",
                    values: ["None", "Chocolate"],
                    label: "Coating"
                }
            ]
        }
    ], { validate: true });
});

module.exports = {
    Request,
    Product
}
