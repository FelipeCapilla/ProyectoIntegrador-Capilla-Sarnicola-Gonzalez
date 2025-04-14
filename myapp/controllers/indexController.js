const db = require("../db/info")

let loginController = {
    index: function(req, res, next) {
        res.render('index', {productos : db.productos, logueado:false, usuario: db.usuario });
      }
}

module.exports = loginController;