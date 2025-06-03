const db = require("../database/models");

let indexController = {
  index: function(req, res, next) {
    db.Product.findAll({
      include: [
        { association: "usuario" },
        { association: "comentarios" }
      ]
    })
    .then(function(productos){
      res.render('index', {
        productos: productos,
        user: req.session.user || null
      });
    })
    .catch(function(error) {
      console.log("❌ Error al buscar productos:", error.message);
      console.log(error);
      res.send("Error al cargar productos.");
    });
  }
    
}

module.exports = indexController;




  


