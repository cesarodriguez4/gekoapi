var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var cors = require('cors');
var app = express();
let mysql = require('mysql');
var nodemailer = require('nodemailer');

/*let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'arosales@gekosupplies.com',
        pass: 'GekoSuppliesLLC'
    }
});*/

let transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: 'cesarodriguez4@hotmail.com',
        pass: 'cesar25063730'
    }
});


transporter.verify( (error, success) => {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

let connection = mysql.createConnection({
  host     : 'lg7j30weuqckmw07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : 'kc5hljv80epbpac2',
  password : 'qx06sa37gcl79jh9',
  database : 'gf7babag5kx72svb'
});


/*
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'USUARIOS'
});
*/

connection.connect(function(error) {
  if(error) {
    console.log(error);
  } else {
    console.log('Conectado Exitosamente');
  }
}); 


app.use(cors());
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
require('./routes/login')(app, connection);
require('./routes/consultas')(app, connection, transporter);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
