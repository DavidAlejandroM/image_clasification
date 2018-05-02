const Sequelize = require('sequelize');

let sequelize = {};

if(sequelize){
   sequelize =  new Sequelize('mainDB', null, null, {
        dialect: "sqlite",
        storage: './test.sqlite',
    });
}

module.exports = sequelize;