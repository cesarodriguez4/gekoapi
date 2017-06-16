var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'soporteagronacional@gmail.com',
    pass: 'agronacionaldelcentro'
  }
});

transporter.verify( (error, success) => {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/email', (req, res) => {
  let mail = {
  	from: 'soporteagronacional@gmail.com', 
  	to: req.body.email, 
  	subject: 'Ticket'
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
    	return res.send(error);
    }
    return res.send(info);
  });
});

module.exports = router;
