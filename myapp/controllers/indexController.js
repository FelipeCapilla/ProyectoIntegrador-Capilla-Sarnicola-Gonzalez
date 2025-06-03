const db = require("../database/models");

let indexController = {
  index: function(req, res, next) {
    db.Product.findAll({
      include: [
        { association: "usuario" },
        { association: "comentarios" }
      ]
    })
   .then(function (resultados) {
            return res.render("index", { data: resultados});
    })
    .catch(function (error) {
            return res.send(error);
    })
  }
    
}

module.exports = indexController;




  


