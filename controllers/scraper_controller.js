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
        axios.get("https://www.theonion.com/").then(function (response) {
            var $ = cheerio.load(response.data);
            $("article.postlist__item").each(function (i, element) {
                var result = {};

                result.title = $(element).children("header").children("h1.headline").children("a").text().trim();
                console.log(result.title);

                result.link = $(element).children("header").children("h1.headline").children("a").attr("href").trim();
                console.log(result.link);
                result.summary = $(element).children("div.item__content").children("div.excerpt").children("p").text().trim();


                console.log(result.summary);

                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        // console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
            res.send("scrape complete");
        });
    });

    app.get("/", function (req, res) {
        db.Article.find({})
            .then(function (articles) {
                res.render("index", { articles });
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};