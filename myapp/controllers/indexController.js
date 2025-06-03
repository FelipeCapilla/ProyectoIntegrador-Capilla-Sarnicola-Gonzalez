const db = require("../database/models");

let indexController = {
  index: function (req, res) {
    db.Product.findAll({
      include: [
        { association: "products_users" },
        { association: "products_comments" }
      ]
    })
    .then(function (productos) {
      res.render("index", {
        productos: productos,
        user: req.session.user || null
      });
    })
    .catch(function (error) {
      console.log("❌ Error al buscar productos:", error.message);
      console.log(error); // muestra el error completo
      res.send("Error al cargar productos.");
    });
  }
    
}

module.exports = indexController;




  


