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

app.post('/api/send_email', (req, res, next) => {
  const { name, email, phone, serviceRequested, prefferedTime, notesOrQuestions } = req.body;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jeffreystokesddswebsite@gmail.com',
      pass: 'iamapassword!'
    }
  });

  const mailOptions = {
    from: 'jeffreystokesddswebsite@gmail.com',
    to: 'brockston.king@gmail.com',
    subject: 'New message from JS, DDS website:',
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Requested Service: ${serviceRequested}</p><p>Preffered Time of Day: ${prefferedTime}</p><p>Questions/Notes: ${notesOrQuestions}</p>`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    res.status(err ? 500 : 200).send({response: err ? 'There was an error sending your message' : 'Your message was sent', info: err ? err : info})
    console.log( err ? err : info);
  })
})

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