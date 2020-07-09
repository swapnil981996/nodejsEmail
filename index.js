var express = require('express');
var nodemailer = require('nodemailer');

var app = express();
var PORT=process.env.PORT || 4000

var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'swapnilgandal9@gmail.com', //your email address
     pass: 'SwapGandal9' //your password
   }
 });

app.set("view engine","jade")

app.get('/', function (req, res) {

   res.render('Email');

});

app.get('/send-email', function(req, res){
   //regular expression for validating email 
   const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
   var recipient_email=req.query.toEmail

   var mailOptions = {
      from: 'swapnilgandal9@gmail.com', //your email address
      to: recipient_email,  // recipient email address
      subject: 'About your health', // subject of the mail
      text: 'Stay Home, Stay Safe, Stay Strong!!!!!' // text or content of the mail
    };

   if(recipient_email)
   {
      if(emailRegexp.test(recipient_email))
      {
         transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.render('Email',{ 'msg': 'something went wrong' })
            } else {
              res.render('Email',{ 'msg': 'mail sent' });
            }
          });
      }
      else
      {
         res.render('Email',{ 'msg': 'invalid email address' });
      } 
   }
   else
   {
      res.render('Email',{ 'msg': '' });
   }
});


app.listen(PORT);