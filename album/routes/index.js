var express = require('express');
var router = express.Router();
const pythonShell = require('python-shell');

/* GET home page. */
router.get('/', function(req, res, next) {
  pythonShell.run('../../test.py', function (err) {

    if (err) throw err;
    console.log(Foto);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
