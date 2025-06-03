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
            let filtro = {
                where: {
                [Op.or]: [
                    { nombreProducto: { [Op.like]: `%${queryString}%` } },
                    { descripcion: { [Op.like]: `%${queryString}%` } },
                ],
                },
                include: [
                { association: "products_comments" },
                { association: "user_products" }
                ],
            }
        db.Product.findAll(filtro)
        .then(function (result) {
            if (result.length > 0 && queryString != "") {
                let mensaje = 'Aqui estan los resultados de la busqueda '
                return res.render('search-results', {
                  productos: result,
                  mensaje: mensaje,
                  buscado: queryString
                })
            } else {
                let mensaje = 'No hay resultados para su busqueda'
                return res.render('search-results', {
                  mensaje: mensaje,
                  productos: result,
                  buscado: queryString
                })
            }   
        }).catch((err) => {

        });
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
          console.log("❌ Error al buscar producto:", error.message);
          res.send("Error al cargar el detalle del producto.");
        });
      }
}

module.exports = productController;