module.exports = function(sequelize, dataTypes){
    let alias = "Product"
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        usuario_id: {
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING(500)
        },
        descripcion: {
            type: dataTypes.STRING(500)
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        }
    }   
    
    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);
    Product.associate = function(models){
        Product.belongsTo(models.User, {
            as: "products_users",
            foreignKey: "usuario_id"
        })
    }
    return Product;
}