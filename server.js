//set up required packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    exphbs          = require("express-handlebars"),
    mongoose        = require("mongoose"),
    cheerio         = require("cheerio"),
    request         = require("request"),
    routes          = require("./routes/html_routes"),
    db              = require("./models");

//declare PORT variable in a heroku-friendly way
var PORT = process.env.PORT || 3000;

//set up handlebar usage
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//use all of the stuffs
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraperdb");

//invoke server
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});