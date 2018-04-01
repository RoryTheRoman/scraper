//set up required packages
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    exphbs          = require("express-handlebars"),
    mongoose        = require("mongoose"),
    cheerio         = require("cheerio"),
    request         = require("request"),
    routes          = require("./routes/html_routes"),
    axios           = require("axios"),
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
app.use(axios);
// require("./controllers/scraper_controller.js")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraperdb");

app.get("/scrape", function (req, res) {
    axios.get("https://www.theonion.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        $("h6").each(function (i, element) {
            var result = {};

            result.title = $(element).find("a").text().trim();
            console.log(result.title);
            result.link = $(element).find("a").attr("href").trim();
            console.log(result.link);
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        });
        res.send("scrape complete");
    });
});

//invoke server
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});