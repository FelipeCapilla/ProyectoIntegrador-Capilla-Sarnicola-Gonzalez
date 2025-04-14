var express = require('express');
var router = express.Router();

const controller = require("../controllers/productController")

router.get("/search-results/:search?", controller.searchResults)
router.get('/product-add', controller.add)

module.exports = router;