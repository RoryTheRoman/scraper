var express         = require("express")
    router          = express.Router();


//render homepage
router.get("/", function (req, res) {
    res.render("index");
});

module.exports = router;