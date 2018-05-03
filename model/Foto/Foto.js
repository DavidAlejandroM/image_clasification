const Sequelize = require('sequelize');
const sequelize = require('../../sequalize');

let Foto = sequelize.define('Foto', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});
module.exports = Foto;