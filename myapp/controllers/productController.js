const db = require("../database/models")
const Op = db.Sequelize.Op;
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

        let valorBuscado = req.query.search
        db.Product.findAll()
        res.send(valorBuscado); 
    },
    product: function(req, res) {
        let id = req.params.id
        let filtrado = {
            include: [
            {association: "user_products" },
            {
            association: "products_comments",
            include: [{ association: "user_products" }]
            }
        ],
    }
        db.Producto.findByPk
    },
    detail: function(req, res){
        db.Product.findByPk(req.params.id)
            .then(function(product) {
                res.render("detalle-producto", {product:product})
            })
    }
}

module.exports = productController;