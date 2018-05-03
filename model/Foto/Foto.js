const Sequelize = require('sequelize');
const sequelize = require('../../sequalize');

let Foto = sequelize.define('foto', {
    nombre: Sequelize.STRING,
    ruta: Sequelize.STRING,
    clase: Sequelize.STRING
});
module.exports = Foto;