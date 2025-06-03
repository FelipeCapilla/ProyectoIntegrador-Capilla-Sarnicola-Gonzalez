const db = require("../database/models")
const Op = db.Sequelize.Op;
let productController = {
    add : function(req, res){
        res.render('product-add', {
            productos : db.productos,
            logueado:true,
            usuario: db.usuario })
    },
    agregar: function(req, res){
      if (req.session.usuario !== undefined) {
        return res.render("product-add");
      } else {
        return res.render('/', { error: {} });
      }
    },
    searchResults: function(req, res){
        res.render("search-results", {
            productos : db.productos,
            logueado:false,
            usuario: db.usuario })

        let valorBuscado = req.query.search

        
        db.Producto.findAll({
            where: [
                { nombre: { [op.like]: "%" + valorBuscado + "%" } }
            ],
            include: [{ association: "usuario" },
              {association: "comentario"}]
        })
       
        .then(function (resultados) {
            return res.render('search-results', { data: resultados , busqueda: valorBuscado})
        })
        .catch(function (err) {
            return res.send(err);
        })
        
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
    detail: function (req, res) {
        db.Product.findByPk(req.params.id, {
          include: [
            { association: "user_products" },
            { association: "products_comments", include: ["comments_users"] }
          ]
        })
        .then(function(producto) {
          if (!producto) {
            return res.send("Producto no encontrado");
          }
    
          res.render('detalle-producto', {
            producto: producto,
            user: req.session.user || null
          });
        })
        .catch(function(error) {
          console.log("Error al buscar producto:", error.message);
          res.send("Error al cargar el detalle del producto.");
        });
      },
      comentarios: function(req, res){
        if (req.session.usuario != undefined) {
        db.Comentario.create({
        id_usuario: req.params.id,
        id_producto: req.session.usuario.id,
        texto: req.body.comentario
        })
        .then(function () {
          return res.redirect('/product/detalle-producto' + req.params.id)
        })

        } else {
          return res.redirect('/users/login')
        }
      }
}

module.exports = productController;