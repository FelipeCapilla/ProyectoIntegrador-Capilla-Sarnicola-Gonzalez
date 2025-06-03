var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

const controller = require("../controllers/productController")

router.get("/products/search-results/:search?", controller.searchResults)
router.get('/product-add', controller.add)
router.get("/product", controller.product)
router.get('/product/:id', controller.detail);



module.exports = router;

