var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const auth = require('./controllers/auth');




//Require all routes
require('dotenv').config()
var indexRouter = require('./routes/index');
var createRouter = require('./routes/create');
var aboutRouter = require('./routes/about');
var detailsRouter = require('./routes/details');
var createAccessory = require('./routes/createAccessory');
var attachAccessory = require('./routes/attachAccessory')
var login = require('./routes/login');
var register = require('./routes/register');
var edit = require('./routes/edit');
var deletecube = require('./routes/deletecube');
var logout = require('./routes/logout');



var app = express();

//To hide Mongo connection variables
require('dotenv').config()

//mongodb connection
//const dbUri = "mongodb+srv://increase7777777:Christ01!@cluster0.edoxn.mongodb.net/cubesdb?retryWrites=true&w=majority"

mongoose.connect(process.env.DB_URI,  {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((res) => console.log('db connected'))
.catch((err) => console.log(err));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Unprotected routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/details', detailsRouter);
app.use('/login', login);
app.use('/register', register);



//Protected routes
app.use(auth)
app.use('/create', createRouter);
app.use('/createAccessory', createAccessory);
app.use('/attachAccessory', attachAccessory);
app.use('/edit', edit);
app.use('/deletecube', deletecube);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
