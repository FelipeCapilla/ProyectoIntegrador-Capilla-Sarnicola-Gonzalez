const db = require("../db/info");
const { search } = require("../routes/users");
let userController = {
    register : function (req, res) {
        res.render('register')
    },
    login : function(req, res){
        res.render('login')
    },
    profile: function(req, res) {
        res.render("profile", {productos : db.productos, logueado:true, usuario: db.usuario })
    },
};


module.exports = userController;
