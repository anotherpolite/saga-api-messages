var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

    var emailUser = "saga.mensajes@gmail.com";
    var emailPassword = "uliqlcqkoaibeqrh";

    var app = express();
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3001;

    app.post('/API/send-email', function (req, res) {

      let transporter = nodeMailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: emailUser,
              pass: emailPassword
          } 
      });

      let mailOptions = {
          from: `${emailUser}`, // sender address
          to: 'joaquinvillanuevafarber@gmail.com', // list of receivers
          subject: `Sending Email using Node.js - ${req.body.email}`, // Subject line
          html: `<h2>Nuevo mensaje de: ${req.body.name}</h2>
          </br>
          <h3>${req.body.email}</h3>
          </br>
          <b>${req.body.subject}</b>
          </br>
          <p>${req.body.messageBody}</p>` // html body
      };

      transporter.sendMail(mailOptions, (error, info, res) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
          console.log('The text is: ' + req.body.messageBody);

          if (info.response.includes("OK")){
              console.log("Mensaje enviado con exito.");
              var statusCode = 200;
              return res.body = statusCode;
          }
        });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });