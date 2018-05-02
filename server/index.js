const express = require('express')
const pythonShell = require('python-shell');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const formidable = require('express-formidable')
const Sequelize = require('sequelize');
const Foto = require('./model/Foto');


const app = express();

const sequelize = new Sequelize('mainDB', null, null, {
  dialect: "sqlite",
  storage: './test.sqlite',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
//app.use(formidable());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => {
    pythonShell.run('../test.py', function (err) {
        if (err) throw err;
        console.log(Foto);
    });
    res.write('<p>asdfffff</p>\n');    

});


app.post('/upload', function(req, res) {

    let files = req.files
    
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
    
    let keyFotos = Object.keys(files);
    
    keyFotos.forEach(key => {
      let file = files[key];
      file.mv(`./img/${file.name}`, function(err) {
        if (err)
          return res.status(500).send(err);
        else
          console.log(`guardando la imagen con nombre: ${file.name}`);
          
      });
    });
    res.send('finish');
  });

app.listen(4000, () => console.log('app listening on port 4000!'));