module.exports = function(sequelize, dataTypes){
    let alias = "User"

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING(500)
        },
        email: {
            type: dataTypes.STRING(500)
        },
        contrasenia: {
            type: dataTypes.STRING(500)
        },
        fecha: {
            type: dataTypes.DATE
        },
        dni: {
            type: dataTypes.INTEGER
        },
        foto_de_perfil: {
            type: dataTypes.STRING
        },
        
    }   
    
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);
    
    User.associate = function(models) {
    User.hasMany(models.Product, {
        as: "user_products",
        foreignKey: "usuario_id"
    });
};

    return User;
}

