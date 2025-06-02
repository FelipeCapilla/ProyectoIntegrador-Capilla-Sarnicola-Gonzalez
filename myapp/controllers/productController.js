const db = require("../database/models")
let productController = {
    add : function(req, res){
        res.render('product-add', {
            productos : db.productos,
            logueado:true,
            usuario: db.usuario })
    },
    searchResults: function(req, res){
        let valorBuscado = req.query.search
        db.Product.findAll
        res.send(valorBuscado); 
    },
    product: function(req, res) {
        db.Product.findAll()
            .then(function(product) {
                res.render("product",{product:product} )
            })
            .catch(function(error){
                return res.send(error);
            })
    },
    detail: function(req, res){
        db.Product.findByPk(req.params.id)
            .then(function(product) {
                res.render("detalle-producto", {product:product})
            })
    }
}

module.exports = productController;