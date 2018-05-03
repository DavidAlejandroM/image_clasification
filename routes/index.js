var express = require('express');
var router = express.Router();
const pythonShell = require('python-shell');

const options = {
  args: ['python/']
};

/* GET home page. */
router.get('/', function(req, res, next) {
  
  pythonShell.run('python/test.py',options, function (err) {
    if (err) console.log(err);
  });
  res.render('index', { title: 'Express' });

});

router.post('/upload', function(req, res) {

  let files = req.files
  
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  
  let keyFotos = Object.keys(files);
  
  keyFotos.forEach(key => {
    let file = files[key];
    file.mv(`./res/img/${file.name}`, function(err) {
      if (err)
        return res.status(500).send(err);
      else
        console.log(`guardando la imagen con nombre: ${file.name}`);
    });
  });
  res.send('finish');
});
module.exports = router;
