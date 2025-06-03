const db = require("../database/models");
let bcryptjs = require("bcryptjs");

let userController = {
    register: function (req, res) {
        res.render('register', { user: null })            
    },

    create: function(req, res) {
        let email = req.body.email;
        let nombre = req.body.usuario;
        let contrasenia = req.body.password;
        let fecha = req.body.fechaDeNacimiento;
        let documento = req.body.documento;
        let foto_de_perfil = req.body.fotoDePerfil;

        if (!email) return res.send("El email no puede estar vacio");
        if (!nombre) return res.send("El usuario no puede estar vacio");
        if (!fecha) return res.send("La fecha no puede estar vacia");
        if (!documento) return res.send("El documento no puede estar vacio");
        if (contrasenia.length < 3) return res.send("La contraseña debe tener al menos 3 caracteres.");

        let usuario = {
            email: email,
            nombre: nombre,
            contrasenia: bcryptjs.hashSync(contrasenia, 10),
            fecha: fecha,
            documento: documento,
            foto_de_perfil: foto_de_perfil
        };

        db.User.create(usuario)
            .then(() => res.redirect("/users/login"))
            .catch(function(err) {
                return res.send(err);
            });
    },

    login: function(req, res) {
        if (req.session.user) {
            return res.redirect("/");
        } else {
            return res.render("login", { user: null });
        }
    },
    
    storeLogin: function (req, res) {
        let emailInsertado = req.body.email;
        let claveInsertada = req.body.contrasenia;
        let errors = {};

        let filtrado = {
            where: { email: emailInsertado }
        };

        db.User.findOne(filtrado)
            .then(function (usuario) {
                if (usuario != null) {
                    let claveCorrecta = bcryptjs.compareSync(claveInsertada, usuario.contrasenia);
                    if (claveCorrecta) {
                        req.session.user = usuario.dataValues;
                        if (req.body.recordarme != undefined) {
                            res.cookie('id', usuario.dataValues.id, { maxAge: 1000 * 60 * 60 });
                        }
                        let id = req.session.user.id;
                        return res.redirect(`/profile/${id}`);
                    } else {
                        errors.mensaje = "La contraseña es incorrecta";
                        res.locals.errors = errors;
                        return res.render('login', { errors: errors });
                    }            
                } else {
                    errors.mensaje = "El email no existe";
                    res.locals.errors = errors;
                    return res.render('login', { errors: errors });
                }
            })
            .catch((err) => {
                console.log(err);
                errors.mensaje = "Hubo un error. Por favor intentar de nuevo";
                res.locals.errors = errors;
                return res.render('login', { errors: errors });
            });
    },

    usuario: function (req, res) {
        db.Usuario.findByPk(req.params.id, {
            include: ["productos"]
        })
            .then(function (usuario) {
                if (!usuario) {
                    return res.send("usuario no encontrado");
                }
                return res.render("profile", {
                    usuario: usuario,
                    productos: usuario.productos,
                    totalProductos: usuario.productos.length
                });
            })
            .catch(function (err) {
                return res.send(err);
            });
    },

    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("id");
        return res.redirect("/");
    },

    profile: function (req, res) {

    let id_usuario = req.params.id;

    db.User.findByPk(id_usuario, {
      include: [{
        association: 'usuario',
        include: [{ association: 'comments_users' }]
      }, {association: 'products_comments'}
     ]
    })
      .then(function (usuario) {
        res.render("profile", {
          usuario: usuario,
          productos: usuario.productos,
          total: usuario.productos.length
        });
      })
      .catch(function (err) {
        res.send("se obtiene un error al cargar el usuario");
      });
  }
};

module.exports = userController;