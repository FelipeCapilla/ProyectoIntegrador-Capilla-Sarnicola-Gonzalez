const db = require("../database/models")
let bcryptjs = require("bcryptjs");

let userController = {
    register : function (req, res) {
        res.render('register', {productos : db.productos, logueado:false, usuario: db.usuario })
    },
    create: function (req, res) {
        
        let email = req.body.EmailDelUsuario;
        let nombre = req.body.UsuarioDelUsuario;
        let contrasenia = req.body.password;
        let nacimiento = req.body.fechaDeNacimiento;
        let documento = req.body.documento;
        let foto = req.body.fotoDePerfil

        let usuario = {
            email: EmailDelUsuario,
            nombre: UsuarioDelUsuario,
            contrasenia: bcryptjs.hashSync(password, 10),
            nacimiento: fechaDeNacimiento,
            documento: documento,
            foto: fotoDePerfil
        }

        db.User.create(usuario)
            .then(function(results) {
                return res.redirect("/")
            })
            .catch(function(err) {
                return res.send(err)
            })

    },
    login : function(req, res){
        res.render('login', {productos : db.productos, logueado:false, usuario: db.usuario })
    },
    profile: function(req, res) {
        res.render("profile", {productos : db.productos, logueado:true, usuario: db.usuario })
    },
};


module.exports = userController;
