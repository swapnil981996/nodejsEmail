var express = require('express');
var app = express();
const http = require('http');

app.set("view engine","jade")

const hostname = 'https://emailtask.herokuapp.com';
const port = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');
   res.end('hello world');
 });

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

// app.listen(4000);

server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
 });