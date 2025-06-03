module.exports = function(sequelize, dataTypes){
    let alias = "Comment"
    
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        id_producto: {
            type: dataTypes.INTEGER
        },
        id_usuario: {
            type: dataTypes.INTEGER,    
        },
        texto: {
            type: dataTypes.STRING(500)
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
        
    }   
    
    let config = {
        tableName: "comentarios",
        timestamps: false
    }

    let Comment = sequelize.define(alias, cols, config);
    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
          as: "comments_users",
          foreignKey: "id_usuario"
        });
      
        Comment.belongsTo(models.Product, {
          as: "products_comments",
          foreignKey: "id_producto"
        });
      }
    
    return Comment;
}