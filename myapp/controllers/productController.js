const db = require("../database/models")
let productController = {
    add : function(req, res){
        res.render('product-add', {
            productos : db.productos,
            logueado:true,
            usuario: db.usuario })
    },
    searchResults: function(req, res){
        res.render("search-results", {
            productos : db.productos,
            logueado:false,
            usuario: db.usuario })
    },
    product: function(req, res) {
        res.render("product", {
            productos : db.productos,
            logueado:false,
            usuario: db.usuario })
    }
}

module.exports = productController;