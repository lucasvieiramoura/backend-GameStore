const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');   

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: "https://via.placeholder.com/150"
    }
});

module.exports = Product;