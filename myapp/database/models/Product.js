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
        nombre_producto: {
            type: dataTypes.STRING(500)
        },
        descripcion_producto: {
            type: dataTypes.STRING(500)
        },
        createAt: {
            type: dataTypes.DATE
        },
        updateAt: {
            type: dataTypes.DATE
        }
    }   
    
    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);
    Product.associate = function(models) {
        Product.belongsTo(models.User, {
          as: "usuario",
          foreignKey: "usuario_id"
        });
      
        Product.hasMany(models.Comment, {
          as: "comentarios",
          foreignKey: "id_producto"
        });
      };
    return Product;
}