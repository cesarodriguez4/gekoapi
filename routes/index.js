var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

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
