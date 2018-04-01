

// var cheerio         = require("cheerio"),
//     express         = require("express"),
//     app             = express(),
//     axios           = require("axios"),
//     cheerio         = require("cheerio"),
//     request         = require("request"),
//     mongoose        = require("mongoose"),
//     db              = require("../models");
    
// mongoose.connect("mongodb://localhost/scraperdb");    
// module.exports = function (app){
// app.get("/scrape", function(req, res){
//     axios.get("http://www.mtv.com/").then(function (response){
//         var $ = cheerio.load(response.data);
//         $(".header").each(function(i, element){
//             var result = {};

//             result.title = $(this).text();
//             console.log(result.title);
//             result.link = $(this).parent().parent().attr("href");
//             console.log(result.link);
//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     // View the added result in the console
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     // If an error occurred, send it to the client
//                     return res.json(err);
//                 });
//         });
//         res.send("scrape complete");
//     });
// });
// };