const { sequelize } = require(".")
const config = require("../config/config")


module.exports = function(sequelize, dataTypes){
    let alias = "User"

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
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
        foto_perfil: {
            type: dataTypes.STRING
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }   
    
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);
    return User;
}

