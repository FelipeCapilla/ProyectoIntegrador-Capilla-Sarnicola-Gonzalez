const db = require("../database/models")

let loginController = {
    index: function(req, res, next) {
      let associate = {
        include: [
          { association: "texto"},
          { association: "usuario"}
        ],
        order: [["createAt", "DESC"]],
        limit: 15
      }
    
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