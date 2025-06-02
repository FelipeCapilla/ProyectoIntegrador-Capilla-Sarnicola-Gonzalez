var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

const controller = require("../controllers/productController")

router.get("/products/search-results/:search?", controller.searchResults)
router.get('/product-add', controller.add)
router.get("/product", controller.product)
router.get('/product:id', productController.detail)


module.exports = router;

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
      "Product",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        usuario_id: {
          type: DataTypes.INTEGER
        },
        nombre: {
          type: DataTypes.STRING(500)
        },
        descripcion: {
          type: DataTypes.STRING(1000)
        },
        imagen: {
          type: DataTypes.STRING(500)
        }
      },
      {
        tableName: "productos",
        timestamps: false
      }
    );
  
   
  
    return Product;
  };