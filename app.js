const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, '/build')));

app.use( (req, res, next) => {
  console.log(Date(), req);
  next();
})

app.use(require('./router'));

// Checking below
// var server_host = '0.0.0.0';

app.get('/*', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, "build")
  })
});

// Checking below. References '0.0.0.0' server_host
// app.listen(process.env.PORT || 4005, server_host, () => {
//     console.log(`Listening on port ${ port }`);
// })

app.listen(process.env.PORT || 4005, () => {
  console.log(`Listening on port ${ process.env.PORT || 4005 }`);
})