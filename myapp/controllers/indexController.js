const db = require("../database/models")

let loginController = {
    index: function(req, res, next) {
      let associate = {
        include: [
          { association: "products_comments"},
          { association: "user_products"}
        ],

      }
    
      db.Product.findAll({
        include: [{ association: "products_users" }]
      })
      .then(function(productos){
        res.render('index', {productos: productos, logueado:false, usuario: req.session.user });
      })
      .catch(function(error) {
        console.log(error);
      })
    },
   
    
}

module.exports = loginController;




  


