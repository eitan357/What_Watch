var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require(`express-session`);
var cors = require("cors");

var loginRouter = require(`./routes/loginRouter`);
var usersRouter = require(`./routes/usersRouter`);
var moviesRouter = require(`./routes/moviesRouter`);
var subscriptionsRouter = require(`./routes/subscriptionsRouter`);

var app = express();
app.use(cors());

app.use(session({ secret: "mysecret" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

require(`./configs/usersDB`);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", loginRouter.router);
app.use("/main/usersManage", usersRouter);
app.use("/main/moviesManage", moviesRouter);
app.use("/main/subscriptionsManage", subscriptionsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
