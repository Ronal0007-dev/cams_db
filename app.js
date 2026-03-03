const secret = require("dotenv").config().parsed.SESSION_SECRET;
const createError = require("http-errors");
const session = require("express-session");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");

//flash messages
const flash = require("connect-flash");

//declare routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/index");
const homeRouter = require("./routes/index");
const studentRouter = require("./routes/index");
const studentAddRouter = require("./routes/index");
const classRouter = require("./routes/index");
const createUSer = require("./routes/index");
const Classcreate = require("./routes/index");
const ClassAddRouter = require("./routes/index");

const app = express();

//setting cookie session
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    secret: secret, // Use a secure secret in production
    resave: false, // Typically, you'll want false
    saveUninitialized: true, // Set to true to save new, uninitialized sessions
    // ... other options
    cookie: {
    maxAge: expiryDate, // Set the session expiration time in milliseconds
    // Other cookie options (e.g., secure, httpOnly)
    httpOnly: true, // Recommended for security
  },
  rolling: true // Recommended: resets the maxAge countdown on each user activity/request
  }),
);

// view engine setup
app.set("views", [
  path.join(__dirname, "views"),
  path.join(__dirname, "views/login"),
  path.join(__dirname, "views/student/"),
  path.join(__dirname, "views/class/"),
]);
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));

//use routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);
app.use("/student", studentRouter);
app.use("/student/add", studentAddRouter);
app.use("/class", classRouter);
app.use("/create_user", createUSer);
app.use("/class-create", Classcreate);
app.use("/class/add", ClassAddRouter);

//disable fingerprinting
app.disable("x-powered-by");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //Use flash messages for error handling
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
