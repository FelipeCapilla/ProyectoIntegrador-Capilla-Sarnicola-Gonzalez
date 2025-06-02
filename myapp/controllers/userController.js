const db = require("../database/models")
let bcryptjs = require("bcryptjs");

let userController = {
    register : function (req, res) {
        res.render('register')            
    },

    create: function(req, res){

        let email = req.body.email;
        let nombre = req.body.usuario;
        let contrasenia = req.body.password;
        let fecha = req.body.fechaDeNacimiento;
        let documento = req.body.documento;
        let foto_de_perfil = req.body.fotoDePerfil

        if (!email) {
            return res.send("El email no puede estar vacio");
        }

        if (contrasenia.length < 3) {
            return res.send("La contraseña debe tener al menos 3 caracteres.");
        }

        let usuario = {
            email: email,
            nombre: nombre,
            contrasenia: bcryptjs.hashSync(contrasenia, 10),
            fecha: fecha,
            documento: documento,
            foto_de_perfil:foto_de_perfil
        }

        db.User.create(usuario)
        return res.redirect("/users/login")
        .catch(function(err) {
            return res.send(err)
        })

    },

    login : function(req, res){
        if (req.session.user) {
            return res.redirect("/");
        } else {
            return res.render("login");
        }
    },
    
    storeLogin: function (req, res) {
    const { email, contrasenia } = req.body;

    },

    profile: function(req, res) {
        let id = req.params.id;

        let filtrado = {
        include: [
        {
          association: "products_users",
          include: [{ association: "products_comments" }],
        },
        {
          association: "products_comments",
        }
        ],
        };

        db.User.findByPk(id, filtrado).then((result) => {
            return res.render("profile", { usuario: result });
        });
    }, 

    logout: function (req, res) {
        return res.redirect("/");
    },

    
};


module.exports = userController;
