const db = require("../database/models")
let bcryptjs = require("bcryptjs");

let userController = {
    register : function (req, res) {
        res.render('register')            
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

    db.User.findOne({ where: { email } })
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

        db.User.findByPk(id, filtrado).then((result) => {
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
