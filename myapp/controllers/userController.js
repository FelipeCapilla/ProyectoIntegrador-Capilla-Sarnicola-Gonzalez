const db = require("../database/models")
const users = db.User
let bcryptjs = require("bcryptjs");

let userController = {
    register : function (req, res) {
        res.render('register')            
    },
    create: function (req, res) {
        
        let email = req.body.email;
        let nombre = req.body.usuario;
        let contrasenia = req.body.password;
        let fecha = req.body.fechaDeNacimiento;
        let documento = req.body.documento;
        let foto_de_perfil = req.body.fotoDePerfil

        if (!email) {
            return res.send("El email no puede estar vacío.");
        }

        if (contrasenia.length < 3) {
            return res.send("La contraseña debe tener al menos 3 caracteres.");
        }

        let usuario = {
            email: email,
            nombre: nombre,
            contrasenia: bcryptjs.hashSync(password, 10),
            fecha: fecha,
            documento: documento,
            foto_de_perfil: foto_de_perfil
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
        if (req.session.user) {
            return res.redirect("/");
        } else {
            return res.render("login");
        }
    },
    
    storeLogin: function (req, res) {
    const { email, contrasenia } = req.body;

    db.Usuario.findOne({ where: { email } })
      .then((user) => {
        if (user && bcrypt.compareSync(contrasenia, user.contrasenia)) {
          req.session.user = user.dataValues;

          if (req.body.recordarme) {
            res.cookie("userID", user.id, { maxAge: 1000 * 60 * 60 });
          }

          return res.redirect(`/usuarios/${user.id}`);
        } else {
          return res.render("login", {
            errors: { mensaje: { msg: "Email o contraseña incorrectos" } }
          });
        }
      })
      .catch(err => {
        console.error(err);
        return res.render("login", {
          errors: { mensaje: { msg: "Error al iniciar sesión" } }
        });
      });
    },

    profile: function(req, res) {
        let id = req.params.id;

        let filtrado = {
        include: [
        {
          association: "producto",
          include: [{ association: "comentario" }],
          order: [["createdAt", "DESC"]],
        },
        {
          association: "comentario",
          order: [["createdAt", "DESC"]]
        }
        ],
        };

        db.Usuario.findByPk(id, filtrado).then((result) => {
            return res.render("profile", { usuario: result });
        });
    }, 

    logout: function (req, res) {
    req.session.destroy();
    res.clearCookie("userID");
    return res.redirect("/");
    }

};


module.exports = userController;
