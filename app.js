const secrets = require('dotenv').config().parsed;
const createError = require('http-errors');
const session = require('express-session');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

//declare routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/index');
const homeRouter = require('./routes/index');
const studentRouter = require('./routes/index');
const studentAddRouter = require('./routes/index');
const createUSer = require('./routes/index');

const app = express();

//setting cookie session
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Typically, you'll want false
  saveUninitialized: true, // Set to true to save new, uninitialized sessions
  // ... other options
}));


// view engine setup
app.set('views', [
  path.join(__dirname, 'views'),
  path.join(__dirname, 'views/login'),
  path.join(__dirname, 'views/student/'),
  path.join(__dirname, 'views/class/'),]);
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/student', studentRouter);
app.use('/student/add', studentAddRouter);
app.use('/create_user', createUSer);

//disable fingerprinting
app.disable('x-powered-by')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // Use flash messages for error handling
  // app.use(flash());
  // app.use((req, res, next) => {
  //   res.locals.success_msg = req.flash('success_msg');
  //   res.locals.error_msg = req.flash('error_msg');
  //   next();
  // });


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
