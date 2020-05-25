let http = require("http");
let path = require("path");
let express = require("express");
let logger = require("morgan");
let bodyParser = require("body-parser");

let app = express();

app.set("views", path.resolve(_dirname, "views"));
app.set("view engine", "ejs");

//Make this entries visible in all views
let entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

//Populates a variable called req.body if the user is submitting a form
app.use(bodyParser.urlencoded({ extended: false }));
