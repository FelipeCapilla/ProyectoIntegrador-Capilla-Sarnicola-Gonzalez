const db = require("../db/info");
let productController = {
    add : function(req, res){
        res.render('product-add')
    },
    searchResults: function(req, res){
        res.render("search-results", {productos : db.productos, logueado:false, usuario: db.usuario })
    }
}

module.exports = productController;