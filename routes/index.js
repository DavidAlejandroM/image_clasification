var express = require('express');
var router = express.Router();
const pythonShell = require('python-shell');
const Foto = require('../model/Foto')
const sequelize = require('../sequalize')
const path = './res/img/'
const options = {
  args: ['python/']
};
const pUtil = require('../utils/positionUtil');
const orderUtil = require('../utils/orderUtil');

/* GET home page. */
router.get('/', function(req, res, next) {
  sequelize.close();
  pythonShell.run('python/test.py',options, function (err) {
    if (err) console.log(err);
  });
  res.render('index', { title: 'Express' });

});

router.post('/upload', function(req, res) {
  let files = req.files;
  let locations = JSON.parse(req.body.location);
  let clases = JSON.parse(req.body.clases);
  let currentLocation = JSON.parse(req.body.currentLocation);

  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  
  let keyFotos = Object.keys(files);
  
  keyFotos.forEach(key => {
    let file = files[key];
    file.mv(`res/img/${file.name}`, function(err) {
      if (err)
        return res.status(500).send(err);
      else
        sequelize.sync()
          .then(() => 
            Foto.create({ 
                nombre: file.name, 
                ruta: path, 
                clase: '', 
                latitud: locations[key].latitud, 
                longitud: locations[key].longitud,
                altitud: locations[key].altitud
              }))
              .then(jane => {}),
              err =>{
                console.error(err)
              };
    });
  });
  pythonShell.run('python/test.py',options, function (err) {
    if (err) console.log(err);
    Foto.findAll({}).then(data =>{
      let fotosOrdenandas = orderUtil.orderFotos(clases,currentLocation,data);
      //res.send(fotosOrdenandas.concat(data));
      res.send(fotosOrdenandas);
      
      data.forEach(foto =>{
        foto.destroy();
      })
    });
  });
  
});
module.exports = router;
