const db = require("../database/models")
let bcryptjs = require("bcryptjs");

let userController = {
    register : function (req, res) {
        res.render('register')            
    },
    create: function (req, res) {
        const errors = validationResult(req);
        const id = req.params.id;
        const filtro = { where: { id: id } };

        if (errors.isEmpty()) {
        const nuevoUsuario = req.body;

        const user = {
            email: nuevoUsuario.email,
            username: nuevoUsuario.username,
            fecha: nuevoUsuario.fecha,
            dni: nuevoUsuario.dni || null,
            foto_perfil: nuevoUsuario.foto_de_perfil
      };
        if (nuevoUsuario.contrasenia !== "") {
        user.contrasenia = bcrypt.hashSync(nuevoUsuario.contrasenia, 10);
        }

        db.User.update(user, filtro).then(() => res.redirect(`/profile/${id}`));

        } else {
        db.User.findByPk(id, filtro).then((result) => {
        return res.render("profile-edit", {
          result,
          errors: errors.mapped(),
          old: req.body
        });
        });
    }

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
          association: "products_users",
          include: [{ association: "products_comments" }],
        },
        {
          association: "products_comments",
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
