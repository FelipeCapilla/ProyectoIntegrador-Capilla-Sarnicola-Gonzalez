const db = require("../database/models")

let loginController = {
    index: function(req, res, next) {
      db.Product.findAll()
      .then(function(productos){
        res.render('index', {productos: productos, logueado:false, usuario: req.session.user });
      })
      .catch(function(error) {
        console.log(error);
      })
    }
}

module.exports = loginController;