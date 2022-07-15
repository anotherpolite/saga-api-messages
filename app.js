var express = require('express'),
path = require('path'),
nodeMailer = require('nodemailer'),
bodyParser = require('body-parser');

var emailUser = "saga.mensajes@gmail.com";
var emailPassword = "uliqlcqkoaibeqrh";

    var app = express();
    var port = process.env.PORT || 3001;
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.post('/', function (req, res) {

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
          to: 'info@sagastudio.film', // list of receivers
          subject: `New email from - ${req.body.email}`, // Subject line
          html: `<h2>Nuevo mensaje de: ${req.body.name}</h2>
          </br>
          <h3>${req.body.email}</h3>
          </br>
          <b>${req.body.subject}</b>
          </br>
          <p>${req.body.messageBody}</p>` // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return res.status(400).send({ msj: error});
          }
          console.log('Message %s sent: %s', info.messageId, info.response);

          if (info.response.includes("OK")){
            console.log("Mensaje enviado con exito."); 
            return res.sendStatus(200);
          }
        });
      });

    app.listen(port, function(){
      console.log('Server is running at port: ',port);
    });