const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
var fs = require('fs')

const app = express()
app.use(bodyParser.json())

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
})

const upload = multer({ storage: Storage })


app.get('/', (req, res) => {
  var txt123 = fs.readFileSync("outputs.txt","utf8",(err,data)=>{
    if(err) {
     return  console.log('something went wrong.')
    }
    return data.toString();
  })
  console.log(txt123)
    res.status(200).send(txt123)
  
  }
  )


app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body._parts)
  res.status(200).json({
    message: 'success!',
  })
})

app.listen(3000, () => {
  console.log('App running on http://localhost:3000')
})


// {'predictions': [[0.215628058, 0.784372]]}