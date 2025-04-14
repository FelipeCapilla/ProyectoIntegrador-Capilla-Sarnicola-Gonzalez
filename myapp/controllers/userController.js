const db = require("../db/info");

let userController = {
    register : function (req, res) {
        res.render('register', {productos : db.productos, logueado:false, usuario: db.usuario })
    },
    login : function(req, res){
        res.render('login', {productos : db.productos, logueado:false, usuario: db.usuario })
    },
    profile: function(req, res) {
        res.render("profile", {productos : db.productos, logueado:true, usuario: db.usuario })
    },
};


module.exports = userController;
