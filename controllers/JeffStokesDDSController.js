
const nodemailer = require('nodemailer');

module.exports = {
    SendEmail: (req, res, next) => {
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
      },
      Test: (req, res, next) => {
          res.status(200).send('success')
      }
}