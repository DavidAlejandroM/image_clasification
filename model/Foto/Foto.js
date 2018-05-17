const Sequelize = require('sequelize');
const sequelize = require('../../sequalize');

let Foto = sequelize.define('foto', {
    nombre: Sequelize.STRING,
    ruta: Sequelize.STRING,
    uri: Sequelize.STRING,
    clase: Sequelize.STRING,
    latitud: Sequelize.DOUBLE,
    longitud: Sequelize.DOUBLE,
    altitud: Sequelize.DOUBLE
});
module.exports = Foto;