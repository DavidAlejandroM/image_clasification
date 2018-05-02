const express = require('express')
const pythonShell = require('python-shell');
const fileUpload = require('express-fileupload');
const app = express()

app.get('/', (req, res) => {
    pythonShell.run('../test.py', function (err) {
        if (err) throw err;
        console.log('finished');
    });
    res.write('<p>asdfffff</p>\n');    

});

app.post('/upload', function(req, res) {

    console.log(req);
    
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
   
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.sampleFile;
   
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('./img/filename.jpg', function(err) {
      if (err)
        return res.status(500).send(err);
   
      res.send('File uploaded!');
    });
  });

app.listen(4000, () => console.log('app listening on port 4000!'));