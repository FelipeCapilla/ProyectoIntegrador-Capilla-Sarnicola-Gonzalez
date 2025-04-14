const db = require("../db/info")

let loginController = {
    index: function(req, res, next) {
        res.render('index', {productos : db.productos });
      }
}

module.exports = loginController;