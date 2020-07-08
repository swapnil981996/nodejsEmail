var express = require('express');
var app = express();
var port=process.env.port || 4000
app.set("view engine","jade")

app.get('/send-email', function(req, res){
   console.log(req.query.toEmail)
   const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
   if(req.query.toEmail)
   {
      if(emailRegexp.test(req.query.toEmail))
      {
         res.render('Email',{ 'msg': 'mail sent' });
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

app.get('/', function (req, res) {

   res.render('Email');

});

app.listen(port);