const Sequelize = require('sequelize');
var sqlite3 = require('sqlite3').verbose();

let sequelize = {};

if(sequelize){
    //new sqlite3.Database('mainDB');
    sequelize =  new Sequelize('mainDB', null, null, {
        dialect: "sqlite",
        storage: 'mainDB',
    });
}


module.exports = sequelize;