const Sequelize = require('sequelize');
const sequelize = require('../../sequalize');

let Foto = sequelize.define('Foto', {
    nombre: Sequelize.STRING,
    ruta: Sequelize.STRING
});
module.exports = Foto;