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

//Rendering the site root
app.get("/", function (request, response) {
  response.render("index");
});

//Render page for creating new entry
app.get("/new-entry", function (request, response) {
  response.render("new-entry");
});

//Handle post requests to new-entry URL
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body");
  }
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date(),
  });
  response.redirect("/");
});

//Render 404 pagefor unknown page
app.use(function (request, response) {
  respinse.status(404).render("404");
});

//Start server on port 3000
http.createServer(app).listen(3000, function () {
  console.log("Guestbook app started on port 3000");
});
