var cheerio         = require("cheerio"),
    express         = require("express"),
    app             = express(),
    axios           = require("axios"),
    cheerio         = require("cheerio"),
    request         = require("request"),
    mongoose        = require("mongoose"),
    db              = require("../models");
    
mongoose.connect("mongodb://localhost/scraperdb");    

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        console.log("yo");
        axios.get("https://www.theonion.com/").then(function (response) {
            var $ = cheerio.load(response.data);
            $("h1.headline").each(function (i, element) {
                var result = {};

                result.title = $(element).children("a").text().trim();
                // console.log(result.title);

                result.link = $(element).children("a").attr("href").trim();
                // console.log(result.link);

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
};