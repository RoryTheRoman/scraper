var express         = require("express"),
    controller      = require("../controllers/scraper_controller.js");
    router          = express.Router();


//render homepage
router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;